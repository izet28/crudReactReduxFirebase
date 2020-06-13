
const initState ={
    popup:'hayuuuuu',
    isLogin:false,
    isLoading: false,
    username:{},
    notes:[]
  }
  
  const reducer = (state=initState, action) =>{
    if(action.type==='CHANGE_POPUP'){
      return{
          ...state,
          popup:action.value
      }
    }
    if(action.type==='CHANGE_ISLOGIN'){
      return{
        ...state,
        isLogin:action.value
      }
    }
    if (action.type==='CHANGE_USER'){
        return{
            ...state,
            username:action.value
        }
    }
    if (action.type==='SET_NOTES'){
      return{
          ...state,
          notes:action.value
      }
  }
    if (action.type==='CHANGE_LOADING'){
      return{
          ...state,
          isLoading:action.value
      }
  }
    return state
  }
 
 export default reducer; 