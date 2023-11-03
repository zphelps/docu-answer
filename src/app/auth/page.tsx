"use client";

import {FC, useCallback} from 'react';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader, Container,
    Divider,
    FormHelperText,
    Link,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {Seo} from "@/components/seo";
import {useAuth} from "@/hooks/use-auth";
import {useMounted} from "@/hooks/use-mounted";
import {paths} from "@/paths";
import {useSearchParams} from "next/navigation";
import {AutoAwesome, Google} from "@mui/icons-material";
import {router} from "next/client";
import {useRouter} from "@/hooks/use-router";
import {maxWidth} from "@mui/system";

const Page: FC = () => {
    const isMounted = useMounted();
    const {signInWithGoogle} = useAuth();
    const searchParams = useSearchParams();
    const returnTo = searchParams.get('returnTo');
    const router = useRouter();

    const handleGoogleClick = useCallback(
        async (): Promise<void> => {
            try {
                await signInWithGoogle(returnTo || paths.documents.index);

            } catch (err) {
                console.error(err);
            }
        },
        [signInWithGoogle]
    );

    return (
        <>
            <Seo title="Login"/>
            <Box
                sx={{
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "top center",
                    backgroundImage: "url(\"/assets/gradient-bg.svg\")",
                }}
            >
                <Container
                    maxWidth={'xs'}
                    sx={{
                        height: '100vh',
                    }}
                >
                    <Box
                        display="flex"
                        flexDirection="column"
                        height="100vh"
                        justifyContent="center"
                    >
                        <Card elevation={16} sx={{p:3, justifyContent:'center'}}>
                            <Stack flexGrow={1} direction={"row"} justifyContent={'center'}>
                                <AutoAwesome color={"primary"} sx={{mr: 3}} fontSize={"large"}/>
                                <Typography fontSize={24} fontWeight={"900"} color={"primary"}>
                                    DocuAnswer
                                </Typography>
                            </Stack>
                            <Divider sx={{my: 2.5}}/>
                            <Button
                                fullWidth
                                onClick={handleGoogleClick}
                                // color={'inherit'}
                                variant={'outlined'}
                                sx={{
                                    alignItems:'center',
                                    // background: '#fcfcfc',
                                }}
                            >
                                <Box height={30} width={30} sx={{mr: 2}} >
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                                        <path fill="none" d="M0 0h48v48H0z"></path>
                                    </svg>
                                </Box>
                                <Typography variant={'subtitle1'} fontWeight={600}>
                                    Continue with Google
                                </Typography>
                            </Button>
                        </Card>
                    </Box>
                </Container>
            </Box>

        </>
    );
};

export default Page;
