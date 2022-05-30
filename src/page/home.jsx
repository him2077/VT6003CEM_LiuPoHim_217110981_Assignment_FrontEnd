import React from 'react';
import '../App.css';
import DogGrid from '../components/doggrid'
function Home() {
  return (
    <> 
    <h2 style={{ color: 'green' }}> Welcome to The Canine Shelter</h2>     
      <DogGrid />
    </>
  )
}
export default Home;