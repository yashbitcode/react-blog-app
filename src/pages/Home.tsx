import { useEffect, useState } from "react";
import { CustomContainer } from "../custom-components";
import { PostCard } from "../components/Post";
import databaseService from "../appwrite/database";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import type { Models } from "appwrite";
import { Link } from "react-router-dom";
import VerificationComp from "../components/Verification/VerificationComp";

const Home = () => {
    const [posts, setPosts] = useState<undefined | Models.DefaultDocument[]>();
    const userStatus = useSelector((state: RootState) => state.auth.status);
    const verificationStatus = useSelector(
        (state: RootState) => state.auth.verified
    );

    useEffect(() => {
        const fetchPosts = async () => {
            const data = await databaseService.getAllPost();
            const posts = data?.documents;

            setPosts(posts);
        };

        if (userStatus && verificationStatus) fetchPosts();
    }, []);

    if (!verificationStatus && userStatus)
        return <VerificationComp />

    return userStatus ? (
        <CustomContainer className="flex gap-4 flex-wrap mt-7">
            {posts?.map((el) => (
                <PostCard key={el.$id} {...el} />
            ))}
        </CustomContainer>
    ) : (
        <div className="mx-auto w-fit mt-8">
            <Link to={"/login"}>login to read the blogs</Link>
        </div>
    );
};

export default Home;
