import { useState } from 'react'
import useAccidentData from './hooks/useAccidentData';
import './App.css'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

function prepareSimpleChartData(data){ //helper function
  const totalsByYear = {};
  data.forEach(item =>{
    const year = item.year;
    const number = parseInt(item.number_of_accidents, 10); //obtain number from string

    if(!totalsByYear[year]){
      totalsByYear[year] = { 
        year:year,
        total:0 
      };
    }
    totalsByYear[year].total += number;
  });
  const result = Object.values(totalsByYear);
  result.sort((a,b) => a.year.localeCompare(b.year));

  return result;
}

function App() {
  const {data,loading} = useAccidentData();
  const [selectedSeverity, setSelectedSeverity] = useState('');
  const severityOptions = [... new Set(data.map(item => item.accident_classification))];

  const filteredData = selectedSeverity
    ? data.filter(item => item.accident_classification === selectedSeverity) 
    : data;
  const chartData = prepareSimpleChartData(filteredData);

  return (
    <main>
      <h1>Accidents by Severity</h1>
      
      <label htmlFor='severity-select'>
        Filter by Severity:
        <select
          id='severity-select'
          value={selectedSeverity}
          onChange ={(e)=> setSelectedSeverity(e.target.value)}
        >
          <option value=""> All</option>
          {severityOptions.map((severity)=> (
            <option key = {severity} value={severity}>
              {severity}
            </option>
          ))}
        </select>
      </label>
      <p>
        Showing <strong>{filteredData.length}</strong> records
        {selectedSeverity && ` for "${selectedSeverity}"`}
      </p>
        <LineChart
          width={600}
          height={300}
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} />
        </LineChart>

          <table>
            <caption className='sr-only'>Filtered accident datatable</caption>
            <thead>
              <tr>                        
                <th>Year</th>
                <th>Classification</th>
                <th>Road User Group</th>
                <th>Causes</th>
                <th>No. of Cases</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item)=>(
                <tr key={item._id}>
                  <td>{item.year}</td>       
                  <td>{item.accident_classification}</td>
                  <td>{item.road_user_group}</td>
                  <td>{item.causes_of_accident}</td>
                  <td>{item.number_of_accidents}</td>
                </tr>
              ))}
            </tbody>
          </table>
        <h2>Line Chart: Total Accidents by Year</h2>

    </main>
  )
}

export default App
