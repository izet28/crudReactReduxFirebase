import firebase,{database} from '../../../config/firebase';

export const registerUserAPI = (data) => (dispatch) =>{
    dispatch({type:'CHANGE_LOADING', value:true})
    return(
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
        .then(res=>{
            console.log('sucses', res);
            dispatch({type:'CHANGE_LOADING', value:false})

        })
        .catch(function(error){
            var errorCode =  error.code;
            var errrMessage = error.message;
            console.log(errorCode,errrMessage)
        }) 
            
          
    )
}

export const loginUserAPI = (data) => (dispatch) =>{
     
    return new Promise((resolve,reject) =>{
            dispatch({type:'CHANGE_LOADING', value:true})
    
        firebase.auth().signInWithEmailAndPassword(data.email, data.password)
        .then(res=>{
            const dataUser ={
                email: res.user.email,
                uid: res.user.uid,
                emailVerified: res.user.emailVerified
            }
            dispatch({type:'CHANGE_USER', value:dataUser})
            dispatch({type:'CHANGE_LOADING', value:false})
            console.log(dataUser)
            resolve(dataUser)
         
        })
        .catch(function(error){
            var errorCode =  error.code;
            var errrMessage = error.message;
            console.log(errorCode,errrMessage)
            dispatch({type:'CHANGE_LOADING', value:false})
            reject(false)
        }) 
            
          
    })
}

export const addDataToAPI = (data) => (dispatch) =>{
    database.ref('notes/'+data.userId).push({
        title: data.title,
        content: data.content,
        date: data.date
    })
}

export const getDataFromAPI = (userId) =>(dispatch) =>{
    const urlNotes = database.ref('notes/'+userId);
    return new Promise((resolve,reject)=>{
        urlNotes.on('value', function(snapshot) {
       const data = [];
       Object.keys(snapshot.val()).map(key =>{
           data.push({
               id:key,
               data: snapshot.val()[key]
           })
       })

        console.log(data)
         dispatch({type:'SET_NOTES', value: data})
        
        resolve(snapshot.val())
        // updateStarCount(postElement, snapshot.val());
      });
    })
    
}

export const updateDataAPI = (data) =>(dispatch) =>{
    const urlNotes = database.ref(`notes/${data.userId}/${data.noteId}`);
    
    return new Promise((resolve,reject)=>{
        urlNotes.set({title: data.title,
            content: data.content,
            date: data.date},
            (err)=>{
            if(err){
                reject(false);
            }else{
                resolve(true)
            }
        }) 
      
      
    })
    
}

export const deleteDataAPI = (data) =>(dispatch) =>{
    const urlNotes = database.ref(`notes/${data.userId}/${data.noteId}`);
    return new Promise((resolve,reject)=>{
        urlNotes.remove()
      
    })
    
}

