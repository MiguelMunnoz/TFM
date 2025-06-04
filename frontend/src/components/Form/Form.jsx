import React, { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import './Form.css';

const Form = ({title, fields, initialData = null, schema, onSubmit, onCancel}) => {
    const [status, setStatus] = useState('all');

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });
    
    useEffect(() => {
        console.log('Se ha instanciado un nuevo formulario:');
        console.log('Titulo del nuevo formulario: ', title.toLowerCase());
        console.log('DATOS: ', initialData);
    });

    useEffect(() => {
        if (initialData){
            reset(initialData);
        } 
    }, [initialData, reset]);

    const handleReset = () => {
        reset();
        onCancel();
    };

    const submit = (data) => {
        console.log('FORMDATA QUE SE ENVIA: ', data);
        onSubmit(data);
    }

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const handleSelect = (newStatusValue) => {
        setStatus(newStatusValue);
    }

    const formField = (field) => {
        return (
            <div className="form-group" key={field}>
                <label className="form-label">{capitalize(field)}</label>
                {field == 'Status' ? (
                    <select className={`form-select-input status-${status}`} onChange={(e) => handleSelect(e.target.value)}>
                        <option className='status-all' value='all'>All</option>
                        <option className='status-pending' value='pending'>Pending</option>
                        <option className='status-in-progress' value='in-progress'>In Progress</option>
                        <option className='status-completed' value='completed'>Completed</option>
                    </select> 
                ):(
                    <input 
                        {...register(field)}
                        className='form-input'
                    />
                ) }
                
                {errors[field] && <p className='form-errors'>{errors[field].message}</p>}
            </div>
        )
    };

    return (
        <div className='form-container'>
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
                    onClick={handleReset}
                > 
                    Cancelar
                </button>
            </form>
        </div>
    );
}

export default Form;