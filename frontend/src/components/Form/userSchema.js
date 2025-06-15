import * as yup from 'yup';

const registerUserSchema = yup.object({
    username: yup
        .string().required('El email es obligatorio'),
    
    password: yup
        .string().required('La contraseña es obligatoria'),
});

const loginUserSchema = yup.object({
    username: yup
        .string().required('El email es obligatorio'),
    
    password: yup
        .string().required('La contraseña es obligatoria'),
});

export {
    registerUserSchema,
    loginUserSchema
} 