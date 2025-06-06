import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import './Form.css';

const Form = ({title, fields, initialData = null, schema, onSubmit}) => {

    /*Quiza toca pasar el handleSubmit al padre (el Modal) */
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
        resolver: yupResolver(schema)
    });
    const status = watch('status') || 'all';
    
    useEffect(() => {
        console.log('Se ha instanciado un nuevo formulario:');
        console.log('Titulo del nuevo formulario: ', title?.toLowerCase());
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
        console.log('FORMDATA QUE SE ENVIA: ', data);
        onSubmit(data);
    }
    
    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const formField = (field) => {

        const statusField = (
            <select className={`form-select-input status-${status}`} {...register(field)}>
                <option className='status-all' value='all'>All</option>
                <option className='status-pending' value='pending'>Pending</option>
                <option className='status-in-progress' value='in-progress'>In Progress</option>
                <option className='status-completed' value='completed'>Completed</option>
            </select>
        );
            
        const roleField = (
            <select className='form-select-input' {...register(field)}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
        );

        const newField = field == 'status' ? (statusField) : ( 
                         field == 'role' ? (roleField) : (
                            <input 
                                {...register(field)}
                                className='form-input'
                            />
                        ));

        return (
            <div className="form-group" key={field}>
                <label className="form-label">{capitalize(field)}</label>
                
                {newField}
                
                {errors[field] && <p className='form-errors'>{errors[field].message}</p>}
            </div>
        )
    };

    return (
        <div className='form-container'>
            <h2>{title}</h2>
            <form onSubmit={handleSubmit(submit)}>
                {fields.map(formField)}
                <button 
                    type="submit"
                    className="nav-button submit"
                > 
                    Enviar
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