import React from 'react';
import Papa from 'papaparse';

const CsvReader = ({ onFileParsed }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Parse the CSV file with PapaParse
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        console.log('Parsed data:', results.data); // Debugging output
        onFileParsed(results.data); // Pass parsed data to parent component
      },
    });
  };

  return <input type="file" accept=".csv" onChange={handleFileChange} />;
};

export default CsvReader;
