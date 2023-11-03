import {supabaseClient} from "@/config";
import {SupabaseVectorStore} from "langchain/vectorstores/supabase";
import {OpenAIEmbeddings} from "langchain/embeddings/openai";
import {PromptTemplate} from "langchain/prompts";
import {ChatOpenAI} from "langchain/chat_models/openai";
import {RunnableSequence} from "langchain/schema/runnable";
import {StringOutputParser} from "langchain/schema/output_parser";
import {NextApiRequest, NextApiResponse} from "next";

const runLLMChain = async (docId: any, query: any) => {
    const encoder = new TextEncoder();

    const stream = new TransformStream();
    const writer = stream.writable.getWriter();

    try {
        const {data, error} = await supabaseClient
            .from("chat_messages")
            .select("*")
            .eq("document_id", docId)
            .order("created_at", {ascending: false});

        const chatHistory = (data ?? []).map(d => d.message).join("\n\n");

        const store = new SupabaseVectorStore(new OpenAIEmbeddings(), {
            client: supabaseClient,
            tableName: "document_chunks",
            queryName: "match_documents"
        });

        const retriever = store.asRetriever({
            metadata: {
                documentId: "documentId",
            }
        });

        /**
         * Create a prompt template for generating an answer based on context and
         * a question.
         *
         * Chat history will be an empty string if it's the first question.
         *
         * inputVariables: ["chatHistory", "context", "question"]
         */
        const questionPrompt = PromptTemplate.fromTemplate(
            `You are a super intelligent AI assistant that helps humans answer questions about documents. 
                You are given a document and a question. You must answer the question based on the document.
                If you don't know the answer, just say that you don't know, don't try to make up an answer.
              ----------------
              CONTEXT: {context}
              ----------------
              CHAT HISTORY: {chatHistory}
              ----------------
              QUESTION: {question}
              ----------------
              Helpful Answer:`
        );

        const model = new ChatOpenAI({
            modelName: "gpt-4",
            streaming: true,
            callbacks: [
                {
                    async handleLLMNewToken(token) {
                        await writer.ready;
                        await writer.write(encoder.encode(`${token}`));
                    },
                    async handleLLMEnd() {
                        await writer.ready;
                        await writer.close();
                    },
                },
            ]
        });

        const chain = RunnableSequence.from([
            {
                question: (input: { question: string; chatHistory?: string }) =>
                    input.question,
                chatHistory: (input: { question: string; chatHistory?: string }) =>
                    input.chatHistory ?? "",
                context: async (input: { question: string; chatHistory?: string }) => {
                    const relevantDocs = await retriever.getRelevantDocuments(input.question, {
                        metadata: {
                            documentId: docId,
                        },
                    });
                    const docs = await store.similaritySearch(input.question, 10,{
                        documentId: docId,
                    })
                    return docs.map((d: { pageContent: any; }) => d.pageContent).join("\n\n");
                    // return relevantDocs.map(d => d.pageContent).join("\n\n");
                },
            },
            questionPrompt,
            model,
            new StringOutputParser(),
        ]);

        chain.invoke({
            question: query,
            chatHistory: chatHistory,
        });

        // const answer = await chain.invoke({
        //     question: query,
        //     chatHistory: chatHistory,
        // });

        // await supabaseClient.from("chat_messages").insert({
        //     document_id: docId,
        //     message: query,
        //     origin: "user",
        // });
        //
        // await supabaseClient.from("chat_messages").insert({
        //     document_id: docId,
        //     message: answer,
        //     origin: "ai",
        // });

        // const chain = VectorDBQAChain.fromLLM(model, vectorStore, {
        //     k: 10,
        //     returnSourceDocuments: true,
        // });
        //
        // await chain.call({ query: query });

        // res.end()
    } catch (e) {
        console.log(e);
        // res.status(500).send('Error processing query.');
        return;
    }

    return stream.readable;
};

export async function POST(req: Request) {
    const body = await req.json();
    const {query, docId} = body;

    const stream = await runLLMChain(docId, query);
    return new Response(stream);
}
