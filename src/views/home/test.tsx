

import React from "react";




export default class Index extends React.Component  {
    //只能有一个根节点
    // class -> className
    // state管理页面页面所有的状态
    // react 三大核心属性  state  props  refs
    state = {
        isShow:false,
        message:'wode diyige  react xiangmu ',
        repos:[
            'fllowers',
            'flowing',
            'report'
        ],
        info:{
            
        }
    }
    handlercHANG = ()=>{
        this.setState({
            isShow:!this.state.isShow
        })
    }

    render() {
        return (
            <div onClick={this.handlercHANG}>
                {/* {this.state.isShow ? 'REATC' : 'VUE'} {this.state.message} */}
                {this.state.repos.map((item)=>{
                    return <div>{item}</div>
                })}
            </div>
        )
         
        
    }

}