import { useMemo } from 'react';

import { Grid, Box, Paper, Link, Typography, Button, Divider } from '@mui/material';
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

    const groups = useMemo(() => {
        if (locations) {
            const grouped = locations.reduce((acc, item) => {
                if (!acc[item.category]) {
                    acc[item.category] = [];
                }
                acc[item.category].push(item);
                return acc;
            }, {});
            return grouped
        }
    }, [locations])

    console.log(groups)


    // Add a check to ensure locations is an array before using .map()
    if (!groups) {
        return <div>Loading...</div>;  // Or handle the error appropriately
    }


    return (
        <PageContainer padding={3}>
            {/* <PageHeader title="Home" /> */}
            <Grid container spacing={2} sx={{ padding: 2 }}>

                <Box sx={{ p: 2, width: "100%", maxWidth: "1200px", mx: "auto" }}>
                    {Object.entries(groups).map(([category, items]) => (
                        <Box key={category} sx={{ mb: 4 }}>
                            <Typography variant="h6" sx={{ mb: 1 }}>
                                {category}
                            </Typography>

                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                                {items.map((item) => (
                                    <Link
                                        key={item.id}
                                        component={RouterLink}
                                        to={`/location/${item.id}`}
                                        underline="hover"
                                        sx={{ flex: "1 1 200px" }} // Flex-grow layout for wider links
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </Box>

                            <Divider sx={{ mt: 2 }} />
                        </Box>
                    ))}
                </Box>


                {/* {locations.map((location) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={location.id}>
                        <Paper elevation={1} sx={{ padding: 1 }}>

                            <Typography variant="h6" component="h2">
                                <Button width={300} onClick={() => handleClick(location)}>{location.name}</Button>
                            </Typography>

                        </Paper>
                    </Grid>
                ))} */}
            </Grid>
        </PageContainer>
    )
};

export default HomePage;