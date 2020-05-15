import React from 'react';
import './Manage.less';
import { List, Avatar,message, Button, Skeleton } from 'antd';
import ReactEcharts from 'echarts-for-react';

// const data = [
//   {
//     title: 'Ant Design Title 1',
//   },
//   {
//     title: 'Ant Design Title 2',
//   },
//   {
//     title: 'Ant Design Title 3',
//   },
//   {
//     title: 'Ant Design Title 4',
//   },
// ];


class Manage extends React.Component {
  constructor(props){
    super(props);
    this.state={
      categoryOp :  {
        title: {
            top: 30,
            left: 'center',
            text: 'data'
        },
        tooltip: {},
        visualMap: {
          show: false,
          min: 0,
          max: 50
        },
        calendar: {
            top: 120,
            left: 30,
            right: 30,
            cellSize: ['auto', 13],
            range: '2020',
            itemStyle: {
                borderWidth: 0.5
            },
            yearLabel: {show: false}
        },
        series: {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            data:  [["2020-05-14", 20],["2020-05-15", 25]]
        }
      },
      shanOp :{
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        // legend: {
        //     orient: 'vertical',
        //     left: 10,
        //     top: 30,
        //     data: ['直达', '营销广告', '搜索引擎', '邮件营销', '联盟广告', '视频广告', '百度', '谷歌', '必应', '其他']
        // },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                selectedMode: 'single',
                radius: [0, '30%'],
    
                label: {
                    position: 'inner'
                },
                labelLine: {
                    show: false
                },
                data: [
                    {value: 335, name: '直达', selected: true},
                    {value: 200, name: '其他'},
                    {value: 1548, name: '搜索引擎'}
                ]
            },
            {
                name: '访问来源',
                type: 'pie',
                radius: ['40%', '55%'],
                label: {
                    formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                    backgroundColor: '#eee',
                    borderColor: '#aaa',
                    borderWidth: 1,
                    borderRadius: 4,
                    // shadowBlur:3,
                    // shadowOffsetX: 2,
                    // shadowOffsetY: 2,
                    // shadowColor: '#999',
                    // padding: [0, 7],
                    rich: {
                        a: {
                            color: '#999',
                            lineHeight: 22,
                            align: 'center'
                        },
                        // abg: {
                        //     backgroundColor: '#333',
                        //     width: '100%',
                        //     align: 'right',
                        //     height: 22,
                        //     borderRadius: [4, 4, 0, 0]
                        // },
                        hr: {
                            borderColor: '#aaa',
                            width: '100%',
                            borderWidth: 0.5,
                            height: 0
                        },
                        b: {
                            fontSize: 16,
                            lineHeight: 33
                        },
                        per: {
                            color: '#eee',
                            backgroundColor: '#334455',
                            padding: [2, 4],
                            borderRadius: 2
                        }
                    }
                },
                data: [
                    {value: 335, name: '直达'},
                    {value: 810, name: '百度'},
                    {value: 200, name: '搜狐'},
                    {value: 851, name: '谷歌'},
                    {value: 147, name: '必应'},
                    {value: 102, name: '其他'}
                ]
            }
        ]
      },
      data:[]
    }
  }

  // 获取用户博客列表
  fetchGet = (url)=>{
    let self =this
    fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      self.setState({
        data:myJson.data
      })
      // console.log('qqqq',self.state.data.data)
    });
  }
  // 删除博客
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
        message.success('删除成功')
        self.fetchGet('/api/blog/list?isadmin=1')
      }else{
        message.error('删除失败')
      }
    }).catch(error => console.error(error))
  }

  componentWillMount(){
    if(!window.localStorage.getItem('userName')){
      message.error('请先登录')
      this.props.history.push('/main')
    }else{
      let url = '/api/blog/list?isadmin=1'
      this.fetchGet(url)
    }
  }

  changeBlog=(id)=>{
    console.log('点击了')
    this.props.history.push(`/edit/${id}`)
  }
  delBlog=(id)=>{
    let url = '/api/blog/del?id='+id
    this.fetchPost(url)
  }
  render() {

    return(
      <div className="manage" style={{padding:'30px'}}>
        <div className="manage-content">
          <div className="manage-content-left">
            <List
              itemLayout="horizontal"
              dataSource={this.state.data}
              renderItem={item => (
                <List.Item
                  actions={[<div onClick={()=>this.changeBlog(item.id)}>修改</div>, <div onClick={()=>this.delBlog(item.id)}>删除</div>]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={<a href="https://ant.design">{item.title}</a>}
                    // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                </List.Item>
              )}
            />
          </div>
          {/* <div className="manage-content-right">
            <ReactEcharts
              option={this.state.shanOp}
              // style={{height: '100%', width: '100%'}}
            />
          </div> */}
        </div>
        <div className="manage-chart">
          <div className="manage-chart-content">
          <ReactEcharts
              option={this.state.categoryOp}
              style={{height: '300px', width: '50%'}}
              />
          <ReactEcharts
              option={this.state.shanOp}
              style={{height: '300px', width: '50%'}}
            />
          </div> 
        </div>
      </div>
    )
  }
}

export default Manage;
