import { Menu } from 'antd';
import { Link } from "react-router-dom";
import UserContext from '../contexts/user';
import React, {  useContext, useState, useEffect } from 'react';



/**
 * Renders a <Nav /> component for the navigation menu.
 * @params props
 */
function Nav(props) {
		const logout = useContext(UserContext);

	
  return (  
    
  <UserContext.Consumer>
   
      {({logout, user}) => (

    <>
     
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" >Home<Link to="/"></Link></Menu.Item>
        {!user.loggedIn&&
        <Menu.Item key="2" ><Link to="/login">Login</Link></Menu.Item>}
        {user.loggedIn&&
        <Menu.Item key="2" onClick={logout}><Link to="/">Logout</Link></Menu.Item>}
        {!user.loggedIn&&
        <Menu.Item key="3" ><Link to="/register">Register</Link></Menu.Item>}
        {user.loggedIn&&
        <Menu.Item key="3" ><Link to="/account" style= {
          {color:"white"}
        } type ="link" > Account: {user.username}  </Link></Menu.Item>}
        <Menu.Item key="4" >Search Dog<Link to="/searchDog"></Link></Menu.Item>
        <Menu.Item key="5" type="primary" >
          {user.loggedIn&&<Link to="/myDogPage">My Dogs</Link>}
        </Menu.Item>
        
        </Menu>  
   </>
      )}
</UserContext.Consumer>

  );

}

export default Nav;