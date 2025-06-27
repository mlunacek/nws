import _ from 'lodash';
import { DateTime, Duration } from 'luxon';
import SunCalc from 'suncalc';

import { convert } from './conversions.js';
import { fetchWithRetry } from './utils.js';

import { includes, get } from 'lodash';
import { iconsMap } from './iconsMap.js';

const nightColor = "#eaeaf6"
const dayColor = "#f8f8f8"

const properties = [
    'temperature',
    'probabilityOfPrecipitation',
    'probabilityOfThunder',
    'quantitativePrecipitation',
    'snowfallAmount',
    'mixingHeight',
    'skyCover',
    'windSpeed',
    'dewpoint',
    'windGust',
    'windDirection'
];

const propertiesMap = {
    temperature: 'temperature',
    skyCover: 'sky_cover',
    windSpeed: 'wind_speed',
    windGust: 'wind_gust',
    windDirection: 'wind_dir',
    dewpoint: 'dewpoint',
    lightningActivityLevel: 'lightning',
    quantitativePrecipitation: 'precip_amount',
    probabilityOfPrecipitation: 'precip_percent',
    probabilityOfThunder: 'thunder_percent',
    snowfallAmount: 'snow_amount',
    mixingHeight: 'mixing_height'
};

function getForecastLabel({
    sky_cover_percent,
    rain_showers,
    precip_percent,
    precip_amount,
    lightning_percent,
    temperature
}) {
    let label = "";

    // Sky Cover
    if (sky_cover_percent <= 10) label = "noClouds";
    else if (sky_cover_percent <= 35) label = "partlyClouds";
    else if (sky_cover_percent <= 70) label = "mostlyClouds";
    else label = "allClouds";

    // What about rain
    if (rain_showers) {
        if (label === 'noClouds') {
            label = "partlyClouds"
        }
        if (rain_showers === "slight_chance") {
            label += "-r2"
        }
        else if (rain_showers === "chance") {
            label += "-r2"
        }
        else if (rain_showers === "likley") {
            label += "-r3"
        }
    }



    // // Thunderstorms Override
    // if (lightning_percent > 10) {
    //     if (precip_percent < 30) label = "slight_chance_tstorms";
    //     else if (precip_percent < 50) label = "chance_tstorms";
    //     else label = "likely_tstorms";
    // }
    // // Precipitation (Rain or Snow)
    // else if (precip_percent >= 15) {
    //     const type = temperature <= 34 ? "Snow Showers" : "Rain Showers";

    //     if (precip_percent < 30) label = `Slight Chance ${type}`;
    //     else if (precip_percent < 50) label = `Chance ${type}`;
    //     else label = `Likely ${type}`;
    // }





    return label;
}

function getSunValue({
    location, timestamp
}) {

    const dt = DateTime.fromFormat(timestamp, 'yyyy-MM-dd HH:mm:ss');
    // console.log(timestamp, dt)
    const times = SunCalc.getTimes(dt, location?.lat, location?.lon);
    const sunrise = times.sunrise;  // Sunrise time
    const sunset = times.sunset;    // Sunset time
    const start = dt.hour - formatTime24hr(sunrise)
    const end = formatTime24hr(sunset) - dt.hour

    // console.log(start, end)

    if (start > 0 && end > 0) {
        return 'day'
    }
    else if (start < 0 && end > 0) {
        return 'night' //morning
    }
    else if (start > 0 && end < 0) {
        return 'night'
    }
    return 'unknown'
}

const formatTime24hr = (time) => {
    const hours = time.getHours()
    const minutes = time.getMinutes() / 60
    return hours + minutes
};


async function getAllNWSData(locations, setNwsData) {

    const promises = _.clone(locations).map(async location => await getNWSData(location));
    const data = await Promise.all(promises);
    const tmp = {};
    for (let i = 0; i < data.length; ++i) {
        tmp[data[i].meta.id] = data[i];
    }

    if (setNwsData) {
        setNwsData(tmp);
    }
    return tmp;
}

async function getLocationData(location, setNwsData) {

    const data = await getNWSData(location)
    console.log("data", data)
    if (setNwsData) {

        setNwsData(data);
    }
    return data;
}

