const socket = io('http://localhost:8000')

const name = prompt("Enter Your Name to Join the Chat : ")
socket.emit("new-user-joined",name)


const messageContainer = document.getElementById("message-container")
function appendMessage(message,pos){
    const msg = document.createElement("div")
    msg.innerHTML = message
    msg.classList.add("alert")
    if(pos=='left'){
        msg.classList.add("left")
        msg.classList.add("alert-primary")
    }
    else{
        msg.classList.add("right")
        msg.classList.add("alert-success")
    }

    messageContainer.appendChild(msg)
}

socket.on("user-joined",(name)=>{
    appendMessage(`${name} Joined the Chat`,"left")
})
socket.on("user-left",(name)=>{
    appendMessage(`${name} Left the Chat`,"left")
})
socket.on("receive",(data)=>{
    appendMessage(`${data.name} : ${data.message}`,"left")
})

function sendMessage(){
    const msg = document.getElementById("msg")
    socket.emit("send",msg.value)
    appendMessage(`You: ${msg.value}`,"right")
    msg.value=""
}