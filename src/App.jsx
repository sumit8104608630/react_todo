import "./index.css";
import { Component, createRef } from "react";
//import Login from "./Log-in";
import Register from "./Register";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      log:false,
      id: 0,
      task: [],
      complete_task: [],
      inComplete_task: [],
      delay_task:[],
    };
    this.input_ref = createRef();
    this.time = createRef();
  }

  add_text = (event) => {
    event.preventDefault();
    let input = this.input_ref.current;
    let time = this.time.current;
    let Time = time.value;
    let text = input.value.trim();
    if (text.length < 1) {
      alert(`please enter the task`);
      input.focus();
      return;
    }
    if (Time.length < 1) {
      alert(`please select the time`);
      return;
    }

    let obj = {
      id: this.state.id,
      text: text,
      edit:false,
      time: Time,
      timeEdit:false,
      complete: false,
      delay: false,
    };
    this.setState(
      (prev) => ({
        task: [...prev.task, obj],
        id: prev.id + 1,
      }),
      () => {
        this.updateTask();
      }
    );
    input.value = "";
    time.value = "";
    input.focus();
  };

  checked = (event) => {
    const Id = event.target.id;
    console.log(Id)

    this.setState(
      (prev) => ({
        task: prev.task.map((item) => {
          if (item.id == Id) {
            console.log(item.Id)
            return { ...item, complete: !item.complete };
          }
          return item;
        }),
      }),
      () => {
        this.updateTask();
      }
    );
  };

  componentDidMount() {
    let id = localStorage.getItem("id");
    let tasks = localStorage.getItem("task");
    if (tasks) {
      let task = JSON.parse(tasks);
      this.setState(
        {
          task: task,
          id: id ? parseInt(id, 10) : 0,
        },
        () => {
          this.updateTask();
        }
      );
    }
  setInterval(this.timeExceed,1000)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.task !== this.state.task) {
      this.updateTask();
    }
 
  }

  updateTask = () => {
    this.setState(
      {
        complete_task: this.state.task.filter((item) => {
          if(item.complete){
            return item
          }
        }),
        inComplete_task: this.state.task.filter((item) => !item.complete&&!item.delay),
        delay_task:this.state.task.filter((item)=>{
          if(item.delay){
            return item
          }
        })
      },
      () => {
        localStorage.setItem("task", JSON.stringify(this.state.task));
        localStorage.setItem("id", this.state.id);
      }
    );
  
  };

  remove = (id) => {
    this.setState(
      (prev) => ({
        task: prev.task.filter((_, i) => i !== id),
      }),
      () => {
        this.updateTask();
      }
    );
  };

logOut=()=>{
  this.setState((prev)=>({
    log:prev.log=!this.state.log
  }),()=>{
    console.log(this.state.log)
    if(this.state.log==true){
      return <Register/>
    }
  }
)
}
timeExceed=()=>{
 this.setState((prev)=>({
  task:prev.task.map((item)=>{
     return new Date()-new Date(`${item.time}`)>0?{...item,delay:true}:{...item,delay:false}
  })
 }),()=>{
  this.updateTask()
 })
}


