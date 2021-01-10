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
    services: [],
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

        api.services
          .getServices()
          .then((services) => this.setState({ services: services }));
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
    let newService = this.state.newService;

    if (
      newService.name &&
      newService.value &&
      newService.offeringDescription &&
      newService.exchangeDescription
    ) {
      let newServiceUpdate = newService.img_url
        ? newService
        : this.addImageToNewService(newService);
      api.posts.postNewServiceOffering(newServiceUpdate).then((data) => {
        alert(`${data.service.name} has been created`);
        let updateServices = this.state.services.concat(data.service);
        this.setState({ services: updateServices });
        this.props.history.push("/services");
      });
    } else {
      alert(
        "New Service is not valid: make sure you added name, value, description and what you want in exchange."
      );
    }
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

  updateUserDetails = (user) => {
    this.setState({
      ...this.state,
      user: user,
    });
  };

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
      services={this.state.services}
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
    <>
      <br />
      <ServiceNew
        newService={this.state.newService}
        handleSubmitNewServiceForm={this.handleSubmitNewServiceForm}
        handleOnChangeNewServiceForm={this.handleOnChangeNewServiceForm}
      />
    </>
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
