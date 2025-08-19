import { Client, Databases, Query } from "appwrite";
import conf from "../conf/conf";
import type { createPostInterface, updatePostInterface } from "../types/types";

class DatabaseService {
    client = new Client();
    database;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.database = new Databases(this.client);
    }

    async createPost(
        slug: string,
        { status, title, content, featured_img, userId }: createPostInterface
    ) {
        try {
            const result = await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    userId,
                    title,
                    status,
                    content,
                    featured_img,
                }
            );

            return result;
        } catch (err) {
            console.log(err);
        }
    }

    async updatePost(
        slug: string,
        { status, title, content, featured_img }: updatePostInterface
    ) {
        try {
            await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    status,
                    content,
                    featured_img,
                }
            );

            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async deletePost(slug: string) {
        try {
            await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );

            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async getPost(slug: string) {
        try {
            const result = await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );

            return result;
        } catch (err) {
            console.log(err);
        }
    }

    async getAllPost() {
        try {
            const result = await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal("status", "active")
                ]
            );

            return result;
        } catch (err) {
            console.log(err);
        }
    }
}

const databaseService = new DatabaseService();

export default databaseService;
