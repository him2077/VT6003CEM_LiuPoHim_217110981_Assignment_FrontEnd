import React from 'react';
import '../App.css';
import MyDog from '../components/myDog'

function MyDogPage() {
  return (
    <> 
    <h2 style={{ color: 'green' }}> Upload image to Web API Server </h2>     
           
      <MyDog />
    </>
  )
}

export default MyDogPage;