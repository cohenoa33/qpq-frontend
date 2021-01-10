import React, { Component } from "react";
import RequestCard from "../components/RequestCard";
import RequestCardToOthers from "../components/RequestCardToOthers";
import PendingRequestCard from "../components/PendingRequestCard";
import api from "../services/api";

class RequestsContainer extends Component {
  state = {
    auth: { currentUser: {} },
    requestsToMe: [],
    requestsToOthers: [],
    archiveRequestToMe: [],
    archiveRequestToOthers: [],
    request: {},
    temp: "",
  };
  componentDidMount() {
    api.requests
      .getRequests()
      .then((requests) => this.filterRequestsByUserId(requests));

    const token = localStorage.getItem("token");
    if (token) {
      api.auth.getCurrentUser().then((user) => {
        const currentUser = { currentUser: user };
        this.setState({ auth: currentUser });
      });
    }
  }

  handleRequestClick = (event, requestDetails) => {
    let value = event.target.name;
    let updateRequests = this.state.requestsToMe.filter(
      (request) => request.id !== requestDetails.id
    );
    api.requests.patchRequestStatus(value, requestDetails.id).then((data) => {
      this.setState({
        archiveRequestToMe: [...this.state.archiveRequestToMe, data],
      });
      this.setState({ requestsToMe: updateRequests });
    });
  };

  filterRequestsByUserId = (requests) => {
    let currentUser = this.props.currentUser;

    let requestsToMe = requests.filter(
      (request) =>
        request.requested_service.user_id === currentUser.id &&
        request.status === "pending"
    );
    let archiveRequestToMe = requests.filter(
      (request) =>
        request.requested_service.user_id === currentUser.id &&
        request.status !== "pending"
    );

    let requestsToOthers = requests.filter(
      (request) =>
        request.response_service.user_id === currentUser.id &&
        request.status === "pending"
    );
    let archiveRequestToOthers = requests.filter(
      (request) =>
        request.response_service.user_id === currentUser.id &&
        request.status !== "pending"
    );
    // let archiveRequest = archivedRequestsToMe.concat(archivedRequestsToOthers);

    this.setState({
      requestsToMe: requestsToMe,
      requestsToOthers: requestsToOthers,
      archiveRequestToMe: archiveRequestToMe,
      archiveRequestToOthers: archiveRequestToOthers,
    });
  };

  render() {
    const {
      requestsToOthers,
      requestsToMe,
      archiveRequestToMe,
      archiveRequestToOthers,
    } = this.state;
    return (
      <div>
        <div>
          <h1>Perspective Offer</h1>
          {requestsToMe.map((request) => (
            <RequestCard
              key={request.index}
              request={request}
              handleRequestClick={this.handleRequestClick}
            />
          ))}

          <h1>My Requests</h1>
          {requestsToOthers.map((request) => (
            <PendingRequestCard
              key={request.id}
              request={request}
              handleRequestClick={this.handleRequestClick}
            />
          ))}

          <h1>Archive</h1>
          {archiveRequestToMe.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              handleRequestClick={this.handleRequestClick}
            />
          ))}

          {archiveRequestToOthers.map((request) => (
            <RequestCardToOthers
              key={request.id}
              request={request}
              handleRequestClick={this.handleRequestClick}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default RequestsContainer;
