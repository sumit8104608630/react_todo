import "./index.css"
import Registers from "./Register";
import {useState} from "react"
function Login(){
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");
    const [register,setRegister]=useState(false)
    const[users,setObj]=useState([])
 
        

    const Register=()=>{
        setRegister(true)
       }
       let user={
        username:username,
        password:password
       }
    const handleLogin = () => {
       setObj((prev)=>[...prev,user])
        setPassword("");
        setUsername("");
       
            localStorage.setItem("user",JSON.stringify(users))

      };
   
 

     if(register){
        return<Registers/>
     }
      console.log(users)
    return(<div className="flex  px-5 rounded-lg flex-col w-max justify-center items-center bg-gray-800 ">
        <h1 className="text-white my-2 font-semibold">Register</h1>
        <input type="text" onChange={(event)=>setUsername(event.target.value)} className="mb-2 rounded px-2" value={username} placeholder="username" />
        <input type="password" onChange={(event)=>setPassword(event.target.value)} className="px-2 rounded" value={password} placeholder="password" />
       <div className="flex gap-2"> <button onClick={handleLogin} className="font-bold text-white px-4 py-2 bg-blue-500 rounded-lg my-2">Register</button>
        <button onClick={Register} className="font-bold text-white px-4 py-2 bg-blue-500 rounded-lg my-2">Log in</button>
        </div>
    </div>)
}
export default Login;