import * as yup from 'yup';

const taskSchema = yup.object({
    title: yup
        .string()
        .required('El titulo es obligatorio'),
    
    description: yup
        .string()
        .required('La descripcion es obligatoria'),

    status: yup
        .string()
        .required('El estado de la tarea es obligatorio')
});

export default taskSchema;