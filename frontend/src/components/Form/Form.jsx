import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import './Form.css';

const Form = ({title, fields, initialData = null, schema, onSubmit}) => {
    const isLoading = useSelector(state => state.loading.isLoading);

    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
        resolver: yupResolver(schema)
    });
    const status = watch('status');
    
    useEffect(() => {
        console.log('Se ha instanciado un nuevo formulario:');
        console.log('DATOS INICIALES: ', initialData);
    }, []);

    useEffect(() => {
        if (initialData){
            reset(initialData);
        } 
    }, [initialData, reset]);

    const handleReset = () => {
        reset();
    };

    const submit = (data) => {
        const files = data.images ? Array.from(data.images) : [];
        let filenames = readInputFiles(files);

        const formData = {
            ...data,
            images: filenames,
        };

        console.log('Recogiendo datos del formulario: ', data);
        if(data.images && data.images.length > 0) {
            console.log('Entramos aqui si hay iamgenes...');
            
            //Costruimos los datos de los archivos para enviarlos al servidor
            const imageData = new FormData();
            for (let file of files) {
                imageData.append('file', file);
            }
            console.log('Recogiendo imagenes del fomulario: ', imageData);
            onSubmit(formData, imageData);
        } else {
            onSubmit(formData);
        }
        
    };

    const readInputFiles = files => Array.from(files).map(file => file.name);
    
    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const formField = (field) => {
        const isArrayField = Array.isArray(field); 

        const statusField = isArrayField ? null : (
            <select className={`form-select-input status-${status}`} {...register(field)}>
                <option className="status-pending" value="pending">Pending</option>
                <option className="status-in-progress" value="in-progress">In Progress</option>
                <option className="status-completed" value="completed">Completed</option>
            </select>
        );

        const roleField = isArrayField ? null : (
            <select className="form-select-input" {...register(field)}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
        );

        const dateTimeField = isArrayField ? (
            <div className="date-time-wrapper">
                {field.map(name => (
                    <div key={name} className="form-group">
                        <label className="form-label">
                            {capitalize(name)}
                        </label>   
                        <input
                            type={name}
                            {...register(name)}
                            className="form-input"
                        />
                        {errors[name] && <p className="form-errors">{errors[name].message}</p>}
                    </div>
                ))}
            </div>
        ) : null;

        const imageField = isArrayField ? null : (
            <input
                type="file"
                multiple
                accept="image/*"
                {...register(field)}
                className="form-input"
            />
        )

        const newField = isArrayField ? dateTimeField :
            field === 'status' ? statusField :
            field === 'role' ? roleField :  
            field === 'images' ? imageField : (
                <input
                    {...register(field)}
                    className="form-input"
                />
            );

        return (
            <div className="form-group" key={isArrayField ? field.join('-') : field}>
                <label className="form-label">
                    {capitalize(isArrayField ? "" : field)}
                </label>
                {newField}
                {(!isArrayField && errors[field]) && <p className="form-errors">{errors[field].message}</p>}
            </div>
        );
    };


    return (
        <div className='form-container'>
            <h2>{title}</h2>
            <form onSubmit={handleSubmit(submit)}>
                {fields.map(formField)}
                <button 
                    type="submit"
                    className="nav-button submit"
                    disabled={isLoading}
                > 
                    {isLoading ? 'Cargando...' : 'Enviar'}
                </button>

                <button 
                    type="button"
                    className="nav-button reset"
                    onClick={()=>handleReset()}
                > 
                    Clear
                </button>
            </form>
        </div>
    );
}

export default Form;