import React from 'react';
import {  Layout,Space } from 'antd';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './page/home';
import Account from './page/account';
import Login from './page/login';
import Img_Page from './page/img_Page';
import Register from './page/register';
import SearchDog from './page/searchDog';
import MyDogPage from './page/myDogPage';
import Nav from './components/nav';
import UserContext from './contexts/user';
import {useNavigate } from 'react-router-dom';
const { Header, Content, Footer, Button} = Layout;



class App extends React.Component {
constructor(props) {
  super(props);
  this.state = {
    user: {loggedIn: false, password:"", searched: false ,  registerOK:false, userID:''}
  }
  
  this.login = this.login.bind(this);
  this.logout = this.logout.bind(this);
  this.search = this.search.bind(this);
  this.regComplete = this.regComplete.bind(this);
}
   

login(user) {

  console.log("login process")
  user.loggedIn = true;
  user.passward=user.password; 
  this.setState({user:user});
  console.log("User is now being set on the context ", this.state.user);
  
}

logout() {
  console.log("Removing user from the app context");
  this.setState({user: {loggedIn:false}});
}   
  
regComplete() {
  console.log("Registration completed");
  this.setState({user: {registerOK:true}});
}   

search(){
  console.log("Searching completed");
  this.setState({user: {searched:true}});
}
  
  render(){
  const context = {
    user: this.state.user,
    login: this.login,
    logout: this.logout,
    search: this.search, 
    regComplete:this.regComplete
  }; 
  
  
  return(
   
    <Layout className="layout">
    <UserContext.Provider value= {context}>  	
     <Router>
				<Header> 
        <Nav/>
        </Header> 
	      <Content style={{ padding: '0 50px', height: '90%' }}>
                       			
				<Routes>
						<Route exact path="/" element={<Home />} />
            <Route exact path="/register" element={<Register />} />
            <Route path="/login"element={<Login />} />
						<Route path="/searchDog" element={<SearchDog />} />	
            <Route path="/account" element={<Account />} />	
            <Route path="/myDogPage" element={<MyDogPage />} />	
            <Route path="/img_Page" element={<Img_Page />} />	
				</Routes>			
				</Content>
				
       <Footer>
					<p style={{ color: 'green' }}>VT6003CEM Liu Po Him (217110981) Frontend</p>
				</Footer>
			</Router>	
  </UserContext.Provider>  
  </Layout> 
  );
 }
}
  
  
export default App;

