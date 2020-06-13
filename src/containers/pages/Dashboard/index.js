import React , {Component,Fragment} from 'react';
import './dashboard.scss'
import { connect } from 'react-redux';
import { addDataToAPI, getDataFromAPI, updateDataAPI, deleteDataAPI } from '../../../config/Redux/Action';


class Dashboard extends Component{
    state = {
        title:'',
        content:'',
        date:'',
        textButton:"Save",
        noteId:''
    }

    componentDidMount(){
        const userData =JSON.parse(localStorage.getItem('userData'));
        this.props.getNotes(userData.uid)
    }
    
    handleSaveNotes=()=>{
        const {title,content,textButton,noteId} = this.state
        const {saveNotes,updateNotes} = this.props
        const userData = JSON.parse(localStorage.getItem('userData'))
        const data = {
            title: title,
            content: content,
            date: new Date().getTime(),
            userId: userData.uid
        }
        if(textButton==='Save'){
            saveNotes(data)
        }else{
            data.noteId = noteId;
            updateNotes(data)
        }
        
        
    }

    deleteNotes=(e ,note)=>{
        e.stopPropagation();
        const userData = JSON.parse(localStorage.getItem('userData'))
        const {deleteNotes}=this.props;
        const data = {
            userId: userData.uid,
            noteId: note.id
            
        }
        deleteNotes(data)
    }

    updateNotes=(note)=>{
        console.log(note)
        this.setState({
            title:note.data.title,
            content:note.data.content,
            textButton:"Update",
            noteId:note.id
        })
    }
    
    cancelUpdate =()=>{
        this.setState({
            title:'',
            content:'',
            textButton:"Save"
        })
    }

    onInputChange = (e,type)=>{ 
        this.setState({
            [type]: e.target.value
        })
    }

    render(){
        const {title,content,date,textButton} = this.state
        const {notes} = this.props
        console.log(notes) 
        return(
            
                <div className='container'>
               <div className='input-form'>
                   <input placeholder='title' className='input-title' value={title} onChange={(e)=>this.onInputChange(e,'title')}  />
                    <textarea placeholder='content' className='input-content'value={content} onChange={(e)=>this.onInputChange(e,'content')} > 

                    </textarea>
                    <div className='action-wrapper'>
                        {
                            textButton==='Update'?
                            <button className='save-btn cancel' onClick={this.cancelUpdate}> Cancel </button>
                            :<div/>
                        }
                    <button className='save-btn' onClick={this.handleSaveNotes}> {textButton} </button>
                   
                    </div>
                    
               </div>
               <hr/>
               {
                   notes.length > 0 ?(
                       <Fragment>
                           {
                               notes.map(note=>{
                                   return (
                                    <div className='card-content' key={note.id } onClick={()=>this.updateNotes(note)} >
                                    <p className='title'>{note.data.title} </p>
                                    <p className='date'> {note.data.date} </p>
                                    <p className='content'> {note.data.content} </p>
                                    <div className='delete-btn' onClick={(e)=>this.deleteNotes(e , note)}>x</div>
                                    </div>
                                   )
                               })
                           }
                       </Fragment>
                   ) : null
               }
               
           </div>
            
           
        )
    }
}
const reduxState = (state) =>({
    userData: state.username,
    notes: state.notes
})

const reduxDisptach = (dispacth) =>({
    saveNotes: (data)=>dispacth(addDataToAPI(data)),
    updateNotes:(data)=>dispacth(updateDataAPI(data)),
    getNotes: (data)=>dispacth(getDataFromAPI(data)),
    deleteNotes: (data)=>dispacth(deleteDataAPI(data))
})

export default connect(reduxState,reduxDisptach) (Dashboard);