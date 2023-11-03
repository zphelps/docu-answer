import {useState, type FC, type ReactNode} from "react";
import PropTypes from "prop-types";
import {withAuthGuard} from "@/hocs/with-auth-guard";
import {
    AppBar, Avatar,
    Box,
    Container,
    IconButton,
    ListItemIcon, ListItemText,
    Menu,
    MenuItem,
    Stack,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import {AutoAwesome, Logout} from "@mui/icons-material";
import {supabaseClient} from "@/config";
import {useRouter} from "@/hooks/use-router";
import {paths} from "@/paths";
import {useAuth} from "@/hooks/use-auth";

interface LayoutProps {
    children?: ReactNode;
}

export const Layout: FC<LayoutProps> = withAuthGuard((props) => {

    const router = useRouter();
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const auth = useAuth();

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        <>
            <AppBar position="fixed">
                <Container maxWidth={false} disableGutters>
                    <Toolbar>
                        <Box onClick={() => router.push(paths.documents.index)}>
                            <Stack flexGrow={1} direction={"row"}>
                                <AutoAwesome color={"primary"} sx={{mr: 2.25}} fontSize={"large"}/>
                                <Typography fontSize={24} fontWeight={"900"} color={"primary"}>
                                    DocuAnswer
                                </Typography>
                            </Stack>
                        </Box>

                        <Box sx={{flexGrow: 1}}/>

                        <Box sx={{justifyContent:'flex-end'}}>
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                <Avatar src={auth.user?.avatarURL}/>
                            </IconButton>
                            <Menu
                                sx={{mt: "45px"}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem
                                    onClick={async () => {
                                        await supabaseClient.auth.signOut();
                                        router.replace(paths.index);
                                        router.refresh();
                                    }}
                                >
                                    <ListItemIcon>
                                        <Logout/>
                                    </ListItemIcon>
                                    <ListItemText>Log Out</ListItemText>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box sx={{mt: 8}}>
                {props.children}
            </Box>
        </>
    );
});

Layout.propTypes = {
    children: PropTypes.node,
};
