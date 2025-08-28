import { useEffect, useState } from "react";
import { CustomContainer } from "../custom-components";
import { PostCard } from "../components/Post";
import databaseService from "../appwrite/database";

const Home = () => {
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            const data = await databaseService.getAllPost();
            const posts = data?.documents;

            setPosts(posts.documents);
        };

        fetchPosts();
    }, []);

    return (
        <CustomContainer className="flex gap-4 flex-wrap">
            {
                posts ? posts.map((el) => (
                    <PostCard key={el.$id} {...el}  />
                )) : <p>Login to see posts</p>
            }
        </CustomContainer>
    );
};

export default Home;