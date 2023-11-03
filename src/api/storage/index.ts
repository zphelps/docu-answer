import { File } from "../../components/file-dropzone";
import {documentAiApi} from "../document-ai";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {storage} from "../../config";

type UploadDocumentRequest = {
    file: File,
}

type UploadDocumentResponse = Promise<{
    gscUri: string;
    publicUrl: string;
}>;

class StorageApi {
    async upload(request: UploadDocumentRequest): UploadDocumentResponse {
        const {file} = request;

        const storageRef = ref(storage, file.name);

        // Get the GCS path
        const bucketName = storageRef.bucket;
        const fullPath = storageRef.fullPath;
        const gcsPath = `gs://${bucketName}/${fullPath}`;

        // 'file' comes from the Blob or File API
        await uploadBytes(storageRef, file);
        const publicUrl = await getDownloadURL(storageRef);
        return Promise.resolve({gscUri: gcsPath, publicUrl: publicUrl});
    }

}

export const storageApi = new StorageApi();