async function getNWSData(location) {

    const gridUrl = `https://api.weather.gov/points/${location.lat},${location.lon}`;
    // console.log(gridUrl)
    const gridRes = await fetchWithRetry(gridUrl, 10);
    const gridData = await gridRes.json();

    const hourlyUrl = gridData['properties']['forecastGridData'];
    const hourlyRes = await fetchWithRetry(hourlyUrl, 10);
    const hourlyData = await hourlyRes.json();

    console.log("hourlyData", hourlyData?.properties)


    // Do we need this?
    const iconsUrl = gridData['properties']['forecastHourly'];
    const iconsRes = await fetchWithRetry(iconsUrl, 10);
    const iconsData = await iconsRes.json();
    const iconsList = iconsData?.properties?.periods.map((d) => {
        d['timestamp'] = DateTime.fromISO(d.startTime).setZone('local').toFormat('yyyy-MM-dd HH:mm:ss');
        return d
    })

    const data = parseData(hourlyData).map((d) => {

        d['forecastLabel'] = getForecastLabel({
            sky_cover_percent: d?.sky_cover,
            rain_showers: d?.rain_showers,
            // precip_percent: d['precip_percent'],
            // precip_amount: d['precip_amount'],
            // lightning_percent: d['lightning_percent'],
            // temperature: d['temperature']
        })
        d['dayNight'] = getSunValue({ location, timestamp: d['timestamp'] })
        d['dayNightColor'] = d['dayNight'] === 'day' ? dayColor : nightColor

        const tc = (d['temperature'] - 32) * 5 / 9
        const dc = (d['dewpoint'] - 32) * 5 / 9
        d['lcl'] = (125 * (tc - dc)) * 3.28
        d['icon'] = get(get(iconsMap, d['forecastLabel']), d['dayNight'])
        d['name'] = location.name
        d['location'] = location.id
        d['source'] = "nws"

        return d
    })

    const now = DateTime.local().toFormat('yyyy-MM-dd HH:mm:ss');
    const updateTime = DateTime.fromISO(hourlyData.properties.updateTime)
        .setZone('local')
        .toFormat('yyyy-MM-dd HH:mm:ss');

    const meta = {
        elevation: convert(hourlyData.properties.elevation.value, hourlyData.properties.elevation.unitCode),
        update_time: updateTime,
        fetch_time: now,
        model: 'NWS',
        datasrc: `https://forecast.weather.gov/MapClick.php?lat=${location.lat}&lon=${location.lon}&lg=english&&FcstType=graphical`,
        lat: location.lat,
        lon: location.lon,
        name: location.name,
        id: location.id,
        polygon: JSON.stringify(hourlyData.geometry.coordinates)
    };

    // hourly not needed
    // data.forEach(item => {
    //     for (const other of iconsList) {
    //         if (item.timestamp === other.timestamp) {
    //             item['shortForecast'] = other.shortForecast
    //             // item['probabilityOfPrecipitation'] = other.probabilityOfPrecipitation
    //             break; // Stop after first match
    //         }
    //     }
    // });

    // data.forEach((item) => {
    //     const dt = DateTime.fromFormat(item.timestamp, 'yyyy-MM-dd HH:mm:ss');
    //     const times = SunCalc.getTimes(dt, location?.lat, location?.lon);
    //     const sunrise = times.sunrise;  // Sunrise time
    //     const sunset = times.sunset;    // Sunset time
    //     const start = dt.hour - formatTime24hr(sunrise)
    //     const end = formatTime24hr(sunset) - dt.hour

    //     if (start > 0 && end > 0) {
    //         item['sunValue'] = 'day'
    //     }
    //     else if (start < 0 && end > 0) {
    //         item['sunValue'] = 'morning'
    //     }
    //     else if (start > 0 && end < 0) {
    //         item['sunValue'] = 'night'
    //     }
    //     else {
    //         item['sunValue'] = 'unknown'
    //     }
    // })

    // const windowed_data = windowComputation(data, location);
    return { meta, data: data };
}

