import React, { Component, Fragment } from 'react'
import './App.scss'
import Home from './components/Home/Home'
import HeaderLayout from './components/HeaderLayout'
import Write from './components/Post/Write/Write'
import { Route, Switch, Link, withRouter, Redirect } from 'react-router-dom'
import NormalLoginForm from './components/Login/Login'
import { Modal, Layout, Menu, Icon, DatePicker } from 'antd'
import PostList from './components/Post/PostList/PostList'
import NotFound from './components/NotFound'
import Settings from './components/Settings'
import SignUp from './components/Login/SignUp'
import Unsubscribe from './components/Login/Unsubscribe'
import Review from './components/Post/Write/Review'
import Summary from './components/Post/Summary/Summary'

const { Sider, Content, Footer } = Layout
const { SubMenu } = Menu
const { MonthPicker } = DatePicker;

const LoginContext = React.createContext({
  setIsLogined: null,
});

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
      visible: false,
      isLogined: localStorage.getItem('token') ? true : false,
    }
    // this.onChange = this.onChange.bind(this)
    this.showModal = this.showModal.bind(this)
    this.handleOk = this.handleOk.bind(this)
  }

  setIsLogined = (isLogined) => {
    this.setState({ isLogined })
  }

  onCollapse = (collapsed) => {
    console.log(collapsed)
    this.setState({ collapsed })
  }

  pickedMonth = (date, dateString) => {
    const dateStr = dateString.replace(/-/g, '');
    const url = '/posts/' + dateStr.substring( 0, 4 ) + 
                '/' + dateStr.substring( 4, 6 );
    console.log(url);
    this.props.history.push(url);
  }

  pickedDate = (date, dateString) => {
    dateString = Number(dateString.replace(/-/g, ''));
    
    this.props.history.push({
      pathname: '/post/write',
      state: {date: dateString},
    });
  }
  // onChange(event)  {
  //   this.setState({      
  //    })
  // }
  

  showModal = () => {
    this.setState({
      visible: true,
    });     
  };
  
  handleOk = e => {
    console.log(e);
    this.props.history.push('/')
    this.setState({
      visible: false,
    });
  };
  

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };


  render () {
    return (
      <LoginContext.Provider value={{
        setIsLogined: this.setIsLogined,
      }}>
        <Fragment>
        {/* Sider, Header, Footer는 모든 화면에 보여진다.  */}
          <Layout>
            <Sider
              breakpoint="lg"
              collapsedWidth="0"
              onBreakpoint={broken => {
                console.log(broken)
              }}
              onCollapse={(collapsed, type) => {
                console.log(collapsed, type)
              }}
              className="one-sidebar"
            >
            <div className="one-menu-logo flex flex-center"  >
              <Link to="/">
                <span>일상 요약</span>
              </Link>
            </div>
              <Menu theme="light" mode="inline" className="one-nav">
                <Menu.Item key="1">
                  <Link to="/post/write">
                    <Icon type="form" />
                    <span className="nav-text">글쓰기</span>
                  </Link>
                </Menu.Item>
                <SubMenu
                  key="Sub1"
                  title={
                    <span>
                      <Icon type="read" />
                      <span>본문</span>
                    </span>
                  }
                >
                  <Menu.Item key="2">
                      <MonthPicker
                        onChange={this.pickedMonth}
                        placeholder="Select month" />
                  <span className="nav-text"></span>
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  key="Sub2"
                  title={
                    <span>
                      <Icon type="edit" />
                      <span>요약</span>
                    </span>
                  }
                >
                  <Menu.Item key="3">
                    <Link to="/summary">
                      <DatePicker
                        onChange={this.pickedDate}
                      />
                    </Link>
                  <span className="nav-text"></span>
                  </Menu.Item>
                </SubMenu>
                <Menu.Item key="4">
                  <Link to="/setting">
                    <Icon type="setting" />
                    <span className="nav-text">설정</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="5"
                  className="one-logout"
                  onClick={this.showModal}
                  >
                    <Icon type="logout" />
                    <span className="nav-text">로그아웃</span>
                    <Modal
                      title="Basic Modal"
                      visible={this.state.visible}
                      onOk={this.handleOk}
                      onCancel={this.handleCancel}
                    >
                      로그아웃 하시겠습니까?
                    </Modal>   {/* 로그아웃 클릭시 로그인 버튼으로 전환 및 연동 부분 추가 */}
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout className="one-main">
              <HeaderLayout />
              <Content className="Content-section-layout one-content">
                {
                  this.state.isLogined ? (
                    <Switch>
                      <Route exact path="/" component={Home} />
                      <Route path="/posts/:year/:month/:day" component={PostList} />
                      <Route path="/posts/:year/:month" component={PostList} />
                      <Route path="/posts/:year" component={PostList} />
                      <Route path="/posts" component={PostList} />
                      <Route path="/post/write" component={Write} />
                      <Route path="/post/:view" component={Review} />
                      <Route path="/summary/:year/:month/:day" component={Summary} />
                      <Route path="/summary" component={Summary} />
                      <Route path="/setting" component={Settings} />
                      <Route path="/signup" component={SignUp} />
                      <Route path="/unsubscribe" component={Unsubscribe} />
                      <Route component={NotFound} />
                    </Switch>
                  ) : (
                    <LoginContext.Consumer>
                      {
                        ({setIsLogined}) => <NormalLoginForm setIsLogined={setIsLogined} />
                      }
                    </LoginContext.Consumer>
                  )
                  }
                }
              </Content>
              <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
          </Layout>
        </Fragment>
      </LoginContext.Provider>
    )          
  };
};
export default withRouter(App);