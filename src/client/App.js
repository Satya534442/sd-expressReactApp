import React, { Component } from "react";
import "./app.css";
import Navbar from './Navbar.js';
import UserForm from './UserForm.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { username: null };
  }

  // componentDidMount() {
  //   fetch("/api/getUsername")
  //     .then(res => res.json())
  //     .then(user => this.setState({ username: user.username }));
  // }

  render() {
    return (
      <div>
        <Navbar />
        <div>
          <UserForm />
        </div>
      </div>
    );
  }
}
