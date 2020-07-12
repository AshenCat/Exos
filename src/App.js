import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import Header from './components/layout/Header'
import Content from './components/Content'
import Footer from './components/layout/Footer';

export const UserContext = React.createContext();

const App = () => {

  const [session, setSession] = React.useState(null)

  // const setSession = (session) => this.setState({session}) 

    React.useEffect(() => {
    axios.post(`${process.env.REACT_APP_TARGET}/api/user/auth`,{}, {withCredentials: true})
      .then(res => {
          if(!session) {
            // console.log("useEffect on header : ")
            // console.log(res.data)
            setSession(res.data)
          }
      }).catch(err =>console.log(err))
    }, [session])

    return (
      <div>
        <BrowserRouter>
          <Header session={session} setSession={setSession} />
            <UserContext.Provider value={session}>
              <Content />
            </UserContext.Provider>
          <Footer />
        </BrowserRouter>
      </div>
    )
}

export default App;