import React from 'react';
import '../App.css';
import MyDog from '../components/myDog'
import { Button } from 'antd';
import ImageUpload from '../components/ImageUpload'
import CreateDogCard from '../components/createDogCard'
import UpdateDogCard from '../components/updateDogCard'
import DeleteDogCard from '../components/deleteDogCard'

function MyDogPage() {
  const [Form, setForm] = React.useState("create");
  const onClick = (value) => {
    switch (value) {
        case "create":
            setForm("CREATE");
            break;
        case "update":
            setForm("UPDATE");
            break;
        case "delete":
            setForm("DELETE");
            break;
    }
  }
  
  return (
    <> 
    <h2 style={{ color: 'green' }}> MY Dogs </h2>     
    <Button onClick={() => onClick("create")}>Create</Button>
    <Button onClick={() => onClick("update")}>Update</Button>
    <Button onClick={() => onClick("delete")}>Delete</Button>
    {(Form == "CREATE")&& <ImageUpload />}
    {(Form == "CREATE")&& <CreateDogCard />}
    {(Form == "UPDATE")&& <ImageUpload />}
    {(Form == "UPDATE")&& <UpdateDogCard />}
    {(Form == "DELETE")&& <DeleteDogCard />}
      <MyDog />
      
    </>
  )
}

export default MyDogPage;