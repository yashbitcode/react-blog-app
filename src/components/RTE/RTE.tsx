import { Editor } from "@tinymce/tinymce-react";
import { Controller, type Control } from "react-hook-form";

const RTE = ({
    name,
    control,
    label,
    defaultValue,
}: {
    name: string;
    control: Control<{
        title: string;
        slug: string;
        content: string;
        status: string;
        image: File;
        featured_img: string;
    }>;
    label?: string;
    defaultValue?: string;
}) => {
    return (
        <div className="w-full">
            {label && <label>{label}</label>}
            <Controller
                name={name || "RTE"}
                rules={{
                    required: "Content is required"
                }}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                        apiKey={import.meta.env.VITE_RTE_API_KEY}
                        initialValue={defaultValue}
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                "advlist autolink lists link image charmap print preview anchor",
                                "searchreplace visualblocks code fullscreen",
                                "insertdatetime media table paste code help wordcount",
                            ],
                            toolbar:
                                "undo redo | formatselect | " +
                                "bold italic backcolor | alignleft aligncenter " +
                                "alignright alignjustify | bullist numlist outdent indent | " +
                                "removeformat | help",
                            content_style:
                                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />
        </div>
    );
};

export default RTE;
