import React from 'react';
import './Detail.less';
import moment from 'moment';
import {UserOutlined,FieldTimeOutlined} from '@ant-design/icons';
import { Tag } from 'antd';
// const IconText = ({ icon, text }) => (
//   <Space>
//     {React.createElement(icon)}
//     {text}
//   </Space>
// );

class Detail extends React.Component {
  constructor(props){
    super(props)
    this.state={
      id:'',
      data:''    
    }
  }

  
  // 显示格式化的时间
 getFormatDate=(dt)=> {
  return moment(dt).format('LL')
}
  fetchGet = (url)=>{
    let self =this
    fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      console.log('get list',myJson.data.content);
      self.setState({
        data:myJson.data
      })
      // console.log('qqqq',self.state.data.data)
    });
  }

  componentWillMount(){
    let url ='/api/blog/detail?id=' + this.props.match.params.id
    this.fetchGet(url)
  }

  render(){
    return(
      <div className="detail">
        <div className="detail-title">{this.state.data.title}</div>
        <div className="detail-author">
          <Tag icon={<UserOutlined />} color="#55acee"> 作者：{this.state.data.author}</Tag>
          <span style={{display:'inline-block',width:'20px'}}></span>
          <Tag icon={<FieldTimeOutlined />} color="#55acee"> 发布时间：{this.getFormatDate(this.state.data.createtime)}</Tag>
        </div>
        <div className="detail-body" dangerouslySetInnerHTML={{__html:this.state.data.content}}/>
      </div>
    )
  }
}

export default Detail;