import React, { Component } from 'react';
import Input from './common/input';

class LoginForm extends Component {
   state = {
    account : { username : '', password: ''} ,
    errors : {}
   };

   validate = () =>{
    // return {username : 'Username is required.'};
    const {account} = this.state;
    if(account.username.trim() === '')
        errors.username = 'Username is Required!.';
    if(account.password.trim() === '')
        errors.password = 'Password is Required!.';
        return Object.keys(errors).length === 0 ? null : errors;
   };

    handleSubmit = e => {
        e.preventDefault();
       const errors = this.validate();
       console.log(errors);
       this.setState({errors});
       if(errors) return ;//return immeditely so we do not call the server
        //call the server, save changes & redirect user
             // const password =  this.password.current.value;
         console.log("Submitted Login");
    };

handleChange = ({currentTarget : input}) =>{
        const  account = {...this.state.account};
        account[input.name] = input.value;
      
        this.setState({account });
    };
    render() { 
        const {account} = this.state;
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <Input name="username" 
                    value={account.username}
                    label="Username"
                    onChange={this.handleChange}
                    />
                  <Input name="password" 
                    value={account.password}
                    label="Password"
                    onChange={this.handleChange}
                    />
                    <button className="btn btn-primary">Login</button>
                </form>
            </div>
        );
    }
}
 
export default LoginForm;