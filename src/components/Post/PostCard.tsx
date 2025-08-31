import type { Models } from "appwrite";
import storageService from "../../appwrite/storage";
import { Link } from "react-router-dom";

const PostCard = ({
    $id,
    title,
    featured_img
}: Models.DefaultDocument) => {
    return (
        <Link to={`/post/${$id}`} className="shadow-md p-4">
            <div>
                <div className="w-full max-w-3xs">
                    <img src={storageService.getFilePreview(featured_img)} alt={title} />
                </div>
                <h1>{title}</h1>
            </div>
        </Link>
    );
};

export default PostCard;