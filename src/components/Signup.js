import React from "react";
import { Link } from "react-router-dom";

class Signup extends React.Component {
  state = {
    user: {
      first_name: "",
      last_name: "",
      street: "",
      city: "",
      zipcode: "",
      birth_year: "",
      state: "",
      img_url:
        "https://www.searchpng.com/wp-content/uploads/2019/02/Profile-PNG-Icon-715x715.png",
      email: "",
      password: "",
      password_confirmation: "",
    },
  };

  handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState((prevState) => ({
      user: { ...prevState.user, [name]: value },
    }));
  };

  render() {
    const {
      img_url,
      first_name,
      last_name,
      street,
      city,
      zipcode,
      state,
      email,
      password,
      password_confirmation,
      birth_year,
    } = this.state;
    return (
      <div className="form-container">
        <form
          onChange={this.handleChange}
          onSubmit={(e) => this.props.handleSignUpSubmit(e, this.state.user)}
        >
          <div className="register-form">
            <div className="profile-form-row">
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={first_name}
              />
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={last_name}
              />
              <input
                type="text"
                name="street"
                placeholder="Street"
                value={street}
              />
              <input type="text" name="city" placeholder="City" value={city} />
              <input
                type="text"
                name="zipcode"
                placeholder="Zip Code"
                value={zipcode}
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={state}
              />
              <input
                type="text"
                name="img_url"
                placeholder="Image URL"
                value={img_url}
              />
              <input
                type="number"
                name="birth_year"
                placeholder="Birth Year"
                defaultValue="1999"
                value={birth_year}
              />
            </div>

            <div className="profile-form-row">
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={email}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
              />
              <input
                type="password"
                name="password_confirmation"
                placeholder="password Confirmation"
                value={password_confirmation}
              />
            </div>
          </div>

          <div className="signup-submit-button">
            <input type="submit" value="Submit" className="btn" />
          </div>
        </form>
        <Link exact to="/login" className="signup-link">
          Already have an account?
        </Link>
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

export default Signup;
