import * as yup from 'yup';

const registerUserSchema = yup.object({
    username: yup
        .string().required('Email is required'),
    
    password: yup
        .string().required('Password is required'),
});

const loginUserSchema = yup.object({
    username: yup
        .string().required('Email is required'),
    
    password: yup
        .string().required('Password is required'),
});

export {
    registerUserSchema,
    loginUserSchema
} 