import type React from "react";

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

export interface CustomContainerInterface {
    className?: string;
    children: React.ReactNode;
}

export interface CustomButtonInterface extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    type?: "submit" | "reset" | "button" | undefined;
    children: string | React.ReactNode;
    className?: string;
}

export interface CustomInputInterface extends React.InputHTMLAttributes<HTMLInputElement> {
    id?: string;
    type?: string;
    label?: string;
    className?: string;
    ref?: React.Ref<HTMLInputElement>;
}

export interface CustomSelectInterface extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: string[],
    id?: string;
    type?: string;
    label?: string;
    className?: string;
}

export interface PostCardInterface {
    $id: string;
    title: string;
    featuredImg: string;
};