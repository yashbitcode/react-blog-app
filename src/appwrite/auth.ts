import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";
import type { createAccInterface, loginAccInterface } from "../types/types";

class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }: createAccInterface) {
        try {
            const userAcc = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );

            return userAcc;
        } catch (err) {
            console.log(err);
        }
    }

    async loginAccount({ email, password }: loginAccInterface) {
        try {
            const userAcc = await this.account.createEmailPasswordSession(
                email,
                password
            );

            return userAcc;
        } catch (err) {
            console.log(err);
        }
    }

    async getCurrentUser() {
        try {
            const user = await this.account.get();
            return user;
        } catch (err) {
            console.log(err);
        }
    }

    async logoutUser() {
        try {
            await this.account.deleteSession("current");
        } catch (err) {
            console.log(err);
        }
    }

    async sendVerificationEmail(url: string) {
        try {
            const res = await this.account.createVerification(url);

            return res;
        } catch (err) {
            console.log(err);
        }
    }

    async updateEmailVerification() {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const secret = urlParams.get("secret") || "";
            const userId = urlParams.get("userId") || "";

            const res = await this.account.updateVerification(userId, secret);
            return res;
        } catch (err) {
            console.log(err);
        }
    }
}

const authService = new AuthService();

export default authService;
