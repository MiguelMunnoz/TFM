import * as yup from 'yup';

const message = 'This field is required';

const taskSchema = yup.object({
    title: yup
        .string()
        .required(message),

    status: yup
        .string()
        .required(message),

    date: yup
        .date()
        .required(message),
    
    time: yup
        .string()
        .required(message),

    description: yup
        .string()
        .required(message),

    images: yup
        .mixed()
        .nullable()
        .test("fileSize", "Image too large", (value) => {
            return !value || Array.from(value).every(file => file.size <= 5_000_000); // 5MB
        })
        .test("fileType", "Format not supported", (value) => {
            return !value || Array.from(value).every(file => file.type.startsWith("image/"));
        }),
});

export default taskSchema;