import React from 'react';
import './Sign.less';
import {message,Modal ,Form, Icon, Input,Tooltip, Button, Checkbox } from 'antd';
import { InfoCircleOutlined, UserOutlined,LockOutlined } from '@ant-design/icons';

class Sign extends React.Component{
  constructor(props){
    super(props)
    this.state = { 
      username:'',
      password:''
    };
  }
  getInputValue=(key,event)=>{
    if(event && event.target && event.target.value){
        let value = event.target.value;
        if(key==='username'){
          this.setState({
            username:value
          })
        }else {
          this.setState({
            password:value
          })
        }
    }
  }
  // 注册请求
  fetchPost=(url,params)=>{
    let self = this
    fetch(url, {
      body: JSON.stringify(params),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    }).then(response=>{
      return response.json()
    }).then(res=>{
      if(res.errno === 0){
        message.success('注册账号成功')
        self.props.history.push('/main')
      }else{
        message.error('注册失败')
      }
    }).catch(error => console.error(error))
  }
  
  signIn=()=>{
    console.log('注册')
    let url = '/api/user/sign'
    let params ={
          username:this.state.username,
          password:this.state.password
    }
    this.fetchPost(url,params)
  }
  render(){
    return(
      <div className="sign">
        <div className="sign-form">
        <Form ref="getFormVlaue">
              <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input
                  placeholder="Enter your username"
                  onChange={event=>this.getInputValue('username',event)}
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  suffix={
                    <Tooltip title="Extra information">
                      <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                    </Tooltip>
                  }
                />
              </Form.Item>
              <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password 
                  onChange={event=>this.getInputValue('password',event)}
                  prefix={<LockOutlined  style={{ color: 'rgba(0,0,0,.45)' }} />}
                  placeholder="input password" />
              </Form.Item>
            </Form>
            <Button type="primary" block onClick={this.signIn}>Sign in</Button>
      </div>
      </div>
    )
  }
}

export default Sign;