import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import target from '../helper/target';

const Home = (props) => {
    const [data, setData] = React.useState(null)
    return (
        <div>
            <h1>Auth check: </h1>
            {data ? data.username : "Not authenticated"}
            <br/>
            <Button onClick={
                (e)=>{
                    
                  e.preventDefault();
                  axios.post(`${target}/api/user/auth`,{}, {withCredentials: true})
                    .then(res => {
                        // console.log(res)
                        setData(res.data)
                    })  
                }
            }>Check if authenticated</Button>
            <div>Please head to Characters tab...</div>
            {target}
        </div>
    );
}
 
export default Home;