import { useForm, type SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../../store/store";
import storageService from "../../../appwrite/storage";
import databaseService from "../../../appwrite/database";
import { useCallback, useEffect } from "react";
import {
    CustomButton,
    CustomInput,
    CustomSelect,
} from "../../../custom-components";
import RTE from "../../RTE/RTE";
import type { Models } from "appwrite";

type Inputs = {
    title: string;
    slug: string;
    content: string;
    status: string;
    image: FileList;
    featured_img: string;
};

const PostForm = ({ post }: { post?: Models.DefaultDocument }) => {
    const {
        register,
        handleSubmit,
        watch,
        control,
        setValue,
        setError,
        getValues,
        clearErrors,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state: RootState) => state.auth.userData);

    const handlePost: SubmitHandler<Inputs> = async (data) => {
        console.log(data);
        let dbPost;

        if (post) {
            const file = data?.image?.[0]
                ? await storageService.uploadFile(data?.image[0])
                : null;

            if (file) storageService.deleteFile(post.featured_img);

            if (data.slug === post.$id) {
                dbPost = await databaseService.updatePost({
                    ...data,
                    slug: post.$id,
                    featured_img: file ? file?.$id : post.featured_img,
                });

                if (dbPost) navigate(`/post/${post.$id}`);
            } else {
                dbPost = await databaseService.createPost({
                    ...data,
                    featured_img: file ? file?.$id : post.featured_img,
                    userId: userData.$id,
                });

                if (dbPost.success) {
                    const res = await databaseService.deletePost(post.$id);
                    if (res) navigate(`/post/${data.slug}`);
                }
            }
        } else {
            const file = await storageService.uploadFile(data.image?.[0]);

            dbPost = await databaseService.createPost({
                ...data,
                featured_img: file?.$id || "",
                userId: userData.$id,
            });

            if(!dbPost.success && dbPost?.error?.code) setError("slug", {
                type: "custom",
                message: "Slug already exists"
            });

            else if(dbPost) navigate(`/post/${data.slug}`);
        }
    };

    const slugTransform = useCallback((value?: string) => {
        if (value && typeof value === "string") {
            return value.trim().toLowerCase().replaceAll(" ", "-");
        }

        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), {
                    shouldValidate: true,
                });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form
            onSubmit={handleSubmit(handlePost)}
            className="flex flex-wrap max-md:flex-col mt-7 gap-4"
        >
            <div className="w-2/3 max-md:w-full flex flex-1 flex-col gap-4">
                <CustomInput
                    label="Title"
                    placeholder="Title"
                    {...register("title", {
                        required: "title is required",
                    })}
                    errorMsg={errors.title?.message}
                />

                <CustomInput
                    label="Slug"
                    placeholder="Slug"
                    {...register("slug", {
                        required: "slug is required",
                    })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), {
                            shouldValidate: true,
                        });
                    }}
                    disabled={!!post}
                    className={`${post && "bg-gray-200 cursor-not-allowed"}`}
                    errorMsg={errors.slug?.message}
                />

                <div>
                    <RTE
                        label={"Content"}
                        name={"content"}
                        control={control}
                        defaultValue={getValues("content")}
                    />
                    {errors.content?.message && (
                        <span className="mt-2 text-sm text-red-500">
                            {errors.content?.message}
                        </span>
                    )}
                </div>
            </div>

            <div className="w-1/3 flex flex-col gap-4 max-md:w-full">
                <CustomInput
                    label={"Featured Image"}
                    type="file"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", {
                        required: !post && "image is required",
                    })}
                    errorMsg={errors.image?.message}
                />
                {post && (
                    <div>
                        <img
                            src={storageService.getFilePreview(
                                post.featured_img
                            )}
                            alt={post.title}
                        />
                    </div>
                )}
                <CustomSelect
                    options={["Active", "Inactive"]}
                    label="Status"
                    {...register("status", {
                        required: "status is required",
                    })}
                    errorMsg={errors.status?.message}
                />

                <CustomButton type="submit">
                    {post ? "Update" : "Submit"}
                </CustomButton>
            </div>
        </form>
    );
};

export default PostForm;
