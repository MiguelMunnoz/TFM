import * as yup from 'yup';

const eventSchema = yup.object({
    title: yup
        .string()
        .required('This field is mandatory'),
    
    details: yup
        .string()
        .required('This field is mandatory'),

    date: yup
        .date()
        .required('This field is mandatory'),

    country: yup
        .string()
        .required('This field is mandatory'),

    city: yup
        .string()
        .required('This field is mandatory'),

    /*images: yup
        .mixed()
        .test("fileSize", "La imagen es demasiado grande", (value) => {
            return !value || Array.from(value).every(file => file.size <= 5_000_000); // 5MB
        })
        .test("fileType", "Formato no soportado", (value) => {
            return !value || Array.from(value).every(file => file.type.startsWith("image/"));
        }),*/
});

export default eventSchema;