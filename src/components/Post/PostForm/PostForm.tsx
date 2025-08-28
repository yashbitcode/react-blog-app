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

type Inputs = {
    title: string;
    slug: string;
    content: string;
    status: string;
    image: File;
    featured_img: string;
};

const PostForm = ({ post }: {
    post?: any;
}) => {
    const {
        register,
        handleSubmit,
        watch,
        control,
        setValue,
        getValues,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state: RootState) => state.auth.userData);

    const handlePost: SubmitHandler<Inputs> = async (data) => {
        let dbPost;

        if (post) {
            const file = data.image
                ? await storageService.uploadFile(data.image)
                : null;

            if (file) {
                storageService.deleteFile(post.featured_img);
               
                dbPost = await databaseService.updatePost({
                    ...data,
                    slug: post.$id,
                    featured_img: file,
                });
            }
        } else {
            const file = await storageService.uploadFile(data.image);
            data.featured_img = file;

            dbPost = await databaseService.createPost({
                ...data,
                userId: userData.$id,
            });
        }

        if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
        }
    };

    const slugTransform = useCallback((value?: string) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[a-zA-Z\d\s]+/g, "-")
                .replace(/s/g, "-");
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
        <form onSubmit={handleSubmit(handlePost)} className="flex flex-wrap">
            <div className="w-2/3">
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
                        <span className="mt-2 text-sm bg-red-500">
                            {errors.content?.message}
                        </span>
                    )}
                </div>
            </div>

            <div className="w-1/3 ">
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