function parseData(data) {

    const weatherEvents = parseWeather(data?.properties?.weather?.values)

    const reduced = properties.map((property) =>
        reduceProperty(property, data.properties[property])
    );

    const combined = {};
    reduced.forEach((property) => {
        property.values.forEach(row => {
            if (!_.has(combined, row.timestamp)) {
                combined[row.timestamp] = {};
            }
            combined[row.timestamp][propertiesMap[property.property]] = convert(row.value, property.units);
        });
    });

    const combinedList = Object.entries(combined).map(([timestamp, values]) => {
        values.timestamp = timestamp;
        return values;
    });

    const sortedCombined = combinedList.sort((a, b) => a.timestamp.localeCompare(b.timestamp));

    // console.log("sortedCombined", sortedCombined)
    // console.log("weatherEvents", weatherEvents)
    weatherEvents.forEach(weatherItem => {
        sortedCombined.forEach(item => {
            for (const other of weatherItem) {
                if (item.timestamp === other.timestamp) {
                    // console.log(other.property, other.coverage)
                    item[[other.property]] = other.coverage
                    break;
                }
            }
        })
    })

    return sortedCombined;
}

function parseWeather(data) {

    const events = data.flatMap(entry => {
        const [startTime, duration] = entry.validTime.split('/');
        return entry.value.map(v => ({
            timestamp: startTime,
            duration: duration,
            coverage: v.coverage,
            weather: v.weather,
            intensity: v.intensity
        }));
    });

    const grouped = {};

    events.forEach(event => {
        const weatherKey = event.weather

        if (weatherKey && !grouped[weatherKey]) {
            grouped[weatherKey] = [];
        }

        if (weatherKey) {
            grouped[weatherKey].push({
                timestamp: event.timestamp,
                duration: event.duration,
                coverage: event.coverage,
                intensity: event.intensity
            });
        }
    });

    const result = Object.entries(grouped).map(([weather, values]) => ({
        weather,
        values
    }));

    // console.log("result", result)
    const expand = result.map((d) => {
        return expandWeather(d.weather, d.values)
    })

    // console.log("expand", expand)
    return expand

}

function expandWeather(property, values) {
    const expanded = [];

    const unique_coverage = []

    values.forEach(item => {
        const start = DateTime.fromISO(item.timestamp).setZone('local')
        // Parse duration assuming PT#H format
        const hoursMatch = item.duration.match(/PT(\d+)H/);
        if (!hoursMatch) return;  // Skip if invalid duration

        const hours = parseInt(hoursMatch[1], 10);
        unique_coverage.push(item.coverage)
        for (let i = 0; i < hours; i++) {
            const dt = start.plus({ hours: i });

            expanded.push({
                property: property,
                timestamp: dt.toFormat('yyyy-MM-dd HH:mm:ss'),
                coverage: item.coverage,
                intensity: item.intensity
            });
        }
    });

    const tmp = [...new Set(unique_coverage)]
    console.log(property, tmp)

    return expanded
}


function reduceProperty(property, obj) {
    obj.values.forEach((row) => {
        const [start, durationStr] = row.validTime.split('/');
        const dt = DateTime.fromISO(start).setZone('local');
        row.timestamp = dt.toFormat('yyyy-MM-dd HH:mm:ss');
        row.moment = Duration.fromISO(durationStr).as('hours');
        row.hour = dt.hour;
    });

    const new_values = [];
    obj.values.forEach((row) => {
        new_values.push(row);
        for (let i = 0; i < row.moment - 1; i++) {
            const dt = DateTime.fromFormat(row.timestamp, 'yyyy-MM-dd HH:mm:ss').plus({ hours: i + 1 });
            const tmp = _.cloneDeep(row);
            if (includes(['snowfallAmount', 'quantitativePrecipitation'], property)) {
                tmp['value'] = tmp['value'] / row.moment
            }
            tmp.timestamp = dt.toFormat('yyyy-MM-dd HH:mm:ss');
            tmp.hour = dt.hour;
            new_values.push(tmp);
        }
    });

    return { values: new_values, units: obj.uom, property };
}

export { getNWSData, getAllNWSData, getLocationData };
