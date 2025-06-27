import _ from 'lodash';
import SunCalc from 'suncalc';
import { DateTime } from 'luxon';

function windowComputation(data, location) {
    const wind_dirs = location['wind_dir'];

    _.forEach(data, (d) => {
        d['window_daytime'] = isDaytime(d, location) ? 1 : 0;
        d['window_wind_speed'] = d['wind_speed'] <= 10 ? 1 : 0;
        d['window_wind_gust'] = d['wind_gust'] <= 15 ? 1 : 0;
        d['window_direction'] = isValidWindDirection(wind_dirs, d.wind_dir) ? 1 : 0;
        d['window_sky'] = d['sky_cover'] < 50 ? 1 : 0;
        d['window'] = d['window_wind_speed'] + d['window_wind_gust'] +
            d['window_direction'] + d['window_sky'] + d['window_daytime'];
    });

    return data;
}

function isDaytime(row, location) {
    const ts = DateTime.fromFormat(row.timestamp, 'yyyy-MM-dd HH:mm:ss').toJSDate();
    const [sunrise, sunset] = getSunriseSunset(ts, location);
    return ts >= sunrise && ts <= sunset;
}

function getSunriseSunset(dateObj, location) {
    // Set time to noon to ensure correct day
    const noon = new Date(dateObj);
    noon.setHours(12, 0, 0, 0);
    const times = SunCalc.getTimes(noon, location.lat, location.lon);

    return [times.sunrise, times.sunset]; // Native JS Date objects
}

function isValidWindDirection(wind_dirs, wind_dir) {
    const wind_map = {
        W: 270,
        NW: 315,
        N: 360,
        NE: 45,
        E: 90,
        SE: 135,
        S: 180,
        SW: 225
    };

    function between(x, dir) {
        const angle = wind_map[dir];
        const min = (angle - 22.5 + 360) % 360;
        const max = (angle + 22.5) % 360;

        if (dir === "N") {
            return x >= min || x <= max;
        } else {
            return x >= min && x <= max;
        }
    }

    const valid_dir = _.map(wind_dirs, (wd) => between(wind_dir, wd));
    return _.some(valid_dir);
}

export { windowComputation };
