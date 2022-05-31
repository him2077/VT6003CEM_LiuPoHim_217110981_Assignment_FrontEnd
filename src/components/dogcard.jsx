import React, { useContext, useState } from 'react';
import { Card } from 'antd';
import PostIcon from './posticon';
const { Meta } = Card;
import { Link} from 'react-router-dom'; 



class DogCard extends React.Component {
  constructor(props) {
    super(props);
 }
  

  render() {
      <mouseEvent/>
        return( 
      <Card
        style={{ width: 320 }}
       cover={<img alt="test" src={'https://VT6003CEMLiuPoHim217110981AssignmentBackend.him2077.repl.co' + this.props.imageurl}/>}
 
        hoverable={true}
        actions={[
          <PostIcon type="like" countLink={this.props.links.likes} 
          handleToggle={this.toggleLike} id={this.props.id}/>,
          <PostIcon type="message" />,
          <PostIcon type="pushpin" />
        ]}>
        
        <Card.Meta title={this.props.name} />
        <Card.Meta description={`Breed: ${this.props.breed}`} />
        <Card.Meta description={`Gender: ${this.props.gender}`} />        
        <Card.Meta description={`Age: ${this.props.age}`} />
        <Card.Meta description={`ID: ${this.props.id}`} />
        <Card.Meta description={`Description:`} />
        <Card.Meta description={`${this.props.description}`} />
        
      </Card>
      
    );
  }
}

export default DogCard; 
