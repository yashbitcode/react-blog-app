import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import databaseService from "../appwrite/database";
import { CustomContainer } from "../custom-components";
import { PostForm } from "../components/Post";

const EditPost = () => {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            databaseService.getPost(slug).then((post) => post && setPost(post));
        } else navigate("/");
    }, [slug, navigate]);

    console.log(post)

    return (
        post && (
            <CustomContainer>
                <PostForm post={post} />
            </CustomContainer>
        )
    );
};

export default EditPost;
