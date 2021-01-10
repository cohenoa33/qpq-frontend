import React from "react";

const UserInfo = (props) => {
  const {
    img_url,
    first_name,
    last_name,
    street,
    city,
    zipcode,
    state,
    email,
  } = props.user;

  return (
    <div>
      {" "}
      {props.user ? (
        <div className="two-column-grid">
          <div className="row">
            <div>
              <img
                className="profile-page-image"
                src={img_url}
                alt={first_name}
              />
            </div>
          </div>
          <div className="row">
            <h2 className="user-profile-information">
              Hello {first_name} {last_name}!
            </h2>
            <p>
              {street || city || state || zipcode ? (
                <strong className="user-profile-information">
                  Address:
                  <br />
                  {street ? `${street}` : null}
                  <br />
                  {city ? `${city}` : null}
                  <br />
                  {state ? `${state} ` : null}
                  {zipcode ? `${zipcode}` : null}
                </strong>
              ) : null}
            </p>
            <strong className="user-profile-information">
              <p>
                email:
                <br /> {email}{" "}
              </p>
            </strong>
            {!props.editDisable ? (
              <div className="buttons-row">
                <br />
                <button
                  className="edit-profile-button"
                  onClick={() => props.handleEditButton(props.user)}
                >
                  {" "}
                  Edit My Profile{" "}
                </button>
                <button
                  className="delete-profile-button"
                  onClick={() => props.handleUserDelete(props.user)}
                >
                  {" "}
                  Delete My Profile
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        "Deleted...sad."
      )}
    </div>
  );
};
export default UserInfo;
