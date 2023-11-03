import {
    Box,
    Card, CardActionArea, CardActions,
    CardHeader,
    CircularProgress,
    Divider,
    IconButton, LinearProgress,
    OutlinedInput,
    Stack,
    Typography
} from "@mui/material";
import {AutoDelete, Clear, HourglassEmptyOutlined, OpenInNew, Send} from "@mui/icons-material";
import {FC, useEffect, useRef, useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import {googleDocsApi} from "@/api/google-docs";
import {useAuth} from "@/hooks/use-auth";
import {QaDocument} from "@/types/qa-document";

type MessageType = "user" | "ai";

interface Message {
    id: string;
    text: string;
    messageType: MessageType;
}

interface ChatProps {
    doc: QaDocument;
}

export const Chat: FC<ChatProps> = (props) => {
    const { doc } = props;
    const [query, setQuery] = useState("");
    const [generating, setGenerating] = useState(false);
    const messagesContainerRef = useRef<null | HTMLDivElement>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const auth = useAuth();
    const [creatingGDocForId, setCreatingGDocForId] = useState<string | null>(null);

    const handleQuery = async () => {
        setGenerating(true);
        const generatingMessageId = uuidv4();

        const _query = query;
        setQuery("");

        setMessages((prevMessages) => [
            ...prevMessages,
            {id: uuidv4(), text: query, messageType: "user"},
            {id: generatingMessageId, text: "", messageType: "ai"}
        ])

        const response = await fetch(`/api/document/query`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({query: _query, docId: doc.id})
        });

        // Stream response
        if (!response.body) throw new Error("No response body");
        const reader = response.body.getReader();

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const text = new TextDecoder("utf-8").decode(value);
            setMessages(prevMessages => [...prevMessages.map((message) => {
                if (message.id === generatingMessageId) {
                    return {
                        ...message,
                        text: message.text + text
                    };
                } else {
                    return message as Message;
                }
            })]);
        }
        setGenerating(false);
    }

    const handleCreateGDoc = async (message: Message) => {
        setCreatingGDocForId(message.id);
        const res = await googleDocsApi.createDocument({
            title: `${doc.name} - ${new Date().toLocaleString()}`,
            googleAccessToken: auth.user?.googleAccessToken!,
            text: message.text
        })
        window.open(res.url, '_blank');
        setCreatingGDocForId(null);
    }

    useEffect(() => {
        setMessages((doc.messages ?? []).map((message) => {
            return {
                id: message.id,
                text: message.message,
                messageType: message.origin === "user" ? "user" : "ai",
            }
        }));
    }, [doc.messages]);

    useEffect(() => {
        if (messagesContainerRef.current) {
            if (messagesContainerRef.current) {
                const element = messagesContainerRef.current;
                element.scrollTop = element.scrollHeight;
            }
        }
    }, [messages]);

    return (
        <Card sx={{ display: 'flex', flexDirection: 'column', height: '85vh' }}>
            <CardHeader sx={{pt: 3, pb: 1}} title="Chat" action={(
                <IconButton onClick={() => setMessages([])}>
                    <AutoDelete />
                </IconButton>
            )} />

            <Box sx={{flexGrow: 1, overflowY: "auto"}} ref={messagesContainerRef}>
                {messages && messages.map((message: Message) => {
                    const isUser = message.messageType === "user";
                    return (
                        <Stack key={message.id} width={"100%"} alignItems={isUser ? "end" : "start"}
                               sx={{px: 2, my: 2}}>
                            <Box maxWidth={"85%"}
                                 sx={{background: (theme) => isUser ? theme.palette.primary.main : theme.palette.divider, borderRadius: "12px", py: 1, px: 1.5}}>
                                <Typography color={"white"} variant={"subtitle1"} whiteSpace={"pre-line"}>
                                    {message.text === "" ? "..." : message.text}
                                </Typography>
                            </Box>
                            {!isUser && message.text.length > 200 && (
                                <CardActions>
                                    <CardActionArea
                                        onClick={() => handleCreateGDoc(message)}
                                        disabled={creatingGDocForId != null}
                                        sx={{p: 1, borderRadius: 1}}
                                    >
                                        <Stack direction={"row"} spacing={1}>
                                            {creatingGDocForId != null &&
                                                <CircularProgress size={18} color={"primary"}/>}
                                            {creatingGDocForId == null &&
                                                <OpenInNew color={"primary"} fontSize={"small"}/>}
                                            <Typography color={"primary"} variant={"caption"}>
                                                Open with Google Docs
                                            </Typography>
                                        </Stack>
                                    </CardActionArea>
                                </CardActions>
                            )}
                        </Stack>
                    );
                })}
            </Box>

            <Divider />

            <Stack spacing={1} direction={"row"} sx={{m: 2}}>
                <OutlinedInput
                    fullWidth
                    multiline
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask a question about this document..."
                    onKeyDown={async (e) => {
                        if (e.key === "Enter" && !generating) {
                            await handleQuery();
                        }
                    }}
                />
                <IconButton
                    disabled={generating}
                    onClick={handleQuery}
                >
                    {!generating && <Send color={"primary"}/>}
                    {generating && <CircularProgress size={25}/>}
                </IconButton>
            </Stack>
            {/*{!doc?.isProcessed && (*/}
            {/*    <Stack>*/}
            {/*        <LinearProgress sx={{height: 10}} />*/}
            {/*    </Stack>*/}
            {/*)}*/}
        </Card>
    );
}
