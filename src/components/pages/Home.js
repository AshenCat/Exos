import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const Home = (props) => {
    const [data, setData] = React.useState(null)
    return (
        <div>
            {data ? data.username : null}
            <Button onClick={
                (e)=>{
                    
                  e.preventDefault();
                  axios.post('http://localhost:7172/api/user/auth',{}, {withCredentials: true})
                    .then(res => {
                        console.log(res)
                        setData(res.data)
                    })  
                }
            }>Click</Button>
        </div>
    );
}
 
export default Home;