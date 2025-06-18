import * as yup from 'yup';

const message = 'This field is required';

const eventSchema = yup.object({
    title: yup
        .string()
        .required(message),

    date: yup
        .date()
        .required(message),

    time: yup
        .string()
        .required(message),

    country: yup
        .string()
        .required(message),

    city: yup
        .string()
        .required(message),

    details: yup
        .string()
        .required(message)
});

export default eventSchema;