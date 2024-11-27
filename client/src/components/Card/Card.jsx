import { Comment, Favorite, FavoriteBorder, HeartBrokenOutlined, Info, Share } from '@mui/icons-material'
import React, { useState } from 'react'
import './card.css'

export function Card({post,socket,user}) {
    const [liked,setLiked]=useState();
    
    const handlelike=(type)=>{
       type === 1 && setLiked(true);
        socket.emit("sendNotification",{
            senderName: user,
            receiverName: post.username,
            type,
        });
    };
    return (
        <div className="card">
        <div className="info">
             <img src={post.userImg} className='userimg' alt="" />
             <span>{post.fullname}</span>
        </div>
        <img src={post.postImg} className='postimg' alt="" />
        <div className="interaction">
            {liked ? (
               <Favorite/>
            ):(
            <FavoriteBorder className='cardIcon' onClick={()=>handlelike(1)}/>

            )}
            <Comment className='cardIcon' onClick={()=>handlelike(2)} />
            <Share className='cardIcon' onClick={()=>handlelike(3)}/>
            <Info className='cardIcon Infoicon'/>
        
        </div>
        </div>
    )
}
