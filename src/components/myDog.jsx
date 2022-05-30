import React , {  useContext, useState } from 'react';
import { Col, Row } from 'antd';
import DogCard from './dogcard';
import { status, json } from '/utilities/requestHandlers';
import UserContext from '../contexts/user';


class MyDog extends React.Component {
  static contextType = Context
  
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    }
  }
  componentDidMount() { 
  const userdata = this.context; fetch(`https://VT6003CEMLiuPoHim217110981AssignmentBackend.him2077.repl.co/api/v1/dogs/user/${userdata.user.userID}`, {
        method: "GET"               
    })
    .then(status)
    .then(json)
    .then(data => {
      this.setState({ posts: data })
 //   console.log("post ", data)
  })
  .catch(err => console.log("Error fetching dogs", err));


}

  render() {
    if (!this.state.posts.length) {
      return <h3>Loading posts...</h3>
    }
    // the next line does the Array.map() operation on the posts
    // to create an array of React elements to be rendered
    const cardList = this.state.posts.map(post => {
      return (
        <div style={{padding:"10px"}} key={post.id} >
          <Col span={6}>
 
            <DogCard {...post} />  
            

          </Col>          
         </div>
      )
    });
    return (
      <Row type="flex" justify="space-around">
        {cardList}
      </Row>
    );
  }
}

export default MyDog;
