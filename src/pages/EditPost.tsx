import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import databaseService from "../appwrite/database";
import { CustomContainer } from "../custom-components";
import { PostForm } from "../components/Post";
import type { Models } from "appwrite";

const EditPost = () => {
    const [post, setPost] = useState<null | Models.DefaultDocument>(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) databaseService.getPost(slug).then((post) => post && setPost(post));
        else navigate("/");
    }, [slug, navigate]);

    return (
        post && (
            <CustomContainer>
                <PostForm post={post} />
            </CustomContainer>
        )
    );
};

export default EditPost;
