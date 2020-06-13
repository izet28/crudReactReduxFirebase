import React , {Component} from 'react';
import firebase from '../../../config/firebase';
import './index.scss';
import Button from '../../../components/atoms/Button';
import { connect } from 'react-redux';
import { registerUserAPI } from '../../../config/Redux/Action';

class Register extends Component{
    state={
        email:'',
        password:''
    }

    handleOnchange=(e)=>{
        console.log(e.target.id);
        this.setState({
            [e.target.id]:e.target.value,
        })

    }

    handleOnSubmit=()=>{
        const {email,password} = this.state;
        this.props.registerAPI({email, password})
        this.setState({
            email:'',
            password:''
        })
        
    }

    render(){
        return(
        <div className='auth-container'>
            <div className ='auth-card'>
            <p className='auth-title'>Register Page</p>
            <input className='input' id ='email'placeholder='Email' type='text' onChange={this.handleOnchange} value={this.state.email}/>
            <input className='input' id = 'password' placeholder='password' type='password'onChange={this.handleOnchange} value ={this.state.password}/>
            {/* <button className='btn'onClick={this.handleOnSubmit}>Register</button> */}
            <Button onClick = {this.handleOnSubmit} title='Register' loading={this.props.isLoading}/>
            </div>
        </div>
            
                        // <button>Go to Dasboard</button>

        )
    }
}
const stateRedux = (state)=>({
    isLoading:state.isLoading
})

const dispatchRedux = (dispatch) =>({
    registerAPI:(data)=> dispatch(registerUserAPI(data))
})

export default connect (stateRedux , dispatchRedux)(Register)