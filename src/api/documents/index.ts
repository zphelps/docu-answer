import { File } from "../../components/file-dropzone";
import {supabaseClient} from "../../config";
import { v4 as uuidv4 } from 'uuid';

type CreateDocumentRequest = {
    file: File,
    uid: string,
}

type CreateDocumentResponse = {
    id: string,
}

class DocumentsApi {
    async getDocuments(uid: string) {
        const {data, error} = await supabaseClient.from("document_containers").select("*").eq("user_id", uid);
        if (error) return Promise.reject(error);
        return Promise.resolve(data);
    }

    async getDocument(documentId: string) {
        const {data, error} = await supabaseClient.from("document_containers").select("*").eq("id", documentId).single();
        const {data: messages, error: messagesError} = await supabaseClient.from("chat_messages").select("*").eq("document_id", documentId);
        data.messages = messages;
        if (error) return Promise.reject(error);
        return Promise.resolve(data);
    }
}

export const documentsApi = new DocumentsApi();
