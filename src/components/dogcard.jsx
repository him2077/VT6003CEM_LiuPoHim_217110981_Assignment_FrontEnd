import React from 'react';
import { Card } from 'antd';
import PostIcon from './posticon';
const { Meta } = Card;
import { Link} from 'react-router-dom'; 

class DogCard extends React.Component {

  render() {
    const [show, setShow] = useState(false);
    const mouseEvent = () => setShow(!show)
        return( 
      <Card
        style={{ width: 320 }}
       cover={<img alt="test" src={this.props.imageurl}/>}
 
        hoverable={true}
        actions={[
          <PostIcon type="like" countLink={this.props.links.likes} 
          handleToggle={this.toggleLike} id={this.props.id}
/>,
          <PostIcon type="message" />,
          <PostIcon type="pushpin" />
        ]}>
        
        <Card.Meta title={this.props.name} />
        <Card.Meta description={`Breed: ${this.props.breed}`} />
        <Card.Meta description={`Gender: ${this.props.sex}`} />        
        <Card.Meta description={`Age: ${this.props.age}`} />
        <Card.Meta description={`ID: ${this.props.id}`} />
        onMouseEnter={mouseEvent}
        onMouseLeave={mouseEvent}
        {show&& <Card.Meta description={`Age: ${this.props.description}`} />}
      </Card>
      
    );
  }
}

export default DogCard; 
