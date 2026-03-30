import React from 'react'
import Login from './Login'

class Register extends React.Component{
    render(){
         return(
            <div>
                <h3>New Customer Registtation  </h3>
                <form>
                    <label>First Name</label>
                    <input types="text"/>
                    <br/>

                    <label>Last Name </label>
                    <input type='text'/>
                    <br/>
                     <label>User Name </label>
                    <input type='text'/>
                    <br/>

                     <label>Email </label>
                    <input type='text'/>
                    <br/>


                     <label>Contact </label>
                    <input type='text'/>
                    <br/>


                     <label>address </label>
                    <input type='text'/>
                    <br/>


                    <button>register</button>

                </form>
            </div>
         )
    }
   


  

}
export default Register