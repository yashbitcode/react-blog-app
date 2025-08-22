import { Client, ID, Storage } from "appwrite";
import conf from "../conf/conf";

class StorageService {
    client = new Client();
    storage;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.storage = new Storage(this.client);
    }

    async uploadFile(file: File) {
        try {
            const result = await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );

            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteFile(fileId: string) {
        try {
            await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            );

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    getFilePreview(fileId: string) {
        return this.storage.getFilePreview(
            conf.appwriteBucketId,
            fileId
        );
    } 
};

const storageService = new StorageService();

export default storageService;