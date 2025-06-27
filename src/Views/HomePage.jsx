import { Grid, Paper, Typography, Button } from '@mui/material';
import PageHeader from "@/utils/PageHeader";
import PageContainer from '@/utils/PageContainer';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { locationsAtom, locationAtom } from '@/NWS/atoms'

const HomePage = () => {

    const navigate = useNavigate()
    const locations = useAtomValue(locationsAtom);
    const setLocation = useSetAtom(locationAtom);

    const handleClick = (location) => {
        setLocation(location)

        navigate(`/location/${location.id}`)
    }

    // Add a check to ensure locations is an array before using .map()
    if (!Array.isArray(locations)) {
        return <div>Loading...</div>;  // Or handle the error appropriately
    }


    return (
        <PageContainer>
            {/* <PageHeader title="Home" /> */}
            <Grid container spacing={2} sx={{ padding: 2 }}>

                {locations.map((location) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={location.id}>
                        <Paper elevation={1} sx={{ padding: 1 }}>

                            <Typography variant="h6" component="h2">
                                <Button width={300} onClick={() => handleClick(location)}>{location.name}</Button>
                            </Typography>

                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </PageContainer>
    )
};

export default HomePage;