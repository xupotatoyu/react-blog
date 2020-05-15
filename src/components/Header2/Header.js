import React from 'react';
import {  Menu  } from 'antd';
import {   AppstoreOutlined  } from '@ant-design/icons';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './Header.less';
import {Link} from 'react-router-dom';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'mail',
      
    }
  }

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
        <Menu.Item key="main"  icon={<AppstoreOutlined />}>
          <Link to="/main">博客</Link>
        </Menu.Item>
        <Menu.Item key="manage">
          <Link to="/manage">管理中心</Link>
        </Menu.Item>
        <Menu.Item key="write">
          <Link to="/write">写博客</Link>
        </Menu.Item>
      </Menu>
    );
  }
}

class Header extends  React.Component{
  constructor(props){
    super(props)
    this.state={
      userName:'',
      userState: false
    }
  }
  componentDidMount(){
    this.setState({
      userName: this.props.userName
    })
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      userName: nextProps.userName
    })
 }
 
  render() {
    return(
      <div className="header">
        <div className="header-title"> 徐怀宇的博客</div>
        <div className="header-right">
          <div className="header-nav">
            <Nav></Nav>
          </div>
          {this.state.userName ?
          <div className="header-user">
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          <span style={{marginLeft:'2px'}} onClick={this.props.quitModal}><b>{this.state.userName}</b></span>
          </div>:<div className="header-user">
          <Avatar icon={<UserOutlined />} />
          <span style={{marginLeft:'2px'}} onClick={this.props.changeModal}>请登录</span>
          </div>}
        </div>
      </div>
    )
  }
}
export default Header;