import storageService from "../../appwrite/storage";
import type { PostCardInterface } from "../../types/types";
import { Link } from "react-router-dom";

const PostCard = ({
    $id,
    title,
    featuredImg
}: PostCardInterface) => {
    return (
        <Link to={`post/${$id}`}>
            <div>
                <div className="w-full max-w-3xs">
                    <img src={storageService.getFilePreview(featuredImg)} alt={title} />
                </div>
                <h1>{title}</h1>
            </div>
        </Link>
    );
};

export default PostCard;