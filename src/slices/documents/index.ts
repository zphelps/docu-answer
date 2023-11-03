import { createSlice } from "@reduxjs/toolkit";
import {Status} from "@/utils/status";
import {QaDocument} from "@/types/qa-document";

type DocumentState = {
    documents: { [key: string]: QaDocument };
    status: Status;
};

const initialState: DocumentState = {
    documents: {},
    status: Status.IDLE,
};

const documentsSlice = createSlice({
    name: "documentsSlice",
    initialState,
    reducers: {
        upsertManyDocuments: (state, action) => {
            const docs = action.payload;
            docs.forEach((document: QaDocument) => {
                state.documents[document.id] = document;
            });
        },
        upsertOneDocument: (state, action) => {
            const doc = action.payload;
            state.documents[doc.id] = doc;
        },
        setDocumentSliceStatus: (state, action) => {
            state.status = action.payload;
        },
    },
});

export const {
    upsertManyDocuments,
    upsertOneDocument,
    setDocumentSliceStatus
} = documentsSlice.actions;
export default documentsSlice.reducer;
