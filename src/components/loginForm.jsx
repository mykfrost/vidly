import React , {Component}from 'react';
import Input from './common/input';

class LoginForm extends Component {
   state = {
    account : { username : '', password: ''} ,
    errors : {}
   };
   validateProperty = ({name, value}) =>{
    if(name === "username"){
        if(value.trim() === "") return "Username is Required";
    }
     if(name === "password"){
        if(value.trim() === "") return "Password is Required";
    }
    
   };

   validate = () =>{
    const errors = {};
    const {account}  = this.state;
    if(account.username.trim() === '')
        errors.username = 'Username is Required!';
         if(account.password.trim() === '')
        errors.password = 'Password is Required!';
        return Object.keys(errors).length === 0 ? null : errors;
   };

    handleSubmit = e => {
        e.preventDefault();
       const errors = this.validate();
       console.log("Errors",errors);
       this.setState({errors: errors || {} });
       if(errors) return ;//return immeditely so we do not call the server
        //call the server, save changes & redirect user
             // const password =  this.password.current.value;
         console.log("Submitted Login");
    };

    handleChange = ({currentTarget : input}) =>{
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);
        if(errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const  account = {...this.state.account};
        account[input.name] = input.value;
      
        this.setState({account , errors});
    };


    render() { 
        const {account , errors} = this.state;
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <Input
                    name="username" 
                    id="username"
                    value={account.username}
                    label="Username"
                    onChange={this.handleChange}
                    error={errors.username}
                    className="form-control"
                    />
               
    
                  <Input 
                    name="password" 
                    value={account.password}
                    id="password"
                    label="Password"
                    onChange={this.handleChange}
                    error={errors.password}
                    className="form-control"
                    />
                    <button className="btn btn-primary">Login</button>
                </form>
            </div>
        );
    }
}
 
export default LoginForm;