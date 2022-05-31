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
    console.log('Received values of form: ', values);
    console.log("Json  ", JSON.stringify(values))
    const ID = values["id"];
fetch('https://VT6003CEMLiuPoHim217110981AssignmentBackend.him2077.repl.co/api/v1/dogs/' + ID, 
    {
      method: "PUT",
      body: JSON.stringify(values),
      headers: 
      {
        "Content-Type": "application/json"
      }
    })
    .then(status)
    .then(json)
    .then(data => {
        console.log(data);
        message.info(`Update Success`);
        this.setState({operating: false})
    })
    .catch(error => {
        message.info(`Update Success`);
        this.setState({operating: false})
    });
  }
  

  
  render() {  
    return (
      <Form name="Create dog form" 
        labelCol={{ span: 6,}}
        wrapperCol={{ span: 12,}}  
        autoComplete="off" onFinish={this.onFinish} 
      >
          <Form.Item label="ID" name="id" 
            rules={[{ required: true, message: 'Please input id',}, ]}>
              <Input />
          </Form.Item>
          <Form.Item label="Name" name="name" 
            rules={[{ required: true, message: 'Please input name',}, ]}>
              <Input />
          </Form.Item>
        
          <Form.Item label="Breed" name="breed" 
            rules={[{ required: true, message: 'Missing breed', }, ]}>
          <AutoComplete>
            <AutoComplete.Option key="labradorretriever" 
              value="LabradorRetriever">Labrador Retriever
            </AutoComplete.Option>
            
            <AutoComplete.Option key="goldenretriever" 
              value="Golden Retriever">Golden Retriever
            </AutoComplete.Option>
            
            <AutoComplete.Option key="germanshepherd" 
              value="GermanShepherd">German Shepherd
            </AutoComplete.Option>
            
            <AutoComplete.Option key="poodle" 
              value="Poodle">Poodle
            </AutoComplete.Option>
  
            <AutoComplete.Option key="Siberian husky" 
              value="siberianhusky">Siberian husky
            </AutoComplete.Option>          
          </AutoComplete>
            
          </Form.Item>
          <Form.Item label="Gender" name="gender" 
            rules={[{ required: true, message: 'Please input gender', }, ]}>
              <Select>
                  <Select.Option value="Male">Male</Select.Option>
                  <Select.Option value="Female">Female</Select.Option>
              </Select>
          </Form.Item>
        
          <Form.Item label="Age" name="age" 
            rules={[{ required: true, message: 'Please input age', }, ]}>
              <InputNumber min={0} precision={0} />
          </Form.Item>
          <Form.Item label="Description" name="description">
              <Input />
          </Form.Item>
          <Form.Item label="ImageURL" name="imageurl">
              <Input />
          </Form.Item>
          <Form.Item label="UserID" name="userid">
            <InputNumber min={0} precision={0} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 18, }}>
              <Button type="primary" htmlType="submit">Update</Button>
          </Form.Item>
      </Form>
    )
  }
}
export default CreateDogCard