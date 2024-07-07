import "./index.css"
import App from "./App"
import {useState} from "react"
//import Login from "./Log-in";


function Register(){
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");
    const[loged,setLoged]=useState(   )
   // const[regis,setRegis]=useState(false)
    
    if(loged){
        return<App/>
        
    }

const handleLogin=()=>{
   if(username==""){
    alert("Please enter your username")
    return
   }
    if(password==""){
        alert("Please enter your password")
        return
    }
    console.log("login")
    const users = JSON.parse(localStorage.getItem("user"));
    
    for(let i=0;i<users.length;i++){
    
       
        if ( users[i].username === username && users[i].password === password) {
          console.log(true)
         setLoged(true);
         
        }
    }
   
}

const handelRegister=()=>{
 //  setRegis(true)
   
}
// if(regis){
//     return <Login/>
// }


    return <div className="flex  px-5 rounded-lg flex-col w-max justify-center items-center bg-gray-800 ">
    <h1 className="text-white my-2 font-semibold">Log in</h1>
    <input type="text" onChange={(event)=>setUsername(event.target.value)} className="mb-2 rounded px-2" value={username} placeholder="username" />
    <input type="password" onChange={(event)=>setPassword(event.target.value)} className="px-2 rounded" value={password} placeholder="password" />
   <div className="flex gap-2"> <button onClick={handleLogin} className="font-bold text-white px-4 py-2 bg-blue-500 rounded-lg my-2">Log in</button>
   
     <button onClick={handelRegister} className="font-bold text-white px-4 py-2 bg-blue-500 rounded-lg my-2">Register</button></div>
    </div>
}
export default Register;