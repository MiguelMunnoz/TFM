// generateCountryRegionData.js
import fs from 'fs';
import path from 'path';
import allCountries from 'country-region-data';

const output = allCountries.map(country => [
  country.countryName,
  country.countryShortCode,
  country.regions.map(region => ({ name: region.name })),
]);

const fileContent = `export const CountryRegionData = ${JSON.stringify(output, null, 2)};\n`;

// Escribe el archivo en src/utils/countryRegionData.js (ajusta la ruta si necesitas)
const outputPath = path.resolve('../utils/countryRegionData.js');
fs.writeFileSync(outputPath, fileContent, 'utf8');

console.log(`✅ Archivo generado correctamente en: ${outputPath}`);
