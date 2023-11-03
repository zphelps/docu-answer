import {ChatMessage} from "./chat-message";

export interface QaDocument {
    id: string;
    user_id: string;
    name: string;
    gcsUri: string;
    public_url: string;
    text: string;
    summary: string;
    operation_name: string;
    isProcessed: boolean;
    messages: ChatMessage[];
}
