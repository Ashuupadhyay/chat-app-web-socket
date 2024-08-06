const express=require("express");
const app=express();
const http=require("http").createServer(app);
const io=require("socket.io")(http);
app.use(express.static(__dirname+"/public"));
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});


//conection all sockets(clients) in circuit emit



const joinusers={};

io.on("connection",(socket)=>{
    socket.on("conectuser",(user)=>{
        joinusers[socket.id]=user;
        socket.broadcast.emit("conectuser",user)});

    
    //listen data by sendmessage event
    socket.on("sendmessage",(data)=>{
    socket.broadcast.emit("recievemessage",{rmessage:data, cname:joinusers[socket.id]});
      });
    //disconnect
    socket.on("disconnect",()=>{
    

        socket.broadcast.emit("disuser",joinusers[socket.id]);
    })

    
});


http.listen(3008,()=>{
    console.log("run");
})
