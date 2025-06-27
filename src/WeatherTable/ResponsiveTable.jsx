import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';

import {
    Box
} from '@mui/material';

import VerticalTable from './Vertical/Table';
import HorizontalTable from './Horizontal/Table';

import '@/WeatherTable/assets/main.css';

export default function ResponsiveTable({ location, data }) {

    // Detect orientation: true if portrait
    const isPortrait = useMediaQuery('(orientation: portrait)');

    // Optional: Track orientation state for debugging or effects
    const [orientation, setOrientation] = useState('portrait');

    useEffect(() => {
        setOrientation(isPortrait ? 'portrait' : 'landscape');
    }, [isPortrait]);

    return (
        <>
            {isPortrait ? (
                <Box paddingLeft={0.5} paddingRight={0.5}>
                    <VerticalTable data={data} />
                </Box>
            ) : (
                <Box paddingLeft={1} paddingRight={1} paddingTop={1}>
                    <HorizontalTable location={location} data={data} />
                </Box>
            )}
        </>
    );
}