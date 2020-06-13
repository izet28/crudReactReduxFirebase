import React , {Component} from 'react';
import {connect} from 'react-redux';
import {actionUserName} from '../../../config/Redux/Action';
import Button from '../../../components/atoms/Button';
import { loginUserAPI } from '../../../config/Redux/Action';
class Login extends Component{
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

    handleOnLogin=async()=>{
        const {email,password} = this.state;
        const {history} = this.props;
        const res = await this.props.loginAPI({email, password}).catch(err=>err);
        if(res){
            console.log(res)
            localStorage.setItem('userData',JSON.stringify(res))
            this.setState({
                email:'',
                password:''
            })
         history.push('/')
        }
        
        else{
            console.log('salah')
        }
        
        
        
    }
    render(){
        return(
            <div className='auth-container'>
            <div className ='auth-card'>
            <p className='auth-title'>Login</p>
            <input className='input' id ='email'placeholder='Email' type='text' onChange={this.handleOnchange} value={this.state.email}/>
            <input className='input' id = 'password' placeholder='password' type='password'onChange={this.handleOnchange} value ={this.state.password}/>
            {/* <button className='btn'onClick={this.handleOnSubmit}>Register</button> */}
            <Button onClick = {this.handleOnLogin} title='Login' loading={this.props.isLoading}/>
            </div>
        </div>
            
        )
    }
}
const stateRedux = (state)=>({
    isLoading:state.isLoading
})

const dispatchRedux = (dispatch) =>({
    loginAPI:(data)=> dispatch(loginUserAPI(data))
})

export default connect(stateRedux, dispatchRedux)(Login);