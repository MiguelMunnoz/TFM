import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import countryRegionData from 'country-region-data/data.json';

const CountryCitySelect = () => {
const { register, setValue, watch } = useFormContext();
const selectedCountry = watch('country');

const [cities, setCities] = useState([]);

useEffect(() => {
    const country = countryRegionData.find(c => c.countryName === selectedCountry);
    if (country) {
        const cityList = country.regions.map(region => region.name);
        setCities(cityList);
        setValue('city', ''); // reset city
    } else {
        setCities([]);
        setValue('city', '');
    }
}, [selectedCountry, setValue]);

return (
    <>
    <div className="form-group">
        <label htmlFor="country">País</label>
        <select id="country" {...register('country')} className="form-input">
        <option value="">-- Selecciona un país --</option>
        {countryRegionData.map((country) => (
            <option key={country.countryShortCode} value={country.countryName}>
                {country.countryName}
            </option>
        ))}
        </select>
    </div>

    {cities.length > 0 && (
        <div className="form-group">
            <label htmlFor="city">Ciudad</label>
            <select id="city" {...register('city')} className="form-input">
                <option value="">-- Selecciona una ciudad --</option>
                {cities.map((city, idx) => (
                    <option key={idx} value={city}>{city}</option>
                ))}
            </select>
        </div>
    )}
    </>
)};

export default CountryCitySelect;
