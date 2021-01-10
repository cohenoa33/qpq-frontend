import React from "react";

const ServiceNew = (props) => {
  return (
    <div>
      <form
        onSubmit={(e) => props.handleSubmitNewServiceForm(e)}
        onChange={(e) => props.handleOnChangeNewServiceForm(e)}
      >
        <div className="new-service-form">
          <div className="profile-form-row">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={props.name}
            />
            <input
              type="number"
              name="value"
              placeholder="What is The Value of Your Offering?"
              value={props.value}
            />
            <textarea
              name="offeringDescription"
              placeholder="Describe the Service You Are Offering..."
              value={props.offeringDescription}
            />
            <textarea
              name="exchangeDescription"
              placeholder="What Would you Take In Return For Your Service?"
              value={props.exchangeDescription}
            />
            <input
              type="text"
              name="img_url"
              placeholder="What is the URL of an image showcasing your offering?"
              value={props.img_url}
            />
            <div className="submit-button-new-service">
              <input
                type="submit"
                value="Submit"
                className="submit-button-btn"
              />
            </div>
          </div>
        </div>
      </form>
    </div> // end return div
  );
};
export default ServiceNew;
