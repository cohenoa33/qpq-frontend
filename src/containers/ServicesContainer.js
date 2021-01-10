import React, { Component } from "react";
import ServiceCard from "../components/ServiceCard";
import ServiceSpecs from "../components/ServiceSpecs";
import SortBar from "../components/SortBar";
import { withRouter } from "react-router-dom";

class ServicesContainer extends Component {
  state = {
    services: [],
    service: {},
    cardClicked: false,
    sortByName: true,
    type: "all",
  };

  cardClick = (event, serviceDetails) => {
    this.setState({
      service: serviceDetails,
      cardClicked: !this.state.cardClicked,
    });
  };

  specClick = () => {
    this.setState({
      service: {},
      cardClicked: !this.state.cardClicked,
    });
  };

  componentDidMount = () => {
    const token = localStorage.getItem("token");
    if (token) {
      this.setState({ token: token });
    }
  };

  handelSortBy = (e) => {
    this.setState({ sortByName: !this.state.sortByName });
  };
  handleFilterByType = (e) => {
    this.setState({ type: e.target.value });
  };

  filterServicesByType = () => {
    let services = this.props.services;
    switch (this.state.type) {
      case "services":
        return services.filter((service) => service.isService === true);

      case "goods":
        return services.filter((service) => service.isService !== true);

      case "all":
        return services;

      default:
        return services;
    }
  };

  sortServicesBy = () => {
    if (!this.state.sortByName) {
      return this.filterServicesByType().sort(function (a, b) {
        return a.value - b.value;
      });
    } else {
      this.filterServicesByType().sort(function (a, b) {
        let nameA = a.name.toUpperCase();
        let nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0;
      });
    }
    return this.filterServicesByType();
  };

  filterServicesBySearch = () => {
    let search = this.props.search.toLowerCase();
    if (search.length > 0) {
      let filteredServices = this.sortServicesBy().filter(
        (service) =>
          service.name.toLowerCase().includes(search) ||
          service.exchangeDescription.toLowerCase().includes(search) ||
          service.offeringDescription.toLowerCase().includes(search)
      );
      return filteredServices;
    }
    return this.sortServicesBy();
  };

  render() {
    return (
      <div>
        {this.state.cardClicked ? (
          <div className="specs-container">
            <ServiceSpecs
              specClick={this.specClick}
              service={this.state.service}
              currentUser={this.props.currentUser}
            />{" "}
          </div>
        ) : (
          <div>
            {this.state.token ? (
              <SortBar
                handelSortBy={this.handelSortBy}
                sort={this.state.sortByName}
                handleFilterByType={this.handleFilterByType}
              />
            ) : null}
            <div className="service-container">
              {this.filterServicesBySearch().map((service) => (
                <ServiceCard
                  service={service}
                  key={service.id}
                  cardClick={this.cardClick}
                  renderOneService={this.props.renderOneService}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
} // end pf class

export default withRouter(ServicesContainer);
