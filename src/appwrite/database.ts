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

    async createPost({
        status,
        slug,
        title,
        content,
        featured_img,
        userId,
    }: createPostInterface) {
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
            console.log(result);

            return result;
        } catch (err) {
            return {
                success: false,
                error: err,
            };
        }
    }

    async updatePost({
        status,
        slug,
        title,
        content,
        featured_img,
    }: updatePostInterface) {
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

    async getAllPost(queries = [Query.equal("status", "active")]) {
        try {
            const result = await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );

            return result;
        } catch (err) {
            console.log(err);
        }
    }

    async getAllUserSpecificPosts(
        userId: string,
        queries = [Query.equal("userId", userId)]
    ) {
        try {
            const result = await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );

            return result;
        } catch (err) {
            console.log(err);
        }
    }
}

const databaseService = new DatabaseService();

export default databaseService;
