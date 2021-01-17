import React from "react";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="one-column-grid">
        <form onSubmit={(e) => this.props.handleLoginSubmit(e, this.state)}>
          <h1> Welcome to QPQ </h1>
          <h2>Please log in below:</h2>
          <div className="profile-form-row-center">
            <label name="email">Email</label>
            <input
              onChange={this.handleChange}
              type="text"
              value={this.state.email}
              name="email"
              placeholder="Email"
            ></input>
          </div>

          <div className="profile-form-row-center">
            <label name="password">Password</label>
            <input
              onChange={this.handleChange}
              type="password"
              value={this.state.password}
              name="password"
              placeholder="Password"
            ></input>
          </div>

          <br></br>
          <button>Submit</button>
        </form>
        <div>
          <br></br>
          <Link to="/signup" className="signup-link">
            New here? Click here to create an account!
          </Link>
        </div>
        <div>
          <p>
            <b>
              Created with{" "}
              <img
                alt="cool-cry-icon"
                src="https://pbs.twimg.com/media/EF-36wfWwAEtTNY.jpg"
                width="5%"
              />{" "}
              by Noa, Nathan, Akiko & Brad
            </b>
          </p>
          <p>
            For checking QPQ without signing up:
            <br /> Email: hello@mail.com
            <br /> Password: 123
          </p>
        </div>
      </div>
    );
  }
}
