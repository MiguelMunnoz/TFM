import * as yup from 'yup';

const registerUserSchema = yup.object({
    username: yup
        .string().required('El email es obligatorio'),
    
    password: yup
        .string().required('La contraseña es obligatoria'),

    role: yup
        .string().required('El rol del usuario es obligatorio')
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