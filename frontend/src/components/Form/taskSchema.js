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
        .required('El estado de la tarea es obligatorio'),

    /*images: yup
        .mixed()
        .test("fileSize", "La imagen es demasiado grande", (value) => {
            return !value || Array.from(value).every(file => file.size <= 5_000_000); // 5MB
        })
        .test("fileType", "Formato no soportado", (value) => {
            return !value || Array.from(value).every(file => file.type.startsWith("image/"));
        }),*/
});

export default taskSchema;