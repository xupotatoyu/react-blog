import React from 'react';
import './App.less';
import { Redirect, Switch } from 'react-router-dom';
import routes from './router/router.js';
import { RouteWithSubRoutes } from './utils/utils';
import Header from './components/Header2/Header.js';
import Footer from './components/Footer/Footer';
import {message,Modal ,Form, Icon, Input,Tooltip, Button, Checkbox } from 'antd';
import { InfoCircleOutlined, UserOutlined,LockOutlined } from '@ant-design/icons';


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      visible: false,
      quitVisible: false,
      username:'',
      password:'',
      userName:''
    };
  }
  componentWillMount(){
    if(window.localStorage.getItem('userName')){
      this.setState({
        userName: window.localStorage.getItem('userName')
      })
    }
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
  // 登录modal出现
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  // 退出modal出现
  quitModal = ()=>{
    this.setState({
      quitVisible: true,
    });
  };

  // 登录请求
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
        message.success('登录成功')
        this.setState({
          visible: false,
        });
        window.localStorage.setItem('userName',this.state.username)
        self.setState({
          userName: window.localStorage.getItem('userName')
        })
        // window.location.reload()
      }else{
        message.error('密码或者用户名错误')
      }
    }).catch(error => console.error(error))
  }
  // 退出请求
  fetchQuit=(url)=>{
    let self = this
    fetch(url, {
      body: '',
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    }).then(response=>{
      return response.json()
    }).then(res=>{
      if(res.errno === 0){
        message.success('登出成功')
        window.localStorage.removeItem('userName')
        this.setState({
          quitVisible: false,
        });
        self.setState({
          userName: ''
        })
        // window.location.reload()
      }else{
        message.error('退出失败')
      }
    }).catch(error => console.error(error))
  }

  // 确定登录
  handleLoginOk = e => {
    console.log(e);
    const url = '/api/user/login'
    const data = {
          username:this.state.username,
          password:this.state.password
          }
    this.fetchPost(url,data)
  };
  // 确定注销
  handleQuitOk = e => {
    const url = '/api/user/quit'
    this.fetchQuit(url)
  }
  // Model 取消
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
      quitVisible: false
    });
  };

  pushSign=()=>{
    this.props.history.push(`/sign`)
    window.location.reload()
    // window.reload()
    this.setState({
      visible: false
    })
  }
  render() {

    return(
      <div className="app">
        <Header {...this.props} changeModal={this.showModal} quitModal={this.quitModal} userName={this.state.userName}/>
        <Modal
          title="登录"
          visible={this.state.visible}
          onOk={this.handleLoginOk}
          onCancel={this.handleCancel}
        >
          <div style={{height:'150px',display:'flex',flexDirection:'column',justifyContent:'space-around'}}>
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
          </div>
          <span style={{color:'red',cursor:'default'}} onClick={this.pushSign}>没有账户？点击注册账户</span>
        </Modal>
        <Modal
          title="注销"
          visible={this.state.quitVisible}
          onOk={this.handleQuitOk}
          onCancel={this.handleCancel}
        >
         <div style={{textAlign:'center'}}><h1>确定退出登录？</h1></div>
        </Modal>
          <div className="contain">
            <Switch>
              {routes.map((route, i) => (
                  <RouteWithSubRoutes key={i} {...route} />
                ))}
                <Redirect from="" to='/main' />
            </Switch>
          </div>
      </div>
    )
  }
}

export default App;
