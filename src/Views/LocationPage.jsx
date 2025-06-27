import { useEffect, useState, useMemo } from 'react';
import { Box } from '@mui/material';
import PageHeader from "@/utils/PageHeader";
import PageContainer from '@/utils/PageContainer';

import { useParams } from 'react-router-dom';
import { useAtomValue, useSetAtom } from 'jotai';
import { locationsAtom, locationAtom } from '@/NWS/atoms'
import { getLocationData } from '@/NWS/data/service';
import { appBarTitleAtom, appBarElevationAtom, appBarTimeAtom } from '@/Layout/atoms';

import ResponsiveTable from '@/WeatherTable/ResponsiveTable';

const LocationPage = () => {

    const params = useParams();
    const locations = useAtomValue(locationsAtom);
    const setAppBarTitle = useSetAtom(appBarTitleAtom);
    const setAppBarElevation = useSetAtom(appBarElevationAtom);
    const setAppBarTime = useSetAtom(appBarTimeAtom);

    const [location, setLocation] = useState();
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (locations && params?.id) {
            locations.forEach((d) => {
                if (d.id === params?.id) {
                    setLocation(d)
                }
            })
        }
    }, [params?.id, locations])

    useEffect(() => {
        if (location) {
            console.log("location", location)
            getLocationData(location, setData)
            setAppBarTitle(location.name)
            return () => {
                setAppBarTitle(null);  // Blank title on exit
            };
        }
    }, [location])

    useEffect(() => {
        if (data) {
            setLoading(false)
            setAppBarElevation(data?.meta?.elevation)
            setAppBarTime(data?.meta?.update_time)
            return () => {
                setAppBarElevation(null);  // Blank title on exit
                setAppBarTime(null);
            };
        }
    }, [data])

    const forecastWeatherLink = useMemo(() => {
        if (location) {
            return `https://forecast.weather.gov/MapClick.php?lat=${location.lat}&lon=${location.lon}&lg=english&FcstType=graphical`
        }
    }, [location])

    return (
        <Box >
            <PageContainer>



                {!loading &&



                    <ResponsiveTable
                        location={location}
                        data={data?.data}
                    />
                }

            </PageContainer>
        </Box >
    )
}

export default LocationPage