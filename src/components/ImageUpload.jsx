import React from 'react';
import '../App.css';
import { Upload, Button, message, Alert } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import UserContext from '../contexts/user';

class ImageUpload extends React.Component {
 static contextType = UserContext;
 constructor(props) {
  super(props);
  this.state = {
    fileList: [],
    uploading: false,
    imgPosted: [],
    isUploadOk: false,}
    }      
  
  handleUpload = () => {
    if (this.state.fileList.length === 1) {
      const { fileList } = this.state;
      const formData = new FormData();
       fileList.forEach(file => {
        formData.append('upload', file, file.name);
      });
    
      this.setState({
        uploading: true
      });
    let requestOptions = {
    method: 'POST',
    body: formData,
    redirect: 'follow',
    headers: {"Authorization": "Basic " + window.btoa(this.context.user.username + ":" + this.context.user.password), }
    };
  		  fetch('https://VT6003CEMLiuPoHim217110981AssignmentBackend.him2077.repl.co/api/v1/images',requestOptions)
        .then((response) => response.json())
  			.then((result) => {
          message.success('upload successfully.');
         this.setState({
         isUploadOk : true
         });
         this.setState({
        imgPosted: result
        });      
        console.log("result ",result); 
         console.log("isUPloadOK  ",this.state.isUploadOk); 
          console.log("imgPosted ",this.state.imgPosted); 
         
        })
        .catch((error) => {
          message.error('upload failed.');
          console.error('Error:', error);
        })
        .finally(() => {
          this.setState({
            uploading: false,
          });
        });
    }
  };

   render() {
    const { uploading, fileList, isUPloadOK,imgPosted} = this.state;
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };

    return (
      <>
        <div>
          <h2>Select and Upload Image</h2>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
          <Button
            type="primary"
            onClick={this.handleUpload}
            disabled={fileList.length === 0}
            loading={uploading}
            style={{ marginTop: 16 }}
          >
            {uploading ? 'Uploading' : 'Start Upload'}
          </Button>
          {this.state.isUploadOk&&
          <div>
            <p style={{ color: 'red' }}>Image uploaded successfully: </p>
            <Alert message= {JSON.stringify(this.state.imgPosted)}  type="success" /> 
          </div>}      
        </div>
      </>
    );
  }
}
export default ImageUpload;