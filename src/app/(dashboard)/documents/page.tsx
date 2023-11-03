"use client";

import {
    AppBar,
    Avatar,
    Box,
    Button, Card, CardActions,
    Container, Divider,
    Grid,
    IconButton,
    Menu,
    Stack,
    Toolbar,
    Typography
} from "@mui/material";
import {Adb, Add, AutoAwesome} from "@mui/icons-material";
import {RouterLink} from "@/components/router-link";
import {paths} from "@/paths";
import {useCallback, useEffect, useRef, useState} from "react";
import {QaDocument} from "@/types/qa-document";
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Import styles
import {useAuth} from "@/hooks/use-auth";
import {Seo} from "@/components/seo";
import {useMounted} from "@/hooks/use-mounted";
import {useDispatch, useSelector} from "react-redux";
import {setDocumentSliceStatus, upsertManyDocuments} from "@/slices/documents";
import {Status} from "@/utils/status";
import {styled} from "@mui/material/styles";
import {documentsApi} from "@/api/documents";

const useDocuments = (userId: string) => {
    const isMounted = useMounted();
    const dispatch = useDispatch();

    const handleDocumentsGet = useCallback(async () => {
        try {
            const response = await documentsApi.getDocuments(userId);

            if (isMounted()) {
                dispatch(upsertManyDocuments(response));
                dispatch(setDocumentSliceStatus(Status.SUCCESS));
            }
        } catch (err) {
            console.error(err);
            dispatch(setDocumentSliceStatus(Status.ERROR));
        }
    }, [isMounted, userId, dispatch]);

    useEffect(
        () => {
            handleDocumentsGet();
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );
};

const HoverGrowthCard = styled(Card)`
  transition: transform 0.3s;
  padding-bottom: 10px;
  &:hover {
    transform: scale(1.04); /* Adjust the scale value for desired growth effect */
  }
`;

const HomePage = () => {
    const auth = useAuth();

    useDocuments(auth.user?.id!);

    // @ts-ignore
    const documents: QaDocument[] = Object.values(useSelector((state) => state.documents).documents);

    return (
        <>
            <Seo title={"DocuAnswer"} />
            <Container maxWidth="lg" sx={{mt: 6}} >
                <Stack spacing={2}>
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'start'}>
                        <Typography variant={'h5'}>
                            All Documents
                        </Typography>
                        <Button
                            variant={'contained'}
                            startIcon={<Add />}
                            component={RouterLink}
                            href={paths.upload}
                        >
                            Upload
                        </Button>
                    </Stack>
                    {documents && <Grid container columnSpacing={2} rowSpacing={2}>
                        {documents.map((doc: QaDocument) => (
                            <Grid
                                sx={{
                                    textDecoration: 'none',
                                }}
                                component={RouterLink}
                                href={paths.documents.get(doc.id)}
                                item
                                key={doc.id}
                                xs={12} sm={4} md={3} lg={3}
                            >
                                <HoverGrowthCard sx={{height: 225, p: 2, alignItems: 'center'}}>
                                    <Stack
                                        direction={'row'}
                                        spacing={1.5}
                                    >
                                        <img src={"/assets/icons/icon-pdf.svg"} width={22} height={22}/>
                                        <Box>
                                            <Typography
                                                sx={{
                                                    display: '-webkit-box',
                                                    overflow: 'hidden',
                                                    WebkitBoxOrient: 'vertical',
                                                    WebkitLineClamp: 1,
                                                }}
                                                variant={"body2"}
                                            >
                                                {doc.name}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                    <Divider sx={{my: 2}}/>
                                    <Stack width={'100%'} alignItems={'center'}>
                                        <Document loading={<></>} file={doc.public_url} onLoadSuccess={() => {}}>
                                            <Page loading={<></>} width={230} scale={1} pageNumber={1} />
                                        </Document>
                                    </Stack>

                                </HoverGrowthCard>
                            </Grid>
                        ))}
                    </Grid>}

                </Stack>
            </Container>
        </>
    );
}

export default HomePage;
