import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { RootState } from "../store/store";
import databaseService from "../appwrite/database";
import storageService from "../appwrite/storage";
import { CustomButton, CustomContainer } from "../custom-components";
import type { Models } from "appwrite";

const Post = () => {
    const [post, setPost] = useState<Models.DefaultDocument | null>(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state: RootState) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            databaseService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const handleDelete = () => {
        if(!post?.$id) return;
        
        databaseService.deletePost(post.$id).then((status) => {
            if (status) {
                storageService.deleteFile(post?.featured_img);
                navigate("/");
            }
        }); 
    };

    return (
        post && (
            <CustomContainer className="mt-7">
                <div>
                    <img
                        src={storageService.getFilePreview(post.featured_img)}
                        alt={post.title}
                        className="max-w-lg mx-auto"
                    />
                    {isAuthor && (
                        <div className="flex flex-col max-w-40 mx-auto mt-5 gap-3">
                            <Link to={`/edit-post/${slug}`}>
                                <CustomButton>Edit Post</CustomButton>
                            </Link>
                            <CustomButton onClick={handleDelete}>
                                Delete Post
                            </CustomButton>
                        </div>
                    )}
                </div>

                <div>
                    <h1 className="text-2xl font-semibold underline my-10">{post.title}</h1>
                    <p>{parse(post.content)}</p>
                </div>
            </CustomContainer>
        )
    );
};

export default Post;
