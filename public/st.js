// user name get
const clientname=prompt("enter name");

    

    
//call io function
const socket=io();

const form=document.getElementById("form");
const inputtext=document.getElementById("inputdata");
//const buton=document.getElementById("sbuttn");
const maincontain=document.getElementById("rootdiv");
//conected name
socket.emit("conectuser",clientname);

// user name to join
function joindisconnect(clname,una){
    const nameuser=document.createElement("div");
    const userdiv=maincontain.appendChild(nameuser);
    userdiv.classList.add("connecteduser");
    userdiv.innerHTML=`${clname} ${una}`;
    
}
socket.on("conectuser",(user)=>{
   joindisconnect(user, "joined");
   
});








//define sendata function 
function senddata(inputtext){
    const sendmsgdiv=document.createElement("div");
    const chilsenddiv=maincontain.appendChild(sendmsgdiv);
    chilsenddiv.classList.add("send");
    chilsenddiv.innerHTML=inputtext.value;
    
    
    
}
//send message by client 1 to client 2
form.addEventListener("submit",(e)=>{
    e.preventDefault;
    //emit (send ) data by event sendmessage
    socket.emit("sendmessage",inputtext.value);
    senddata(inputtext);
    inputtext.value=" ";
});

//define recievedata function
function recievedata(dataobj){
    const recievediv=document.createElement("div");
    const recievechild=maincontain.appendChild(recievediv);
    recievechild.classList.add("recieve");
    recievechild.innerHTML=dataobj.rmessage;
        
    // enter username

    const username=document.createElement("div");
    const  user1=recievechild.appendChild(username);
    user1.classList.add("name");
    user1.innerHTML=`message sent by ${dataobj.cname}`;
}
//recieve message

socket.on("recievemessage",(dataobj)=>{
    recievedata(dataobj);
});




//disconnect
socket.on("disuser",(disdata)=>{
    joindisconnect(disdata,"left");
});

