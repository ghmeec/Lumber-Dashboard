import React,{useContext,useState} from 'react';
import {Layout, Menu, Icon, Typography,Spin,Button,Row,Col,
  Card,
  Form,Input, Checkbox,
  Alert
} from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import Individuals from './Individuals'
import Company from './Company'
import Marketers from './Marketers'
import Notifications from './Notifications'
import FirebaseProvider, { FirebaseContext } from './utils/firebase'
import "firebase/auth";
import './App.css';

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;


const MainLayout =()=> {
  const firebase=useContext(FirebaseContext)
  const logout = () => {
    firebase.auth().signOut();
  };
  const [collapsed,setCollapsed]=useState(true)

  const toggle = () => {
    setCollapsed(!collapsed)
  };
  const onCollapse = collapsed => {
    setCollapsed(collapsed)
  };

    const contentHeight=window.innerHeight-100
    console.log("content height",contentHeight)
    return (
      <Router>
      <Layout style={{backgroundColor:"red",minHeight:"100vh"}}>
        <Sider 
        onCollapse={onCollapse}
        collapsible collapsed={collapsed}>
        
          <div style={{
            height:60
          }}></div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
            <Link to="/">
              <Icon type="user" />
              <span>Individuals</span></Link>
            </Menu.Item>
            <Menu.Item key="2">
            <Link to="/company">
              <Icon type="team" />
              <span>Company</span></Link>
            </Menu.Item>
            <Menu.Item key="3">
            <Link to="/marketers">
              <Icon type="upload" />
              <span>Registers</span></Link>
            </Menu.Item>
            <Menu.Item key="4">
            <Link to="/notifications">
               <Icon type="notification" />
              <span>Notifications</span>
            </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ 
              background: '#fff'
              // padding:0,
            }}> 
          
      
            <Row style={{width:"100%"}}>
              <Col span={22}> 
              <Icon
              className="trigger"
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={toggle}
             
            />  </Col>
              <Col span={2}> <Button type="primary" onClick={logout}>Logout</Button></Col>
            </Row>
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight:contentHeight
            }}
          >
              <Switch>
                <Route exact path="/">
                  <Title level={4} >Individuals Data</Title>
                  <Individuals/>
                </Route>
                <Route path="/company">
                  <Title level={4} >Companies Data</Title>
                  <Company/>
                </Route>
                <Route path="/marketers">
                  <Marketers/>
                </Route>

                 <Route path="/notifications">
                  <Title level={4} >Send notification</Title>
                  <Notifications/>
                </Route>


                
              </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Lumber Client Management Dashboard ©2020 Created by Lumber</Footer>
        </Layout>
      </Layout>
      </Router>
    );
  
}

const Loader=()=>(
<div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
    <Spin size="large" tip="Redirecting..."/>
</div>
)


const Login=(props)=>{
  const firebase=useContext(FirebaseContext)
  const [loading,setLoading]=useState(false)
  const [loginFailed,setloginFailed]=useState(false)
  const [errorMessage,setErrorMessage]=useState("")
  const login = (email,password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res=>{
      exitLoading()
    })
    .
    catch(error=>{
      console.log("login failed ",error)
      exitLoading()
      setloginFailed(true)
      setErrorMessage(error.message)
    })
  };
  const enterLoading = () => {
    setLoading(true)
  };

  const exitLoading=()=>{
    setLoading(false)
  }

  const onClose = e => {
    console.log(e, 'I was closed.');
  };
  
  const handleSubmit = e => {
    setErrorMessage("")
    setloginFailed(false)
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        enterLoading()
        console.log('Received values of form: ', values.username);
        login(values.username,values.password)
      }
    });
  };
    const { getFieldDecorator } = props.form;
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign:"center",
        height:"100vh",
        backgroundColor:"#ECECEC"
      }}>
      <div style={{maxWidth:500}}>

       {loginFailed&&<Alert
            message="Error"
            description={errorMessage}
            type="error"
            style={{width:500,marginBottom:30}}
            closable
            onClose={onClose}
       
          />
       }

        <Card title="Lumber Management Login" bordered={false}>
        <Form onSubmit={handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                style={{width:300,height:35}}
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                style={{width:300,height:35}}
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)'}} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" 
              onClick={handleSubmit}
              className="login-form-button"
              style={{width:200,height:40}}
              loading={loading}
              >
              Log in
            </Button>
         
          </Form.Item>
        </Form>
        </Card>
      </div>
      </div>
    )
}
const AuthManager = () =>{
  const firebase=useContext(FirebaseContext)
  const [user, initialising, error] = useAuthState(firebase.auth());

  const logout = () => {
    firebase.auth().signOut();
  };

  const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login)
  if (initialising) {
    return (
      <Loader/>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  if (user) {
    return (
      <MainLayout/>
    );
  }

  return (
    <WrappedNormalLoginForm/>
  )

}

const App = () =>{

    return(
      <FirebaseProvider>
        <AuthManager/>
      </FirebaseProvider>
  )


}

export default App;