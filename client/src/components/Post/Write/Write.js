import React, { Component } from 'react';
import { Input, Button, Modal } from 'antd';
import LiveClock from './LiveClock';
import Emotion from './Emotion';
import { withRouter } from 'react-router';
import axios from 'axios';

const { TextArea } = Input;
const config = require('../../../config');

class Write extends Component {
  constructor(props) {
    super(props) 

    this.state = {
      visible: false,
      paragraph: "",
      affectivity: "",
    }
    this.paragraphChanged = this.paragraphChanged.bind(this)
    this.selectedEmotion = this.selectedEmotion.bind(this)
    // this.parentCallback = this.parentCallback(this)
  }  
  
  showModal = () => {
    this.setState({
      visible: true,
    });
  };


  // handleOk = e => {    
  //   this.props.history.push('/post')
  //   this.setState({
  //     visible: false,   
  //   })
  // };
  handleOk = e => { 
    axios.post(config.serverUrl + "/api/posts", {
      paragraph: this.state.paragraph,
      affectivity: this.state.affectivity,
    })
    .then((response) => {       
      console.log(this.state)  
      alert("당신의 소중한 하루가 저장되었습니다.")  
      this.setState({
        visible: false,
        paragraph: "",
        affectivity: "",     
      })
      this.props.history.push('/posts')       
    })
    .catch((error) => {
      alert("에러 발생: " + error.message)
      console.error(error)
    })
  }

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  paragraphChanged(event) {
    this.setState({
      paragraph: event.target.value,
    })
  }

  selectedEmotion(e) {
    this.setState({
      affectivity: e.target.value
    })
  }

  render() {

    return (
      <div className="one-post-write">
        <div className="one-liveClock-container">
          <LiveClock />
        </div> 
        <TextArea className="one-textarea" 
          placeholder="...그래서 오늘은 어땠어?"
          value={this.state.paragraph}
          onChange={this.paragraphChanged}  />
        <div className="one-post-btn-container flex">
          <Emotion clickHandler={this.selectedEmotion}/>
          <Button type="primary" onClick={this.showModal} className="btn btn-submit">저장</Button>
          <Modal title="글이 완성되었습니다." visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} >
{/*  리뷰 페이지로 이동 */}
              저장하시겠습니까?
          </Modal>       
        </div>
      </div>
    )
  }
}
export default withRouter(Write) 