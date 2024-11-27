import { useEffect, useState } from 'react'
import './App.css'
import {Navbar} from './components/Navbar/Navbar'
import { Card } from './components/Card/Card';
import {posts} from '../data'
import { io } from "socket.io-client";

function App() {
  const [username,setUsername]=useState("");
  const [user,setUser]=useState("")
  const [socket,setSocket] = useState(null)
  console.log(user)
  useEffect(()=>{
    setSocket(io("http://localhost:5000"));
  },[]);

  useEffect(()=>{
    socket?.emit("newUser",user)
  },[socket,user]);

  return (
    <div className="container">
      {user ? (<>
       <Navbar socket={socket}/>
       {posts.map((post)=>(
         <Card post={post} key={post.id} socket={socket} user={user}/>
       ))}
       
       <span className='username'>{user}</span>
      </>):(
      <div className="login">
        <input className='input' type="text" placeholder='username' onChange={(e)=>setUsername(e.target.value)} />
        <button className='btn' onClick={()=>setUser(username)}>Login</button>
      </div>
      )}
    </div>
  )
}

export default App
