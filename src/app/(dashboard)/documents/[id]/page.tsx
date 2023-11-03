"use client";
import {
    AppBar,
    Avatar,
    Box, Breadcrumbs, Link,
    Button,
    Container,
    Grid,
    IconButton,
    Menu,
    Stack, SvgIcon,
    Toolbar,
    Typography
} from "@mui/material";
import {DocViewer} from "@/components/doc-viewer";
import {Chat} from "@/components/chat";
import {useCallback, useEffect, useState} from "react";
import {ArrowBack} from "@mui/icons-material";
import {documentsApi} from "@/api/documents";
import {RouterLink} from "@/components/router-link";
import {paths} from "@/paths";
import {Edit02, Share01, Trash01} from "@untitled-ui/icons-react";
import {Seo} from "@/components/seo";
import {useMounted} from "@/hooks/use-mounted";
import {useDispatch, useSelector} from "react-redux";
import {setDocumentSliceStatus, upsertManyDocuments, upsertOneDocument} from "@/slices/documents";
import {Status} from "@/utils/status";

const useDocument = (docId: string) => {
    const isMounted = useMounted();
    const dispatch = useDispatch();

    const handleDocumentGet = useCallback(async () => {
        try {
            const response = await documentsApi.getDocument(docId);

            if (isMounted()) {
                dispatch(upsertOneDocument(response));
                dispatch(setDocumentSliceStatus(Status.SUCCESS));
            }
        } catch (err) {
            console.error(err);
            dispatch(setDocumentSliceStatus(Status.ERROR));
        }
    }, [isMounted, dispatch, docId]);

    useEffect(
        () => {
            handleDocumentGet();
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );
};

export default function Page({ params }: { params: { id: string } }) {

    useDocument(params.id);

    // @ts-ignore
    const doc = useSelector(state => state.documents).documents[params.id];

    return (
        <>
            <Seo title={doc?.name ?? 'DocuAnswer'} />
            <Container maxWidth={false} sx={{mt: 2}}>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Stack>
                        <div>
                            <Link
                                color="text.primary"
                                component={RouterLink}
                                href={paths.documents.index}
                                sx={{
                                    alignItems: 'center',
                                    display: 'inline-flex'
                                }}
                                underline="hover"
                            >
                                <SvgIcon sx={{ mr: 1 }}>
                                    <ArrowBack />
                                </SvgIcon>
                                <Typography variant="subtitle2">
                                    Documents
                                </Typography>
                            </Link>
                        </div>
                        <Button
                            sx={{
                                mb: 2,
                                mt: 0,
                                p: 0,
                                px: 1,
                                alignItems: 'center',
                            }}
                            color={'inherit'}
                            endIcon={<Edit02 fontSize={'small'}/>}
                        >
                            <Typography fontSize={28} fontWeight={800}>
                                {doc?.name}
                            </Typography>
                        </Button>

                    </Stack>
                    <Stack direction={'row'} spacing={1}>
                        <Button
                            variant={'outlined'}
                            color={'primary'}
                            startIcon={<Share01/>}
                        >
                            Share
                        </Button>
                        <Button
                            variant={'outlined'}
                            color={'error'}
                            startIcon={<Trash01/>}
                        >
                            Delete
                        </Button>
                    </Stack>
                </Stack>
                {doc && <Grid container spacing={1}>
                    <Grid item xs={12} md={6}>
                        <DocViewer fileUrl={doc.public_url}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Chat doc={doc} />
                    </Grid>
                </Grid>}
            </Container>
        </>
    );
}
