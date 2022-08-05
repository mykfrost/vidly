import React, { Component } from 'react';

class LoginForm extends Component {
   state = {
    account : { username : '', password: ''} 

   };

    handleSubmit = e => {
        e.preventDefault();
        //call the server, save changes & redirect user
             // const password =  this.password.current.value;
         console.log('Submitted');
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
                    <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input autoFocus 
                    value={account.username}
                    name="username" 
                    onChange={this.handleChange}
                    id="username" 
                    type="text"
                    className="form-control" />
                    </div>
                    <div className="form-group">
                    <label htmlFor="password">Password </label>
                    <input
                    onChange={this.handleChange}
                    value={account.password}
                    name="password"  
                    id="password"
                     type="text" 
                    className="form-control" />
                    </div>
                    <button className="btn btn-primary">Login</button>
                </form>
            </div>
        );
    }
}
 
export default LoginForm;