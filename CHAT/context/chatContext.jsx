import { Children, createContext, useContext,useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const ChatContext = createContext();

export const ChatProvider = ({children})=>{
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [unseenMessages, setUnseenMessages] = useState({});

    const {socket,axios}= useContext(AuthContext)

    // function to get all users  for sidebar 
    const getUsers = async()=>{
        try {
            const {data} = await axios.get("/api/messages/users");
            if(data.success){
                setUsers(data.users)
                setUnseenMessages(data.unseenMessages)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    // function get messages for selected user
    const getMessages = async(userId)=>{
        try {
            const {data} = await axios.get(`/api/messages/${userId}`);
            if(data.success)
            {
                setMessages(data.messages)
            }
            
        } catch (error) {
            toast.error(error.message)
        }
    }
// function to send  messages for selected user
    const sendMessage = async(messageData)=>{
        try {
            const {data} = await axios.post(`/api/messages/send/${selectedUser._id}`,messageData);
            
            if(data.success)
            {
                setMessages((prevMessages)=>[...prevMessages, data.message])
            }else{
                toast.error(data.message)
              console.log("this is the place")
            }
            
        } catch (error) {
            toast.error(error.message)
            console.log("this is the place 2")
        }
    }

    // // function to subscribe the messages for selected user
    // const subscribeToMessages = async()=>{
    //     if(!socket)return;
    //     socket.on("newMessage", (newMessages)=>{
    //         if(selectedUser && newMessages.senderId === selectedUser._id)
    //         {
    //             newMessages.seen = true; 
    //             setMessages((prevMessages)=>[...prevMessages,newMessages]);
    //             axios.put(`/api/messages/mark/${newMessages._id}`);
    //         }else{
    //             setUnseenMessages((prevUnseenMessages)=>({...prevUnseenMessages,[newMessages.senderId]:prevUnseenMessages[newMessages.senderId]? prevUnseenMessages[newMessages.senderId]+1 : 1}))
    //         }
    //     })
    // }

    
    // // function to unsubscribe the messages for selected user
    // const unsubscribeFromMessages = async()=>{
    //     if(socket) socket.off("newMessages");
        
    //     useEffect(()=>{
    //         subscribeToMessages();
    //         return(()=>unsubscribeFromMessages)
    //     },[selectedUser,socket])
    // }

    

    // ...existing code...

useEffect(() => {
    if (!socket) return;
    const handleNewMessage = (newMessage) => {
        if (selectedUser && newMessage.senderId === selectedUser._id) {
            newMessage.seen = true;
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            axios.put(`/api/messages/mark/${newMessage._id}`);
        } else {
            setUnseenMessages((prevUnseenMessages) => ({
                ...prevUnseenMessages,
                [newMessage.senderId]: prevUnseenMessages[newMessage.senderId]
                    ? prevUnseenMessages[newMessage.senderId] + 1
                    : 1,
            }));
        }
    };
    socket.on("newMessage", handleNewMessage);
    return () => {
        socket.off("newMessage", handleNewMessage);
    };
}, [selectedUser, socket]);

// ...existing code...





    const value = {
        messages,users,selectedUser,getUsers,setMessages,sendMessage,setSelectedUser,
        unseenMessages,setUnseenMessages,getMessages
    }
    return(<ChatContext.Provider value={value}>
        {children}
    </ChatContext.Provider>
)}