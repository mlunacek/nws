import { Link } from 'react-router-dom';
import {
    AppBar as MuiAppBar,
    Toolbar,
    Divider,
    Typography,
} from '@mui/material';

import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Menu as MenuIcon } from '@mui/icons-material';

import { useAtom, useAtomValue } from 'jotai';
import {
    showAppBarAtom,
    drawerOpenAtom,
    appBarTitleAtom,
    appBarLinkAtom,
    appBarRightAtom,
    appBarRightLinkAtom
} from '@/Layout/atoms';

export default function AppBar({ children }) {

    const showAppBar = useAtomValue(showAppBarAtom);
    const [drawerOpen, setDrawerOpen] = useAtom(drawerOpenAtom);
    const appBarTile = useAtomValue(appBarTitleAtom);
    const appBarLink = useAtomValue(appBarLinkAtom);

    const appBarRight = useAtomValue(appBarRightAtom);
    const appBarRightLink = useAtomValue(appBarRightLinkAtom);


    if (!showAppBar) {
        return null;
    }

    return (
        <MuiAppBar elevation={0} position="sticky" color="inherit" variant="dense">
            <Divider />
            <Toolbar variant="dense">
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={() => setDrawerOpen((prev) => !prev)}
                >
                    {drawerOpen ? <ChevronLeftIcon /> : <MenuIcon />}
                </IconButton>

                <Typography
                    component={Link}
                    to={"/"}
                    variant="h6"
                    sx={{
                        mr: 2,
                        fontWeight: 300,
                        textDecoration: 'none',
                        paddingRight: 1,
                        color: 'inherit',
                    }}
                >
                    {"/"}
                </Typography>

                <Typography
                    component={Link}
                    to={appBarLink}
                    variant="h6"
                    sx={{
                        mr: 2,
                        fontWeight: 300,
                        textDecoration: 'none',
                        paddingRight: 1,
                        color: 'inherit',
                    }}
                >
                    {appBarTile}
                </Typography>

                {appBarRight &&
                    <Typography
                        component={Link}
                        to={appBarRightLink}
                        variant="h6"
                        sx={{
                            mr: 2,
                            fontWeight: 300,
                            textDecoration: 'none',
                            paddingRight: 4,
                            color: 'inherit',
                        }}
                    >
                        / {appBarRight}
                    </Typography>
                }


                {children}

            </Toolbar>

            <Divider />
        </MuiAppBar>
    );
}

