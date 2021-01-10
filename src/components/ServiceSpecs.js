import React from "react";
import GoogleApiWrapper from "../containers/MapContainer";
import UserServices from "./UserServices";
import api from "../services/api";

class ServiceSpecs extends React.Component {
  state = {
    services: [],
    userId: 0,
    response_service_id: 0,
    requested_service_id: 0,
    message: null,
    openRequest: false,
    submitRequest: false,
  };
  handleRequestClick = (serviceDetails, user) => {
    api.services
      .servicesForUser(user)
      .then((data) =>
        this.setState({
          ...this.state,
          services: data.services,
          userId: user,
          requested_service_id: serviceDetails.id,
          openRequest: true,
        })
      );
  };

  renderUserServices = () => (
    <UserServices
      services={this.state.services}
      handelChooseService={this.handelChooseService}
      handelMessage={this.handelMessage}
      handelSubmit={this.handelSubmit}
    />
  );

  handelChooseService = (e) => {
    this.setState({ ...this.state, response_service_id: +e.target.value });
  };

  handelMessage = (e) => {
    this.setState({ ...this.state, message: e.target.value });
  };
  handelSubmit = () => {
    const request = {
      requested_service_id: this.state.requested_service_id,
      response_service_id: this.state.response_service_id,
      message: this.state.message,
      status: "pending",
    };
    api.requests
      .createRequest(request)

      .then((data) => {
        if (!data.error) {
          this.setState({
            ...this.state,
            submitRequest: true,
            openRequest: false,
          });
        } else {
          alert(data.error);
        }
      });
  };

  render() {
    const {
      name,
      offeringDescription,
      exchangeDescription,
      img_url,
      value,
      user,
      categories,
    } = this.props.service;

    return (
      <div className="service-specs">
        <div>
          <button className="closing-spec" onClick={this.props.specClick}>
            X
          </button>
        </div>
        <div className="name">{name}</div>
        <span>Value: {value} credits</span>
        <div className="image">
          <img className="spec-service_img" src={img_url} alt={name} />
        </div>

        <div className="service-content">
          <div className="description">
            {" "}
            Offering Description:
            <div> {offeringDescription} </div>
          </div>
        </div>
        <div className="extra content">
          Will Exchange For:
          <div>{exchangeDescription}</div>
          {!categories.length > 0 ? null : (
            <div>
              {" "}
              <br></br>
              <div>
                Categories:
                {categories.map((category, index) => (
                  <li key={index}> {category.name}</li>
                ))}
              </div>{" "}
              <br></br>
            </div>
          )}
        </div>

        {this.props.currentUser.id === user.id ? (
          <div className="your-service"> Your Service </div>
        ) : (
          <div>
            <div>
              Offering From: {user.first_name} in {user.city}, {user.state}
            </div>

            {this.state.submitRequest ? (
              <h1> Your request has been sent to {user.first_name} </h1>
            ) : (
              <button
                className="request-button"
                onClick={() =>
                  this.handleRequestClick(
                    this.props.service,
                    this.props.currentUser.id
                  )
                }
                type="button"
              >
                Request a QPQ from {user.first_name}
              </button>
            )}

            {this.state.openRequest ? this.renderUserServices() : null}
          </div>
        )}
        <div>
          {" "}
          <GoogleApiWrapper
            latitude={user.latitude}
            longitude={user.longitude}
          />
        </div>
      </div>
    );
  }
}

export default ServiceSpecs;
