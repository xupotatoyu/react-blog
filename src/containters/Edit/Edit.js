import React from 'react';
// 引入编辑器组件
import BraftEditor from 'braft-editor';
// 引入编辑器样式
import 'braft-editor/dist/index.css';

import {Input,Button,message} from 'antd';
import './Edit.less';

// class Md extends React.Component {
//   state = {
//     // 创建一个空的editorState作为初始值
//     editorState: BraftEditor.createEditorState(null)
// }

// async componentDidMount () {
//     // // 假设此处从服务端获取html格式的编辑器内容
//     // const htmlContent = await fetchEditorContent()
//     // // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat
//     // this.setState({
//     //     editorState: BraftEditor.createEditorState(htmlContent)
//     // })
// }

// submitContent = async () => {
//     // 在编辑器获得焦点时按下ctrl+s会执行此方法
//     // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
//     const htmlContent = this.state.editorState.toHTML()
//     // const result = await saveEditorContent(htmlContent)
// }

// handleEditorChange = (editorState) => {
//     this.setState({ editorState })
// }

// render () {

//     const { editorState } = this.state
//     return (
//         <div className="my-component">
//             <BraftEditor
//                 value={editorState}
//                 onChange={this.handleEditorChange}
//                 onSave={this.submitContent}
//             />
//         </div>
//     )

// }
// }

export default class Edit extends React.Component { 

    constructor(props){
      super(props)
      this.state = {
        // 创建一个空的editorState作为初始值
        editorState: BraftEditor.createEditorState(null),
        title:'',
        data:{}
      }
    }
    // 获取标题
    getInputValue=(event)=>{
      if(event && event.target && event.target.value){
        let value = event.target.value;       
          this.setState({
            title:value
          })
      }
    }

    // 获取博客
  fetchGet = (url)=>{
    let self =this
    fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      self.setState({
        data:myJson.data,
        editorState:BraftEditor.createEditorState(myJson.data.content),
        title:myJson.data.title
      })
      // console.log('qqqq',self.state.data.data)
    });
  }
    // 添加初始文本
    async componentDidMount () {
        // // 假设此处从服务端获取html格式的编辑器内容
        // const htmlContent = await fetchEditorContent()
        // // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat
        // this.setState({
        //     editorState: BraftEditor.createEditorState(htmlContent)
        // })
      let url = '/api/blog/detail?id=' + this.props.match.params.id
      this.fetchGet(url)
    }
    // 提交请求
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
          message.success('修改成功',2)
          self.props.history.push('/manage')
        }else{
          message.error('保存失败')
        }
      }).catch(error => console.error(error))
    }
    // 提交函数
    submitContent =() => {
        // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
        const htmlContent = this.state.editorState.toHTML()
        let url='/api/blog/update?id=' + this.props.match.params.id
        let param = {
          title: this.state.title,
          content: htmlContent
        }
        this.fetchPost(url,param)
        console.log('提交')
    }

    saveContent=()=> {
      // 在编辑器获得焦点时按下ctrl+s会执行此方法
      this.getInputValue()
      console.log('保存')
    }

    handleEditorChange = (editorState) => {
        this.setState({ editorState })
    }
    
    componentWillMount(){
      if(!window.localStorage.getItem('userName')){
        message.error('请先登录')
        window.history.back()
      }
    }
    render () {
        const { editorState } = this.state
        return (
            <div style={{margin:'30px'}}>
              <div className="write-title">
                <Input 
                placeholder="标题"
                onChange={event=>this.getInputValue(event)}
                value={this.state.title}
                ></Input>
              </div>
              <div className="write-content">
                <BraftEditor
                    value={editorState}
                    onChange={this.handleEditorChange}
                    onSave={this.saveContent}
                />
              </div>
              <div className="edit-button">
                <Button type='primary' onClick={this.saveContent}>保存</Button>
                <span className="wspan"></span>
                <Button  type='primary' onClick={this.submitContent}>提交</Button>
              </div>
            </div>
        )
 
    }
 
}