import React,{useState}from 'react';
import useFetchJobs from './useFetchJobs';
import Job from './Job.js';
import {Container} from 'react-bootstrap'; 
import './App.css';

function App() {

  const[params,setParams] = useState({});
  const [page,setPage] = useState(1);
  const {jobs,loading,error} = useFetchJobs(params,page);
 
  return (
    <Container className="my-4">
      <h1>GitHub Jobs</h1>
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error</h1>}
      {jobs.map((job)=>{
        return <Job key={job.id} job={job}/>
      })}
      
    </Container>
  );
}

export default App;
