import React, {  useContext, useState } from 'react';
import { PageHeader, Input, message } from 'antd';
import { status, json } from '/utilities/requestHandlers';
import {Table, Alert, Select, Button, Form, Row, Col, AutoComplete} from 'antd';
import { Tag, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
const { Column} = Table;
const  { Search } = Input;
import UserContext from '../contexts/user';
import DogCard from './dogcard';




function SearchDog(props) {
 const[dogsData,setDogs] = useState([]);
 const[isSearchOK,setSearch] = useState(false);
 const search = useContext(UserContext);
  
  const onSearch= (values) => {
    console.log('Received values of form: ', values);
    const {...data } = values; 
      console.log("Json  ",JSON.stringify(data))
    let urlPath="https://VT6003CEMLiuPoHim217110981AssignmentBackend.him2077.repl.co/api/v1/dogs/searchDog"; 
    console.log("urlPath ",urlPath)
    return(fetch(`${urlPath}`,
       {
        method: "Get",
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"}
       }      
    )
    .then(status)
    .then(json)
    .then(data => { 
     console.log("dog return  ",JSON.stringify(data) );
     console.log("dog data  ",data );
     setDogs(data);
     setSearch(true); 
      value="";
    })
    .catch(err => console.log("Error fetching dogs", err)) 
    ) 
  }
 	
  const AdvancedSearchForm = () => {
  
    const [form] = Form.useForm();
    const fieldName = ["DogName", "Breed", "Gender", "ID", "Age"];
    const placeholder = ["Input Name", "e.g: bulldog","","ID of Dog","Maximum Age"];

    const fieldLabel = ["Dog Name: ", "Breed: ", "Gender: ", "ID: ", "Age: "];
    
    const getFields = () => {
      const count = 5;
      const children = [];
  
      for (let i = 0; i < count; i++) {
        
        children.push(
          <Col span={i !== 0? (8):(16) } key={i}>
            <Form.Item name={`${fieldName[i]}`} label={`${fieldLabel[i]}`} >
              {(i == 1) ? 
                (<>                               
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
                </>
                ) : (i !== 2 ? ( <Input placeholder={`${placeholder[i]}`} /> ) : 
              (
              <Select defaultValue="All">
                <Option value="All">All</Option>
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
              </Select>
              ) )}
            </Form.Item>
          </Col>,
        );
      }
  
      return children;
    };
  
    return (
      <Form
        form={form}
        name="Search Dog"
        className="ant-advanced-search-form"
        onFinish={onSearch}
      >
        <Row gutter={24}>{getFields()}</Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right', }} >
            <Button type="primary" htmlType="submit"> Search </Button>
            <Button style={{ margin: '0 8px',}} 
              onClick={() => {form.resetFields(); }}>
              Clear
            </Button>
          </Col>
        </Row>
      </Form>
    );
  };
  
    const cardList = dogsData.map(dog => {
      return (
        <div style={{padding:"10px"}} key={dog.id} >
          <Col span={6}>
 
            <DogCard {...dog} />  
            

          </Col>          
         </div>
      )
    });
  
  return (
   <>
    <Row>

      <Col span={24}>
        <AdvancedSearchForm/>
      </Col>

    </Row>  
     {isSearchOK&&<cardList/>}

  </>
  );
}

export default SearchDog;

  