editTask=(event)=>{
  const id = parseInt(event.target.id, 10); 
  let element = document.getElementById("change")
  let time=document.getElementById("time")
console.log(element.value)
  this.setState({
    task:this.state.task.map((item)=>item.id==id?{...item,edit:!item.edit,}:item)
  },()=>{
    this.updateTask();
  })
  let new_text=element.value.trim()
  this.setState((prev)=>({
    task:prev.task.map((item)=>item.id==id?{...item,text:new_text,time:time.value}:item)
  }))
  
}



 render() {
    
    console.log(this.state.task)
    console.log(this.state.delay_task)

    return (
      <>
      <div className=" flex flex-col gap-4 bg-gray-800 px-10 py-5 rounded-lg">
        <div>
          <div className="flex w-full mb-2">
            <input ref={this.input_ref} className="w-full px-2 rounded-l-lg" />
            <button
              onClick={this.add_text}
              className="text-white text-3xl font-semibold rounded-r-lg bg-blue-500 px-4  flex justify-center items-center pb-1">
              +
            </button>
          </div>
          <div>
            <span className="text-xl font-medium text-white">Time</span>
            <input
              ref={this.time}
              className="ml-2 rounded-lg px-2"
              type="datetime-local"
            />
          </div>
        </div>
        <div className="flex flex-col"></div>
        {this.state.inComplete_task.map((item, i) => (
          <div className="w-full mb-2 flex gap-2" key={i}>
            <input id={item.id}  checked={item.complete} onChange={this.checked} type="checkbox" />
            <input
            id="change"
              className="w-full px-2  text-2xl font-semibold rounded-lg"
              disabled={!item.edit}
              defaultValue={item.text}
            />
            <div className="text-lg bg-green-700 font-semibold px-2 rounded-lg">
              <input className="my-2 bg-transparent" type="datetime-local"
              id="time"
               defaultValue={item.time} 
               disabled={!item.edit}
               />
              </div>
            <button id={item.id} onClick={this.editTask}  className="text-lg bg-green-700 font-semibold px-4 rounded-lg">
              {item.edit?"Save": "Edit"}
            </button>
            <button
              onClick={() => this.remove(i)}
              className="bg-red-600 px-2 rounded-lg"
            >
              <img
                className="w-10"
                src="https://static-00.iconduck.com/assets.00/trash-icon-462x512-njvey5nf.png"
                alt="Delete"
              />
            </button>
          </div>
        ))}






        <span className="text-xl font-medium text-white">Completed Task : </span>




        <div>
          {this.state.complete_task.map((item, i) => (
            <div className="w-full mb-2 flex gap-2" key={i}>
              <input
                id={item.id}
                checked={item.complete}
                onChange={this.checked}
                type="checkbox"
              />
              <input
                className="w-full px-2 text-lg font-semibold rounded-lg line-through"
                value={item.text}
                readOnly/>
              <div className="text-lg bg-green-700 font-semibold px-2 rounded-lg">{item.time}</div>
             
              <button
                onClick={() => this.remove(i)}
                className="bg-red-600 px-2 rounded-lg">
                <img
                  className="w-4"
                  src="https://static-00.iconduck.com/assets.00/trash-icon-462x512-njvey5nf.png"
                  alt="Delete"
                />
              </button>
            </div>
          ))}
        </div>
        <span className="text-xl font-medium text-white">Delay Task : </span>
        <div> {this.state.delay_task.map((item, i) => (
          <div className="w-full mb-2 flex gap-2" key={i}>
            <input id={item.id}  checked={item.complete} onChange={this.checked} type="checkbox" />
            <input
            id="change"
              className="w-full px-2  text-2xl font-semibold rounded-lg"
              disabled={!item.edit}
              defaultValue={item.text}
            />
            <div className="text-lg bg-green-700 font-semibold px-2 rounded-lg">
            <input className="my-2 bg-transparent" type="datetime-local"
              id="time"
               defaultValue={item.time} 
               disabled={!item.edit}
               />
              </div>
            <button id={item.id} onClick={this.editTask}  className="text-lg bg-green-700 font-semibold px-4 rounded-lg">
              {item.edit?"Save": "Edit"}
            </button>
            <button
              onClick={() => this.remove(i)}
              className="bg-red-600 px-2 rounded-lg"
            >
              <img
                className="w-10"
                src="https://static-00.iconduck.com/assets.00/trash-icon-462x512-njvey5nf.png"
                alt="Delete"
              />
            </button>
          </div>
        ))}</div>
        <div ><button onClick={this.logOut} className="font-bold text-white px-4 py-2 bg-blue-500 rounded-lg my-2">Log-Out</button></div>

      </div>
</>
    );
  }
}
export default App;
