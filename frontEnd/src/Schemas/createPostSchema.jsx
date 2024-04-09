import * as yup from "yup";

const schemaPost = yup.object().shape({
  title: yup.string().required("title is required"),
  description: yup.string().required("description is required"),
  category: yup.string().required("category is required"),
    image: yup
      .mixed().required("image is required")
      .test("fileType", "Unsupported file format", (value) => {
        if (!value) return false;
        return (
          value && ["image/jpeg", "image/png", "image/gif"].includes(value.type)
        );
      })
      .test("fileSize", "File size too large", (value) => {
        if (!value) return false;
        return value && value.size <= 5000000; // 5 MB limit
      }),
});
const schemaPost2 = yup.object().shape({
  title: yup.string().required("title is required"),
  description: yup.string().required("description is required"),
  category: yup.string().required("category is required"),
});
export  { schemaPost, schemaPost2 };
