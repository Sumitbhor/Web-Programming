import React from "react";

class Product extends React.Component{
    render(){
        return(
            <div>
                <p>Title :gerbera</p>
                <img src="/images/images.jpg" width="100" height="100"/>
                <p>Description : wedding flower </p>
                <p> qunatity available : 45000</p>
                <p>Unit Price : 6 rs</p>
            </div>
        )
    }
}

export default Product