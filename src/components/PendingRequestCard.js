import React from "react";

const PendingRequestCard = (props) => {
  const requestDetails = props.request;

  return (
    <div className="card">
      <div className="request-card">
        {" "}
        Your Service:
        <p> {requestDetails.response_service.name}</p>
        You Will Receive in Return:{" "}
        <p>{requestDetails.requested_service.name}</p>
        Your Message:
        <p> {requestDetails.message}</p>
        <h3> Waiting for Approval</h3>
      </div>
    </div>
  );
};

export default PendingRequestCard;
