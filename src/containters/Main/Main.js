import React from 'react';
import './Main.less';
import moment from 'moment';
import { List, Avatar, Space,Card,Tag } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined,UserOutlined,FieldTimeOutlined } from '@ant-design/icons';
import './Main.less';
import { Carousel,Row,Col } from 'antd';
import { Calendar } from 'antd';
import img1 from '../../assets/one.jpg';
import img2 from '../../assets/two.jpg';
import img3 from '../../assets/three.jpg';
import img4 from '../../assets/four.jpg';
// import Footer from '../../components/Footer/Footer';

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);



class Main extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      data:{}
      }
    }

  // 显示格式化的时间
 getFormatDate=(dt)=> {
    return moment(dt).format('LL')
}

fetchGet = (params)=>{
  let self =this
  fetch('/api/blog/list')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log('get list',myJson);
    self.setState({
      data:myJson
    })
    // console.log('qqqq',self.state.data.data)
  });
}

  componentWillMount(){
    this.fetchGet()
  }

  render() {
    // console.log('arr233',this.state.data.data)
    // let list = Array.from(this.state.data.data);
    let list = this.state.data.data
    const listitem = list&&list.map((item)=>
    ({
      href: `/detail/${item.id}`,
      title: `${item.title}`,
      avatar: `https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png`,
      // description:`${item.author}  ${this.getFormatDate(item.createtime)}`,
      description:(<div>
      <IconText icon={UserOutlined} text={item.author}/>
      <span style={{width:'20px',display:'inline-block'}}></span>
      <IconText icon={FieldTimeOutlined} text={this.getFormatDate(item.createtime)}/>
      </div>)
      // content:`点击详情` 
    }))

    return(
      <div className='main'>
        <Row>
          <Col span={1}> 
          </Col>
          <Col span={16}>
            <div className='main-img'>
            <Carousel autoplay>
                  <div>
                    <img src={img1} alt="" width='990px' height='400px' />
                  </div>
                  <div>
                    <img src={img2} alt="" width='990px' height='400px' />
                  </div>
                  <div>
                    <img src={img3} alt="" width='990px' height='400px' />
                  </div>
                  <div>
                    <img src={img4} alt="" width='990px' height='400px'/>
                  </div>
            </Carousel>
            </div>
            <div className="main-content">
            <List
                  itemLayout="vertical"
                  size="large"
                  pagination={{
                    onChange: page => {
                      console.log(page);
                    },
                    pageSize: 6,
                  }}
                  footer={
                    <div style={{height:'40px'}}>
                    </div>
                  }
                  dataSource={listitem}
                  renderItem={item => (
                    <List.Item
                      key={item.title}
                      actions={[
                        <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                        <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                        <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                      ]}
                      // extra={
                      //   <img
                      //     width={272}
                      //     alt="logo"
                      //     src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                      //   />
                      // }
                    >
                      <List.Item.Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={<a href={item.href}>{item.title}</a>}
                        description={item.description}
                      />
                      {item.content}
                    </List.Item>
                  )}
                />
            </div>
          </Col>
          <Col span={6}> 
            <div>
            <Card title="站点公告" bordered={true} hoverable={true} headStyle={{fontSize:'150%',fontWeight:'bold'}}>
              <p>本博客网站还在建设中</p>
              <p></p>
              <p></p>
            </Card>
            <div style={{height:'30px'}}></div>
            </div>
            <div className="site-calendar-demo-card">
              <Calendar fullscreen={false}  />
            </div>
            <div style={{height:'30px'}}></div>
            <Card title='热门标签' bordered={true} hoverable={true} headStyle={{fontSize:'150%',fontWeight:'bold'}}>
              <div style={{height:'150px'}}>
              <div style={{height:'20px'}}></div>
              <Tag color="magenta">HTML5</Tag>
              <Tag color="red">CSS3</Tag>
              <Tag color="volcano">JavaScript</Tag>
              <Tag color="orange">TypeScript</Tag>
              <div style={{height:'20px'}}></div>
              <Tag color="gold">Linux</Tag>
              <Tag color="lime">nginx</Tag>
              <Tag color="green">pm2</Tag>
              <Tag color="cyan">NodeJS</Tag>
              <Tag color="blue">Koa2</Tag>
              <div style={{height:'20px'}}></div>
              <Tag color="geekblue">React</Tag>
              <Tag color="purple">Vue</Tag>
              </div>
            </Card>
          </Col>
          <Col span={1}> 
          </Col>
        </Row>
        {/* <Footer></Footer> */}
      </div>
    )
  }
}

export default Main;
