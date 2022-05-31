import React from 'react'
import UserContext from '../contexts/user';
import { status, json } from '/utilities/requestHandlers'
import {Table, Alert, Select, Button, Form, Input, InputNumber, Row, Col, AutoComplete, message, Space,} from 'antd';
class CreateDogCard extends React.Component {
  constructor(props) {
    super(props);
    this.onFinish = this.onFinish.bind(this);
    this.state = {
      operating: false,
    }
  }

  static contextType = UserContext;

  onFinish = (values) => {
    // proceed to submit data
    this.setState({operating: true})
    console.log('Received values of form: ', values);
    const ID = values["id"];
fetch('https://VT6003CEMLiuPoHim217110981AssignmentBackend.him2077.repl.co/api/v1/dogs/' + ID, 
    {
      method: "DELETE",
      headers: 
      {
        "Content-Type": "application/json"
      }
    })
    .then(status)
    .then(json)
    .then(data => {
        console.log(data);
        message.info(`Data deleted"`);
        this.setState({operating: false})
    })
    .catch(error => {
        alert("Data deleted");
        this.setState({operating: false})
    });
  }
  

  
  render() {  
    return (
      <Form name="Delete dog Card" 
        labelCol={{ span: 6,}}
        wrapperCol={{ span: 12,}}  
        autoComplete="off" onFinish={this.onFinish} 
      >
          <Form.Item label="ID" name="id" 
            rules={[{ required: true, message: 'Please input id',}, ]}>
              <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 18, }}>
              <Button type="primary" htmlType="submit">Delete</Button>
          </Form.Item>
      </Form>
    )
  }
}
export default CreateDogCard