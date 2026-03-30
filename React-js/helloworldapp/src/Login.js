import React from 'react'
class Login extends React.Component{
    render(){
        return (
            <div>
                <form>
                    <label>User Name</label>
                    <input type='text'/>
                    <br/>
                    <label>Password</label>
                    <input type='password'/>
                    <button >Login</button>
                </form>
            </div>
        )
    }
}
export default Login 