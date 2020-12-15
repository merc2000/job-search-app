
import {useReducer} from 'react';
//state is the current state and action contains whatever is passed to dispatch
//reducer gets called every time we call dispatch
const ACTIONS = {
  MAKE_REQUEST:'make-request',
  GET_DATA:'get-data',
  ERROR:'error'
};

function reducer(state,action){

}

export default function useFetchJobs(params,page){

  const [state,dispatch] = useReducer(reducer, {jobs:[],loading:true});

    return{
      jobs:[],
      loading:true,
      error: false
    }
}