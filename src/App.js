import React,{}from 'react';
import useFetchJobs from './useFetchJobs';
import {Container} from 'react-bootstrap'; 
import './App.css';

function App() {
  const {jobs,loading,error} = useFetchJobs(params,page);

  return (
    <Container>
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error</h1>}
      <h1>{jobs.length}</h1>
      
    </Container>
  );
}

export default App;
