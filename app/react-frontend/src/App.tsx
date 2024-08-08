import Dashboard from './pages/Dashboard'
import './index.css'
// import { Drawer } from '@mui/material'
import { useState } from 'react'
import Button from '@mui/material/Button';
import {Input} from '@mui/material'
import { servercalls } from './apicalls/apicalls'
import { Routes, Route, Link, useNavigate} from "react-router-dom"
import AppBar from '@mui/material/AppBar';


function App() {


  let userProps: any = {"placeholder": "Username", "variant": "outlined", "disabled": false}
  let passProps: any = {"placeholder": "Password", "type": "password", "disabled": false}
  // const [open, setOpen] = useState(false)
  const [signupres, setRes] = useState<string>("")
  const navigate = useNavigate()


  async function login (username: string, password: string)
  {
    let response: string = await servercalls.login(password, username)
    if (response == "Good to go.")
    {
      localStorage.setItem('currentuser', username)
      navigate("/dashboard")
    } else{
      navigate("/loginfix")
    }
    
  }

  const logout = async (username: any) =>
  {
    let response: string = await servercalls.logout(username)
    console.log(response)
    localStorage.removeItem('currentuser')
    navigate ("/")
  }

  const signup = async (username: string, password: string) =>
  {
    let response = await servercalls.signup(password, username)
    passProps.disabled = true
    userProps.disabled = true
    if (response == username)
    {
      setRes((response + "entered."))
      navigate ("/signupgood")
    }
    
  }


  const LoginTitle = (message: any) =>
  {

    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")

    return(
      <div id="homePage">
        <div id='loginModal'>
            <div style={{"display":"flex", "justifyContent": "center"}}>
              <h1 style={{"marginBottom": "1px", "marginTop": "10px"}}>{message.invite}</h1>
            </div>
            <div style={{"height": "90px", "width":"300px"}}>
                <p style={{"marginTop": "5px"}}>{message.message}</p>
            </div>
              <Input style={{"marginBottom": "20px"}} inputProps={userProps} value={username} onChange={(e) => {
            setUsername((e.target.value))}}/>
              <Input style={{"marginBottom": "10px"}} inputProps={passProps} value={password} onChange={(e) => {
            setPassword(e.target.value)}}/>
            <Button onClick={()=>{login(username, password)}} style={{"paddingTop":"0px"}}>Submit Info</Button>
            {/* <Button onClick={()=>{toggleDrawer(true)}} style={{"paddingTop":"0px"}}>Option Menu</Button> */}
            
        </div>
      </div>
  )}

  const SignupTitle = (message: any) =>
    {
  
      const [password, setPassword] = useState("")
      const [username, setUsername] = useState("")
  
      return(
        <div id="homePage">
          <div id='loginModal'>
              <div style={{"display":"flex", "justifyContent": "center"}}>
                <h1 style={{"marginBottom": "1px", "marginTop": "10px"}}>{message.invite}</h1>
              </div>
              <div style={{"height": "90px", "width":"300px"}}>
                  <p style={{"marginTop": "5px"}}>{message.message}</p>
              </div>
                <Input style={{"marginBottom": "20px"}} inputProps={userProps} value={username} onChange={(e) => {
              setUsername((e.target.value))}}/>
                <Input style={{"marginBottom": "10px"}} inputProps={passProps} value={password} onChange={(e) => {
              setPassword(e.target.value)}}/>
              <Button onClick={()=>{signup(username, password)}} style={{"paddingTop":"0px"}}>Submit Info</Button>
              {/* <Button onClick={()=>{toggleDrawer(true)}} style={{"paddingTop":"0px"}}>Option Menu</Button> */}
          </div>
        </div>
    )}

  let loginTitlemessages = 
  {
    "message1" : "Please enter your username and password.",
    "message2" : "The info provided does not match our records. Please review your info and try again.",
    "message3" : "Please enter a unique username and password for your new account.",
    "message4" : "Both the username and password are required.",
    "message5" : "Your username and password have been successfully entered. Please log in."
  }

  function HomepageTitle (props: any)
  {
    let currentuser = localStorage.getItem('currentuser')
    if(currentuser != null)
    {
      return <Dashboard/>
    }

    return(
      <div id="homePage">
          <div>
              <h1 style={{"color": "rgb(126, 49, 13)", "textShadow":"2px 2px antiquewhite"}}>Welcome to the Bar Register!</h1>
              <Button onClick={()=>{props.toggleD(true)}}><p style={{"color":"antiquewhite", "textShadow":"2px 2px rgb(126, 49, 13)"}}>Use the Nav Bar above to peruse the site!</p></Button>
          </div>
      </div>
      
  )}

  function DrawerOptsHome ()
  {
    return(
      <div style={{"display":"flex", "justifyContent": "center"}}>
        <Link to="/"><p style={pstyles}>Home</p></Link>
        <Link to="/login"><p style={pstyles}>Log In</p></Link>
        <Link to="/signup"><p style={pstyles} >Sign Up</p></Link>
        {/* <p style={pstyles} onClick={()=>toggleDrawer(false)}>Close Option Menu to use screen below.</p> */}
      </div>
  )}

  function DashboardHome ()
  {
    return(
      <div style={{"display":"flex", "justifyContent": "center"}}>
        <p style={pstyles} onClick={()=>logout(localStorage.getItem('currentuser'))}>Log Out</p>
      </div>
  )}

  const DrawerProps = () =>
  {
    let currentuser = localStorage.getItem('currentuser')
    if(currentuser != null)
    {
      return <DashboardHome/>
    } else
    {
      return <DrawerOptsHome/>
    }
  }


  let pstyles: Object = {
  "marginLeft": "20px",
  "marginRight": "20px",
  "color": "rgb(126, 49, 13)",
  "textShadow":"1px 1px black"
  }

  // function toggleDrawer(newOpen:boolean)
  // {
  //     setOpen(newOpen)
  // }

  return (
    <>
     
      {/* <<Drawer transitionDuration={550} anchor='top' hideBackdrop={true} open={open}>>
        <DrawerProps/>
      </Drawer> */}
      <AppBar component='nav'>
        <DrawerProps/>
      </AppBar>
        <Routes>
          <Route path={"/"} element={<HomepageTitle />}/>
          <Route path={"/login"} element={<LoginTitle message={loginTitlemessages.message1} invite={"Log In"}/>}/>
          <Route path={"/loginfix"} element={<LoginTitle message={loginTitlemessages.message2} invite={"Log In"}/>}/>
          <Route path={"/signup"} element={<SignupTitle message={loginTitlemessages.message3} invite={"Sign Up"}/>}/>
          <Route path={"/dashboard"} element={<Dashboard />}/>
          <Route path={"/signupgood"} element={<LoginTitle message={signupres.concat(" Click Option Menu to log in.")} invite={"Sign Up Done"}/>}/>
        </Routes>
    </>
  )
}

export default App
