import React from "react";
import Header from "./components/Header";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ProfilePage from "./components/ProfilePage";
import ServiceNew from "./components/ServiceNew";
import ServicesContainer from "./containers/ServicesContainer";
import RequestsContainer from "./containers/RequestsContainer";

import api from "./services/api";
import { Route, Switch, withRouter } from "react-router-dom";
import "./App.css";

class App extends React.Component {
  state = {
    user: {},
    search: "",
    newService: {
      name: "",
      value: "",
      offeringDescription: "",
      exchangeDescription: "",
      img_url: "",
      isService: false,
    },
    editDisable: false,
  };

  componentDidMount() {
    if (localStorage.token) {
      api.auth.persist().then((json) => {
        this.handleAuthResponse(json);
      });
    } else {
      this.props.history.push("/login");
    }
  }

  handleLoginSubmit = (event, user) => {
    event.preventDefault();
    api.auth
      .login(user)
      .then((json) => {
        if (!json.error) {
          this.handleAuthResponse(json);
        } else {
          alert(json.error);
        }
      })
      .catch((err) => console.log(err));
  };
  handleSignUpSubmit = (event, user) => {
    event.preventDefault();
    api.auth.signup(user).then((json) => {
      if (!json.error) {
        this.handleAuthResponse(json);
      } else {
        alert(json.error);
      }
    });
  };

  handleAuthResponse = (response) => {
    if (response.user) {
      localStorage.token = response.jwt;
      this.setState({ user: response.user }, () => {
        this.props.history.push("/services");
      });
    } else {
      alert(response.error);
    }
  };

  handleLogout = () => {
    localStorage.removeItem("token");
    this.setState({ auth: { currentUser: {} } });
  };

  // search bar
  handleSearch = (e) => {
    let searchResults = e.target.value;
    this.setState({ search: searchResults });
  };

  handleSubmitNewServiceForm = (e) => {
    e.preventDefault();

    let newService =
      this.state.newService.img_url.length > 0
        ? this.state.newService
        : this.addImageToNewService(this.state.newService);

    api.posts.postNewServiceOffering(newService).then((data) => {
      alert(`${data.service.name} has been created`);
      this.props.history.push("/services");
    });
    e.target.reset();
  };
  addImageToNewService = (service) => {
    service.img_url = "https://picsum.photos/200/300?random=5";
    return service;
  };

  handleOnChangeNewServiceForm = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState((prevState) => ({
      newService: {
        ...prevState.newService,
        [name]: value,
        user_id: this.state.user.id,
      },
    }));
  };
  //service stuff ends here

  updateUserDetails = (user) => {
    this.setState({
      ...this.state,
      user: user,
    });
  };

  // handleFormChange = (event) => {
  //   this.setState({
  //     user: {
  //       ...this.state.user,
  //       [event.target.name]: event.target.value,
  //     },
  //   });
  // };

  renderLogin = () => (
    <Login
      handleLogin={this.handleLogin}
      handleLoginSubmit={this.handleLoginSubmit}
    />
  );
  renderSignup = () => (
    <Signup
      handleLogin={this.handleLogin}
      handleSignUpSubmit={this.handleSignUpSubmit}
    />
  );
  renderServicesContainer = () => (
    <ServicesContainer
      search={this.state.search}
      currentUser={this.state.user}
    />
  );
  renderProfilePage = () => (
    <ProfilePage
      user={this.state.user}
      updateUserDetails={this.updateUserDetails}
    />
  );

  renderRequestsContainer = () => (
    <RequestsContainer
      currentUser={this.state.user}
      search={this.state.search}
    />
  );

  renderNewService = () => (
    <ServiceNew
      newService={this.state.newService}
      handleSubmitNewServiceForm={this.handleSubmitNewServiceForm}
      handleOnChangeNewServiceForm={this.handleOnChangeNewServiceForm}
    />
  );

  render() {
    return (
      <div>
        <Header
          handleLogout={this.handleLogout}
          handleSearch={this.handleSearch}
        />
        <Switch>
          <Route
            exact
            path="/requests"
            component={this.renderRequestsContainer}
          />
          <Route
            exact
            path="/services"
            component={this.renderServicesContainer}
          />
          <Route path="/login" component={this.renderLogin} />
          <Route exact path="/signup" component={this.renderSignup} />
          <Route exact path="/profile" component={this.renderProfilePage} />
          <Route exact path="/newservice" component={this.renderNewService} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
