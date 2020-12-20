
import {useEffect, useReducer} from 'react';
import axios from 'axios';

const ACTIONS = {
  MAKE_REQUEST:'make-request',
  GET_DATA:'get-data',
  ERROR:'error',
  UPDATE_HAS_NEXT_PAGE:'update_has_next_page'
};

//inorder to get around cors we append https://cors-anywhere.herokuapp.com/ infront of the url 
const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json';

function reducer(state,action){
  switch(action.type){
    case ACTIONS.MAKE_REQUEST:
      return {...state,loading:true,jobs:[]}
    case ACTIONS.GET_DATA:
      return {...state,loading:false,jobs:action.payload.jobs};
    case ACTIONS.ERROR:
      return {...state,loading:false,error:action.payload.error,jobs:[]};
    case ACTIONS.UPDATE_HAS_NEXT_PAGE:
      return{...state,hasNextPage:action.payload.hasNextPage}
    default:
      return state;
  }
}

export default function useFetchJobs(params,page){

  const [state,dispatch] = useReducer(reducer, {jobs:[],loading:true});
  const cancelToken1 = axios.CancelToken.source();// create the source

  useEffect(()=>{
    dispatch({type:ACTIONS.MAKE_REQUEST});
    axios.get(BASE_URL,{
      //the cancel token
      cancelToken1:cancelToken1.token,
      params:{markdown:true,page:page,...params}
    }).then((res)=>{
      dispatch({type:ACTIONS.GET_DATA , payload:{jobs:res.data}})
    }).catch(e=>{
      if(axios.isCancel(e)) return
      dispatch({type:ACTIONS.ERROR,payload:{error:e}})
    })

    const cancelToken2 = axios.CancelToken.source();// we have to create seperate token

    axios.get(BASE_URL,{
      //the cancel token
      cancelToken2:cancelToken2.token,
      params:{markdown:true,page:page+1,...params}
    }).then((res)=>{
      dispatch({type:ACTIONS.UPDATE_HAS_NEXT_PAGE, payload:{hasNextPage:res.data.length!==0}})
    }).catch(e=>{
      if(axios.isCancel(e)) return
      dispatch({type:ACTIONS.ERROR,payload:{error:e}})
    })

    return()=>{
      cancelToken1.cancel();//the cancel function
      cancelToken2.cancel();
    }
  },[params,page]);

    return state;
}