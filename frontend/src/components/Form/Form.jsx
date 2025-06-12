import React, { useState, useEffect } from 'react';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from 'react-select';
import { CountryRegionData } from '../../utils/CountryRegionData';
import './Form.css';

const Form = ({title, fields, type, initialData = null, schema, onSubmit}) => {
    const methods = useForm({
        resolver: yupResolver(schema),
    });
    const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = methods;
    const status = watch('status');

    const [selectedCountry, setSelectedCountry] = useState(null);
    const [cityOptions, setCityOptions] = useState([]);
    //const [selectedCity, setSelectedCity] = useState(null);
    
    const countryOptions = CountryRegionData.map(([countryName, countryCode, regions]) => ({
        label: countryName,
        value: countryCode,
        regions: Array.isArray(regions) ? regions.map(region => region.name) : [],
    }));
    const isLoading = useSelector(state => state.loading.isLoading);

    

    useEffect(() => {
        console.log('Form type: ', type);
        if (initialData){
            const formattedData = {
                ...initialData,
                images: null,
                date: initialData.date
                    ? new Date(initialData.date).toISOString().split('T')[0]
                    : null
            };

            const foundCountry = countryOptions.find(c => c.value === initialData.country);
            if (foundCountry) {
                setSelectedCountry(foundCountry);
                setCityOptions(foundCountry.regions.map(city => ({ label: city, value: city })));
            }

            reset(formattedData);
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

    const handleCountryChange = (option) => {
        console.log('Opcion seleccionada: ', option);
        if (!option || !option.regions) {
            setSelectedCountry(null);
            setCityOptions([]);
            setValue('country', '');
            setValue('city', '');
            return;
        }

        setSelectedCountry(option);
        setCityOptions(option.regions.map(city => ({ label: city, value: city })));
        setValue('country', option.value);
        setValue('city', '');
    };

    const handleCityChange = (option) => {
        setValue('city', option.value); // Registramos ciudad en el form
    };

    const isDateTimeField = (field) => Array.isArray(field) && field.includes('date') && field.includes('time');
    const isLocationField = (field) => Array.isArray(field) && field.includes('country') && field.includes('city');
    
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
        
        const dateTimeField = isDateTimeField(field) && (
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
        );
            
        const locationField = isLocationField(field) && (
            <div className="location-wrapper">
                <div className="form-group">
                    <label className="form-label">{capitalize(field[0])}</label>

                    <Controller
                        control={methods.control}
                        name={field[0]}
                        render={({ field: { onChange, value } }) => (
                            <Select
                                options={countryOptions}
                                value={countryOptions.find(opt => opt.value === value)}
                                onChange={(selectedOption) => {
                                    handleCountryChange(selectedOption);
                                    onChange(selectedOption?.value || '');
                                }}
                                placeholder="Select a country"
                                className="form-select"
                            />
                        )}
                    />

                    {errors[field[0]] && <p className="form-errors">{errors[field[0]].message}</p>}
                </div>

                {selectedCountry && (
                    <div className="form-group">
                        <label className="form-label">{capitalize(field[1])}</label>
                        <Controller
                            control={methods.control}
                            name={field[1]}
                            render={({ field: { onChange, value } }) => (
                                <Select
                                    options={cityOptions}
                                    value={cityOptions.find(opt => opt.value === value)}
                                    onChange={(selectedOption) => {
                                        handleCityChange(selectedOption);
                                        onChange(selectedOption?.value || '');
                                    }}
                                    placeholder="Select a city"
                                    className="form-select"
                                />
                            )}
                        />
                        {errors[field[1]] && <p className="form-errors">{errors[field[1]].message}</p>}
                    </div>
                )}
            </div>
        );

        let compoundField = null;
        if (isDateTimeField(field)) {
            compoundField = dateTimeField;
        } else if (isLocationField(field)) {
            compoundField = locationField;
        }

        const imageField = isArrayField ? null : (
            <input
                type="file"
                multiple
                accept="image/*"
                {...register(field)}
                className="form-input"
            />
        )

        const newField = isArrayField ? compoundField :
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
        <FormProvider {...methods}>
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
        </FormProvider>
    );
}

export default Form;