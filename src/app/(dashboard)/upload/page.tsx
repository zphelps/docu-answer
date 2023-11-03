"use client";
import {Backdrop, Card, CircularProgress, Container, IconButton, Stack, SvgIcon, Typography} from "@mui/material";
import { File, FileDropzone } from "@/components/file-dropzone";
import {useCallback, useEffect, useState} from "react";
import {useAuth} from "@/hooks/use-auth";
import {useRouter} from "@/hooks/use-router";

const UploadPage = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState<boolean>(false);
    const auth = useAuth();
    const router = useRouter();

    useEffect(
        () => {
            setFiles([]);
        },
        [open]
    );

    const handleDrop = useCallback(
        (newFiles: File[]): void => {
            setFiles((prevFiles) => {
                return [...prevFiles, ...newFiles];
            });
        },
        []
    );

    const handleRemove = useCallback(
        (file: File): void => {
            setFiles((prevFiles) => {
                return prevFiles.filter((_file) => _file.path !== file.path);
            });
        },
        []
    );

    const handleRemoveAll = useCallback(
        (): void => {
            setFiles([]);
        },
        []
    );

    const handleUpload = useCallback(
        async (): Promise<void> => {
            if (files.length === 0) {
                //TODO: Show error
                return;
            }
            setUploading(true)
            const formData = new FormData();
            formData.append('pdfFile', files[0]);

            const response = await fetch(`/api/document/upload?userId=${auth.user?.id}`, {
                method: "POST",
                body: formData,
            });

            console.log(response)
            if (response.status !== 200) return Promise.reject(response.body);
            const {id} = await response.json();
            setUploading(false)
            await router.push(`/documents/${id}`)
        }, [files]
    )

    return (
        <>
            <Container maxWidth={'md'} sx={{mt: 8}}>
                <Card
                    variant={'outlined'}
                    sx={{
                        px:3,
                        pb: 3
                    }}
                >
                    <Stack
                        alignItems="center"
                        direction="row"
                        justifyContent="space-between"
                        spacing={3}
                        sx={{
                            py: 3
                        }}
                    >
                        <Typography variant="h5">
                            Upload Document
                        </Typography>
                    </Stack>
                    <FileDropzone
                        accept={{ 'application/pdf': [] }}
                        caption="We currently only accept PDFs"
                        files={files}
                        onDrop={handleDrop}
                        onRemove={handleRemove}
                        onRemoveAll={handleRemoveAll}
                        onUpload={handleUpload}
                    />
                </Card>
            </Container>
            <Backdrop open={uploading} sx={{zIndex: 1000}}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
}

export default UploadPage;
