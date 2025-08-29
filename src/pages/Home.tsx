import { useEffect, useState } from "react";
import { CustomContainer } from "../custom-components";
import { PostCard } from "../components/Post";
import databaseService from "../appwrite/database";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

const Home = () => {
    const [posts, setPosts] = useState(null);
    const userStatus = useSelector((state: RootState) => state.auth.status);

    useEffect(() => {
        const fetchPosts = async () => {
            const data = await databaseService.getAllPost();
            const posts = data?.documents;

            setPosts(posts);
        };

        fetchPosts();
    }, []);

    return userStatus ? (
        <CustomContainer className="flex gap-4 flex-wrap mt-7">
            {
                posts?.map((el) => (
                    <PostCard key={el.$id} {...el}  />
                ))
            }
        </CustomContainer>
    ) : (
        <p className="text-center mt-7">login to read the blogs</p>
    );
};

export default Home;