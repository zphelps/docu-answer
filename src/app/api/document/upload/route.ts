import {randomUUID} from "crypto";
import {PDFLoader} from "langchain/document_loaders/fs/pdf";
import {TokenTextSplitter} from "langchain/text_splitter";
import {SupabaseVectorStore} from "langchain/vectorstores/supabase";
import {OpenAIEmbeddings} from "langchain/embeddings/openai";
import {supabaseClient} from "@/config";
import {NextRequest} from "next/server";

export async function POST(req: NextRequest, res: Response) {
    // const body = await req.json();
    const formData = await req.formData();
    const userId = req.nextUrl.searchParams.get("userId")

    try {
        const file = formData.get('pdfFile') as File;
        const buffer = await file.arrayBuffer();
        // Use your PDFLoader with the buffer
        // Depending on the implementation of PDFLoader, you might need to modify it to accept a buffer or save the buffer to a temp file.
        const loader = new PDFLoader(new Blob([buffer]), {
            splitPages: false,
        });
        const docs = await loader.load();

        const splitter = new TokenTextSplitter({
            encodingName: "gpt2",
            chunkSize: 400,
            chunkOverlap: 50,
        });

        const text = docs[0].pageContent;

        const splitDocs = await splitter.createDocuments([text]);

        const docId = randomUUID();

        // add user id to metadata
        const output = splitDocs.map(doc => {
            doc.metadata.userId = userId;
            doc.metadata.documentId = docId;
            return doc;
        });

        const store = new SupabaseVectorStore(new OpenAIEmbeddings(), {
            client: supabaseClient,
            tableName: "documents",
        });

        await store.addDocuments(output);

        const fileName = `${userId}/${docId}.${file.type.split("/")[1]}`;
        const { error } = await supabaseClient
            .storage
            .from('documents')
            .upload(fileName, new Blob([buffer]), {
                cacheControl: '3600',
                upsert: false,
                contentType: file.type
            })

        const { data } = supabaseClient
            .storage
            .from('documents')
            .getPublicUrl(fileName)

        await supabaseClient.from("document_containers").insert({
            id: docId,
            user_id: userId,
            name: file.name,
            public_url: data.publicUrl,
        });

        return Response.json({id: docId});
    } catch (e) {
        console.log(e);
        return Response.error();
    }
}

