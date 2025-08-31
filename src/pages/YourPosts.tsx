import type { Models } from "appwrite";
import { PostCard } from "../components/Post";
import { CustomContainer } from "../custom-components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import databaseService from "../appwrite/database";

const YourPosts = () => {
    const [posts, setPosts] = useState<undefined | Models.DefaultDocument[]>();
    const { status, userData } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const fetchPosts = async () => {
            const data = await databaseService.getAllUserSpecificPosts(
                userData.$id
            );
            const posts = data?.documents;

            setPosts(posts);
        };

        if (status) fetchPosts();
    }, []);

    return (
        <CustomContainer className="flex gap-4 flex-wrap mt-7">
            {posts &&
                (posts.length !== 0 ? (
                    posts.map((el) => <PostCard key={el.$id} {...el} />)
                ) : (
                    <div className="text-center w-full">No posts found</div>
                ))}
        </CustomContainer>
    );
};

export default YourPosts;
