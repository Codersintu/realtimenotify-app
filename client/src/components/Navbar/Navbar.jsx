import React, { useEffect, useState } from 'react'
import { Email, Notifications, Settings } from '@mui/icons-material'
import './navbar.css'
import { Socket } from 'socket.io-client';
export function Navbar({socket}) {
    const [notifications,setNotification]=useState([]);
    const [open,setOpen]=useState(false);
    useEffect(()=>{
        socket.on("getNotification",(data)=>{
            setNotification((prev)=>[...prev,data]);
        });
    },[socket])
    console.log(notifications)

    const displayNotification=({senderName,type})=>{
        let action;

        if (type===1) {
            action="liked"
        }else if(type===2){
            action="commented"
        }else{
            action="shared"
        }
        return (
            <span className='notificationss'>{`${senderName} ${action} your post`}</span>
        )
    }

    return (
       <div className="navbar">
        <div className="logo">SALU</div>
        <div className="Icon">
            <div className="notify" onClick={()=>setOpen(!open)}>
            <Notifications className='eco'/>
            <div className="notcount">{notifications.length}</div>
            </div>
            <div className="notify" onClick={()=>setOpen(!open)}>
            <Email className='eco'/>
            </div>
            <div className="notify" onClick={()=>setOpen(!open)}>
            <Settings className='eco'/>
            </div>
            {open && (
               <div className="ghanti">
               {notifications.map((n)=>displayNotification(n))}
           </div>
            )};
           
            
        </div>
       </div>
    )
}
