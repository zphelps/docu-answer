

type CreateDocumentRequest = {
    googleAccessToken: string,
    title: string,
    text: string,
}

type CreateDocumentResponse = {
    url: string,
}

class GoogleDocsApi {
    async createDocument(request: CreateDocumentRequest): Promise<CreateDocumentResponse> {
        const {googleAccessToken, text, title} = request;

        const createRes = await fetch(`https://docs.googleapis.com/v1/documents?title=${title}`, {
            method: 'POST',
            headers: new Headers({
                'Authorization': `Bearer ${googleAccessToken}`,
            }),
        }).then(res => res.json());

        if (createRes.error) {
            return Promise.reject(createRes.error);
        }

        const documentId = createRes.documentId;

        const insertRes = await fetch(`https://docs.googleapis.com/v1/documents/${documentId}:batchUpdate`, {
            method: 'POST',
            headers: new Headers({
                'Authorization': `Bearer ${googleAccessToken}`,
            }),
            body: JSON.stringify({
                "requests": [
                    {
                        "insertText": {
                            "text": text,
                            "location": {
                                "index": 1
                            }
                        }
                    }
                ]
            })
        }).then(res => res.json());

        if (insertRes.error) {
            return Promise.reject(insertRes.error);
        }

        return Promise.resolve({url: 'https://docs.google.com/document/d/' + documentId + '/edit'})
    }

}

export const googleDocsApi = new GoogleDocsApi();
