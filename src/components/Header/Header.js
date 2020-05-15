import React from 'react';
import './Header.less';

class Header extends React.Component {

  render() {

    return(
      <div className='header'>
        <div className="left-header">
          <span>首页</span>
        </div>
        <div className="right-header">
          <span>管理中心</span>
          <span>登录</span>
        </div>
      </div>
    )
  }
}

export default Header;