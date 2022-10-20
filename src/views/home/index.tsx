import React, { Component } from 'react'
import './index.css'
import { getGihubCoder } from '../../api'
// import Text from './test'
type Props = {}

type State = {
    info: any,
    date: any;
    seatchTitle: any,
    isDark: boolean
}

export default class index extends Component<Props, State> {
    state: State = {
        date: new Date(),
        seatchTitle: '',
        info: {},
        isDark: false
    }


    getFullTime = () => {
        let date = this.state.info.created_at ? new Date(this.state.info.created_at) : new Date()
        let year = date.getFullYear();
        let month = Number(date.getMonth() + 1);
        let day = date.getDate()
        return year + '-' + month + '-' + day
    }

    handlerChange = (event: any) => {

        const { value } = event.target;

        this.setState({
            seatchTitle: value
        })

    }

    handlerSend = () => {

        if (this.state.seatchTitle.trim()) {


            getGihubCoder(this.state.seatchTitle).then((res) => {
                console.log(res, 'res')
                this.setState({
                    info: res.data
                })
            })

        } else {
            alert('请输入')
        }

    }

    open = () => {

        if (this.state.info.html_url) {
            window.open(this.state.info.html_url) //可以打开新窗口，也可下载文件
        }
    }

    openblog = () => {
        if (this.state.info.blog) {
            window.open(this.state.info.blog)
        }
    }

    hanelrDown = (e: any)=>{
        if(e.key === 'Enter'){
            this.handlerSend()
        }
    }

    changeTheme = () => {
        let { isDark } = this.state;
        (document.body.style as any).setProperty('--themeColor', !isDark ? '#141D2F' : '#fff');
        (document.body.style as any).setProperty('--bgColor', !isDark ? '#1E2A47' : '#fff');
        (document.body.style as any).setProperty('--user', !isDark ? '#141D2F' : '#f2f2f2');
        (document.body.style as any).setProperty('--customColor', !isDark ? '#fff' : '#000');


        this.setState({
            isDark: !isDark
        })
    }

    render() {
        let { isDark } = this.state
        return (
            <div className='wrap'>
                <div className="caontainer">
                    <div className="top">
                        <span className='name  custom-font-color'>Github User Search</span>
                        <span className='dark' onClick={this.changeTheme}>{isDark ? 'Dark' : "LIGHT"}</span>
                        {/* <Text/> */}
                    </div>
                    <div className="search">
                        <div className="search-inner">
                            <img src="https://emmyz.github.io/github-user-search-app/assets/icon-search.svg" alt="" />



                            <input  onKeyDown={this.hanelrDown} onChange={this.handlerChange} placeholder='Search Github UserName...' className='search-input' type="text" />
                            <button onClick={this.handlerSend} className='search-btn'>Search</button>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="left-img">
                            <img className='avatar' src={this.state.info.avatar_url ?? "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.doubanio.com%2Fview%2Fphoto%2Fsqs%2Fpublic%2Fp2677102402.jpg&refer=http%3A%2F%2Fimg2.doubanio.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1668352374&t=c2e58e678a2cd7e41543240ab6c5be2a"} alt="" />
                        </div>
                        <div className="right-content">
                            <div className="first">
                                <div className="name-date">
                                    <div className="name-date-title" style={{ color: !isDark ? '#2B3442' : '#fff' }}>
                                        {this.state.info.name ? this.state.info.name : 'Not Available Yet'}
                                    </div>
                                    <div className="name-date-time">
                                        {'Joined ' + this.getFullTime()}
                                    </div>
                                </div>
                            </div>
                            <div className="second" onClick={this.open}>
                                {this.state.info.login ? '@' + this.state.info.login : '🫣'}
                            </div>
                            <div className="last">
                                {this.state.info.bio ? this.state.info.bio : 'This profile has no bio'}
                            </div>

                            <div className="user-state">
                                <div className="item">
                                    <div className="words">
                                        Repos
                                    </div>
                                    <div style={{ color: !isDark ? '#000' : '#fff' }}>
                                        {this.state.info.public_repos ?? 0}
                                    </div>
                                </div>

                                <div className="item">
                                    <div className="words">
                                        Followers
                                    </div>
                                    <div style={{ color: !isDark ? '#000' : '#fff' }}>
                                        {this.state.info.followers ?? 0}
                                    </div>
                                </div>


                                <div className="item">
                                    <div className="words">
                                        Following
                                    </div>
                                    <div style={{ color: !isDark ? '#000' : '#fff' }}>
                                        {this.state.info.Following ?? 0}
                                    </div>
                                </div>
                            </div>

                            <div className="outbox custom-font-color">
                                <div className="innerbox">
                                    <i className='iconfont icon-zuobiao'></i>
                                    <span>{this.state.info.location ?? 'not Available'}</span>
                                </div>
                                <div className="innerbox">
                                    <i className='iconfont icon-twitter'></i>
                                    <span>
                                        {this.state.info.twitter_username ?? 'not Available'}
                                    </span>
                                </div>
                                <div className="innerbox">
                                    <i className='iconfont icon-dalou'></i>
                                    <span>{this.state.info.company ?? 'not Available'}</span>
                                </div>
                                <div className="innerbox" onClick={this.openblog}>
                                    <i className='iconfont icon-lianjie'></i>
                                    <span>
                                        {this.state.info.blog ?? 'Not Available'}
                                    </span>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>


        )
    }
}