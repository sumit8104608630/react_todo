import  { Component } from "react";
import "./index.css";
import App from "./App";
import  Login from "./Log-in";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loged: false,
      regis: false
    };
  }

  handleLogin = () => {
    const { username, password } = this.state;
    if (username === "") {
      alert("Please enter your username");
      return;
    }
    if (password === "") {
      alert("Please enter your password");
      return;
    }
    console.log("login");
    const users = JSON.parse(localStorage.getItem("user"));
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === username && users[i].password === password) {
        console.log(true);
        this.setState({ loged: true });
        return;
      }
    }
    alert("Invalid username or password");
    this.setState({ username: "", password: "" });

  };

  handleRegister = () => {
    this.setState((prevState) => ({
      regis: !prevState.regis
    }));
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { username, password, loged, regis } = this.state;

    if (loged) {
      return <App />;
    }

    if (regis) {
      return <Login />;
    }

    return (
      <div className="flex px-5 rounded-lg flex-col w-max justify-center items-center bg-gray-800 ">
        <h1 className="text-white my-2 font-semibold">Log in</h1>
        <input
          type="text"
          name="username"
          onChange={this.handleChange}
          className="mb-2 rounded px-2"
          value={username}
          placeholder="username"
        />
        <input
          type="password"
          name="password"
          onChange={this.handleChange}
          className="px-2 rounded"
          value={password}
          placeholder="password"
        />
        <div className="flex gap-2">
          <button
            onClick={this.handleLogin}
            className="font-bold text-white px-4 py-2 bg-blue-500 rounded-lg my-2"
          >
            Log in
          </button>

          <button
            onClick={this.handleRegister}
            className="font-bold text-white px-4 py-2 bg-blue-500 rounded-lg my-2"
          >
            Register
          </button>
        </div>
      </div>
    );
  }
}

export default Register;
