import { Server, Socket } from "socket.io";

const io = new Server({ 
  cors:{
    origin:"http://localhost:5173"
  }
 });

 let onlineUsers=[];
 const addNewUser=(username,socketId)=>{
  !onlineUsers.some((user)=>user.username === username) &&
  onlineUsers.push({username,socketId});
 };

 const removeUser=(socketId)=>{
  onlineUsers=onlineUsers.filter((user)=> user.socketId != socketId);
 };
 const getUser=(username)=>{
  return onlineUsers.find((user)=>user.username === username);
 };

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  socket.on("newUser",(username)=>{
    addNewUser(username,socket.id)
    console.log(`New user added: ${username}`);
  })
   
  socket.on("sendNotification",({senderName,receiverName,type})=>{
    const receiver=getUser(receiverName);
    if (receiver) {
      // If receiver exists, send the notification
      io.to(receiver.socketId).emit("getNotification", {
        senderName,
        type,
      });
      console.log(`Notification sent from ${senderName} to ${receiverName}`);
    } else {
      // If receiver doesn't exist, log an error and send a response back to the sender
      console.error(`Receiver ${receiverName} not found`);
      socket.emit("notificationError", {
        message: `Receiver ${receiverName} is not online or does not exist.`,
      });
    }
  });
  

  // socket.on("sendText", ({ senderName, receiverName, text }) => {
  //   const receiver = getUser(receiverName);
  //   io.to(receiver.socketId).emit("getText", {
  //     senderName,
  //     text,
  //   });
  // });
  socket.on("disconnect",()=>{
    removeUser(socket.id);
  })
});

io.listen( 5000);