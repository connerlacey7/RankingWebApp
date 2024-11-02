import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const RankingGraph = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (data.length === 0) return; // Skip if there's no data

    // Step 1: Calculate total points per driver to identify the top 10
    const driverPoints = {};
    data.forEach(event => {
      const points = Number(event.points);
      if (!isNaN(points) && points >= 0) { // Ensure points are valid
        driverPoints[event.driver_name] = (driverPoints[event.driver_name] || 0) + points;
      } else {
        console.warn(`Invalid points for driver ${event.driver_name} in event ${event.event}:`, event.points);
      }
    });

    // Step 2: Sort drivers by total points and select the top 10
    const topDrivers = Object.entries(driverPoints)
      .sort((a, b) => b[1] - a[1]) // Sort by total points, descending
      .slice(0, 10) // Select top 10 drivers
      .map(([driver]) => driver);

    // Step 3: Filter data for only the top 10 drivers and calculate cumulative points
    const cumulativeData = topDrivers.map(driver => {
      const driverData = data
        .filter(d => d.driver_name === driver)
        .sort((a, b) => a.event - b.event);

      let cumulativePoints = 0;
      const cumulativePointsData = driverData.map(event => {
        const points = Number(event.points);
        if (!isNaN(points) && points >= 0) { // Validate points again
          cumulativePoints += points;
        } else {
          console.warn(`Skipping invalid points for driver ${driver} in event ${event.event}:`, event.points);
        }
        return { event: event.event, cumulativePoints };
      });

      return {
        x: cumulativePointsData.map(d => d.event),
        y: cumulativePointsData.map(d => d.cumulativePoints),
        type: 'scatter',
        mode: 'lines+markers',
        name: driver
      };
    });

    console.log('Chart data:', cumulativeData); // Debugging output
    setChartData(cumulativeData);
  }, [data]);

  return (
    <Plot
      data={chartData}
      layout={{
        title: 'Cumulative Points by Event (Top 10 Drivers)',
        xaxis: { title: 'Event Number', dtick: 1 },
        yaxis: { title: 'Cumulative Points' }
      }}
    />
  );
};

export default RankingGraph;
