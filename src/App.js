import React,{useState}from 'react';
import useFetchJobs from './useFetchJobs';
import Job from './Job.js';
import JobsPagination from './JobsPagination.js';
import {Container} from 'react-bootstrap'; 
import './App.css';

function App() {

  const[params,setParams] = useState({});
  const [page,setPage] = useState(1);
  const {jobs,loading,error,hasNextPage} = useFetchJobs(params,page);
 
  return (
    <Container className="my-4">
      <h1 className="mb-4">GitHub Jobs</h1>
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage}/>
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error</h1>}
      {jobs.map((job)=>{
        return <Job key={job.id} job={job}/>
      })}
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage}/>
    </Container>
  );
}

export default App;
