import React, {useState} from 'react';
import { status, json } from '/utilities/requestHandlers';
import {Alert, Select, Button, Form, Row, Col, AutoComplete, Input } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import UserContext from '../contexts/user';
import DogCard from './dogcard';


function SearchDog (props) {
  const [Dogs, SetDogs] = useState([]);
  const[isSearchOK,setSearch]=useState(false);
  let IsSearch =false;
    const onSearch= (formdata) => {
      console.log('Received data of form: ', formdata);
      
      let conditions = JSON.stringify(formdata)
      console.log('conditions: ', conditions);
      
      let object = JSON.parse(conditions)
      console.log('object: ', object);
      
      let keys = Object.keys(object)
      console.log('keys: ', keys);
      
      let values = Object.values(object) 
      console.log('values: ', values);
      
        let query = "";
        for(let i = 0; i < values.length; i++){
          if(i != 0){
            query += `AND_`
          }
          console.log(`keys ${i}: `, keys[i]);
          switch(keys[i]){
            case 'name':
              query += `WHERE_${keys[i]}_LIKE_'%${values[i]}%'_`;
              break;
            case 'gender':
              query += `WHERE_${keys[i]}_=_'${values[i]}'_`;
              break;
            case 'breed':
              query += `WHERE_${keys[i]}_LIKE_'%${values[i]}%'_`;
              break;
            case 'id':
              query += `WHERE_${keys[i]}_=_${values[i]}_`;
              break;
            case 'age':
              query += `WHERE_${keys[i]}_<_${values[i]}_`;          
              break;
          }
        }
    console.log('query: ', query);
    let urlPath="https://VT6003CEMLiuPoHim217110981AssignmentBackend.him2077.repl.co/api/v1/dogs/searchDog?fields=" + query; 
    console.log("urlPath ",urlPath)
    return(fetch(`${urlPath}`,
       {
        method: "GET",
        headers: {"Content-Type": "application/json"}
       }      
    )
    .then(status)
    .then(json)
    .then(data => { 
      SetDogs([]);
      console.log(" data", typeof(data));
      SetDogs(data);
      console.log(" Dogs", Dogs);
      setSearch(true);
      IsSearch = true;
      values="";
    })
    .catch(err => console.log("Error fetching dogs", err)) 
    ) 
  }
 	
  const AdvancedSearchForm = () => {
  
    const [form] = Form.useForm();
    const fieldName = ["name", "breed", "gender", "id", "age"];
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
                      value="GoldenRetriever">Golden Retriever
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
  
    const CardList = () => {
      console.log(" Dogs", Dogs.lengh)
      
      return (
        Dogs.map(
          dog => {
            console.log(" Dogs", dog)
            return (
            <div style={{padding:"10px"}} key={dog.id} >
              <Col span={6}>
                <DogCard {...dog} />      
              </Col>          
             </div>
            )
          }
        )
      )
    } 
  
  return (
   <>
    <Row>

      <Col span={24}>
        <AdvancedSearchForm/>
      </Col>

    </Row>  
     {isSearchOK&&<CardList/>}

  </>
  );
  

}

export default SearchDog;

  