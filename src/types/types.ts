export interface confInterface {
    appwriteUrl: string;
    appwriteProjectId: string;
    appwriteDatabaseId: string;
    appwriteCollectionId: string;
    appwriteBucketId: string;
}

export interface createAccInterface {
    email: string;
    password: string;
    name: string;
}

export interface loginAccInterface {
    email: string;
    password: string;
}

export interface createPostInterface {
    status: string;
    title: string;
    content: string;
    featured_img: string;
    userId: string;
}

export interface updatePostInterface {
    status: string;
    title: string;
    content: string;
    featured_img: string;
}
