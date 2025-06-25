import { useState } from 'react'
import useAccidentData from './hooks/useAccidentData';
import './App.css'

function App() {
  const {data,loading} = useAccidentData();
  const [selectedSeverity, setSelectedSeverity] = useState('');
  const severityOptions = [... new Set(data.map(item => item.accident_classification))];

  const filteredData = selectedSeverity
    ? data.filter(item => item.accident_classification === selectedSeverity) 
    : data;

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
      {/* <pre>{JSON.stringify(filteredData.slice(0, 10), null, 2)}</pre> */}
          <table>
            <caption className='sr-only'>Filtered accident datatable</caption>
            <thead>
              <tr>.                         //table row
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
                  <td>{item.year}</td>        //table data cell
                  <td>{item.accident_classification}</td>
                  <td>{item.road_user_group}</td>
                  <td>{item.causes_of_accidents}</td>
                  <td>{item.number_of_accidents}</td>
                </tr>
              ))}
            </tbody>
          </table>


    </main>
  )
}

export default App
