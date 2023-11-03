import type {FC} from "react";
import EyeIcon from "@untitled-ui/icons-react/build/esm/Eye";
import LayoutBottomIcon from "@untitled-ui/icons-react/build/esm/LayoutBottom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import {useTheme} from "@mui/material/styles";

import {RouterLink} from "@/components/router-link";
import {paths} from "@/paths";
import {Upload01, Upload02} from "@untitled-ui/icons-react";
import {FileDropzone} from "@/components/file-dropzone";
import Chip from "@mui/material/Chip";

export const HomeHero: FC = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top center",
                backgroundImage: "url(\"/assets/gradient-bg.svg\")",
                pt: "120px",
            }}
        >
            <Container maxWidth="lg">
                <Box width={"100%"} display={"flex"} justifyContent={"center"}>
                    <Box maxWidth={"md"}>
                        <Box sx={{mt: 5}} display={'flex'} width={'100%'} justifyContent={"center"}>
                            <Chip label="We are currently in private beta 🚀" variant="outlined" />
                        </Box>
                        <Typography
                            variant="h1"
                            textAlign={"center"}
                            sx={{mb: 5, mt: 4}}
                        >
                            I need to come up with a more&nbsp;
                            <Typography
                                component="span"
                                color="primary.main"
                                variant="inherit"
                            >
                                ~creative~
                            </Typography>
                            {' catch phrase.'}
                        </Typography>
                        <Typography
                            color="text.secondary"
                            textAlign={"center"}
                            sx={{
                                fontSize: 20,
                                fontWeight: 500,
                                mb: 5
                            }}
                        >
                            This is where I will put some clever DBrand-like marketing slogan once David gets off his ass and write is for me. David please get on this ;)
                        </Typography>
                        <FileDropzone
                            accept={{"application/pdf": []}}
                            caption="We currently only accept PDFs"
                            files={[]}
                            onDrop={() => {
                            }}
                            onRemove={() => {
                            }}
                            onRemoveAll={() => {
                            }}
                            onUpload={() => {
                            }}
                        />
                        {/*<Stack*/}
                        {/*    alignItems="center"*/}
                        {/*    direction="row"*/}
                        {/*    flexWrap="wrap"*/}
                        {/*    spacing={1}*/}
                        {/*    sx={{my: 3}}*/}
                        {/*>*/}
                        {/*    <Rating*/}
                        {/*        readOnly*/}
                        {/*        value={4.7}*/}
                        {/*        precision={0.1}*/}
                        {/*        max={5}*/}
                        {/*    />*/}
                        {/*    <Typography*/}
                        {/*        color="text.primary"*/}
                        {/*        variant="caption"*/}
                        {/*        sx={{fontWeight: 700}}*/}
                        {/*    >*/}
                        {/*        4.7/5*/}
                        {/*    </Typography>*/}
                        {/*    <Typography*/}
                        {/*        color="text.secondary"*/}
                        {/*        variant="caption"*/}
                        {/*    >*/}
                        {/*        based on (70+ reviews)*/}
                        {/*    </Typography>*/}
                        {/*</Stack>*/}
                        {/*<Stack*/}
                        {/*    alignItems="center"*/}
                        {/*    justifyContent={"center"}*/}
                        {/*    direction="row"*/}
                        {/*    spacing={2}*/}
                        {/*>*/}
                        {/*    <Button*/}
                        {/*        component={RouterLink}*/}
                        {/*        href={paths.index}*/}
                        {/*        startIcon={*/}
                        {/*            <SvgIcon fontSize="small">*/}
                        {/*                <Upload01/>*/}
                        {/*            </SvgIcon>*/}
                        {/*        }*/}
                        {/*        sx={(theme) =>*/}
                        {/*            theme.palette.mode === "dark"*/}
                        {/*                ? {*/}
                        {/*                    backgroundColor: "neutral.50",*/}
                        {/*                    color: "neutral.900",*/}
                        {/*                    "&:hover": {*/}
                        {/*                        backgroundColor: "neutral.200",*/}
                        {/*                    },*/}
                        {/*                }*/}
                        {/*                : {*/}
                        {/*                    backgroundColor: "neutral.900",*/}
                        {/*                    color: "neutral.50",*/}
                        {/*                    "&:hover": {*/}
                        {/*                        backgroundColor: "neutral.700",*/}
                        {/*                    },*/}
                        {/*                }*/}
                        {/*        }*/}
                        {/*        variant="contained"*/}
                        {/*        size={"large"}*/}
                        {/*    >*/}
                        {/*        Upload*/}
                        {/*    </Button>*/}
                        {/*</Stack>*/}
                    </Box>
                </Box>
                <Box
                    sx={{
                        pt: "120px",
                        position: "relative",
                    }}
                >
                    {/*<Box*/}
                    {/*  sx={{*/}
                    {/*    overflow: 'hidden',*/}
                    {/*    width: '90%',*/}
                    {/*    fontSize: 0,*/}
                    {/*    mt: -2, // hack to cut the bottom box shadow*/}
                    {/*    mx: -2,*/}
                    {/*    pt: 2,*/}
                    {/*    px: 2,*/}
                    {/*    '& img': {*/}
                    {/*      borderTopLeftRadius: (theme) => theme.shape.borderRadius * 2.5,*/}
                    {/*      borderTopRightRadius: (theme) => theme.shape.borderRadius * 2.5,*/}
                    {/*      boxShadow: 16,*/}
                    {/*      width: '100%',*/}
                    {/*    },*/}
                    {/*  }}*/}
                    {/*>*/}
                    {/*  <img*/}
                    {/*    src={*/}
                    {/*      theme.palette.mode === 'dark'*/}
                    {/*        ? '/assets/home-thumbnail-dark.png'*/}
                    {/*        : '/assets/home-thumbnail-light.png'*/}
                    {/*    }*/}
                    {/*  />*/}
                    {/*</Box>*/}
                    {/*<Box*/}
                    {/*  sx={{*/}
                    {/*    maxHeight: '100%',*/}
                    {/*    maxWidth: '100%',*/}
                    {/*    overflow: 'hidden',*/}
                    {/*    position: 'absolute',*/}
                    {/*    right: 0,*/}
                    {/*    top: 40,*/}
                    {/*    '& > div': {*/}
                    {/*      height: 460,*/}
                    {/*      width: 560,*/}
                    {/*    },*/}
                    {/*  }}*/}
                    {/*>*/}
                    {/*  <HomeCodeSamples />*/}
                    {/*</Box>*/}
                </Box>
            </Container>
        </Box>
    );
};
