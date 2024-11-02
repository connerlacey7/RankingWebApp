import React, { useState } from 'react';
import CsvReader from './csvreader';
import RankingGraph from './rankinggraph';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  const handleFileUpload = (fileData) => {
    setData(fileData); // Assuming fileData is the parsed CSV data
  };

  return (
    <div className="App">
      <h1>Driver Ranking Analysis</h1>
      <CsvReader onFileParsed={handleFileUpload} />
      <div className="message">Upload a CSV file to analyze driver rankings</div>
      <div className="graph-container">
        {data.length > 0 ? <RankingGraph data={data} /> : <p>No data available. Please upload a file.</p>}
      </div>
    </div>
  );
}

export default App;
