const API_ROOT = `https://qpq-server.herokuapp.com/api/v1/`;

const token = localStorage.getItem("token");

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearers ${token}`,
};

const getServices = () => {
  return fetch(`${API_ROOT}/services/`, { headers: headers }).then((res) =>
    res.json()
  );
};

const getRequests = () => {
  return fetch(`${API_ROOT}/requests/`, { headers: headers }).then((res) =>
    res.json()
  );
};

const login = (user) => {
  return fetch(`${API_ROOT}/login`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(user),
  }).then((res) => res.json());
};

const signup = (user) => {
  return fetch(`${API_ROOT}/users`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(user),
  }).then((res) => res.json());
};

const getCurrentUser = () => {
  return fetch(`${API_ROOT}/current_user`, {
    headers: headers,
  }).then((res) => res.json());
};

const patchRequestStatus = (requestStatus, id) => {
  console.log(requestStatus);
  return fetch(`${API_ROOT}/requests/${id}`, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify({ status: requestStatus }),
  }).then((res) => res.json());
};
const patchUserProfile = (userProfile, id) => {
  console.log(userProfile, id);
  return fetch(`${API_ROOT}/users/${id}`, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify(userProfile),
  }).then((res) => res.json());
};

const postNewServiceOffering = (newService) => {
  console.log(newService);
  return fetch(`${API_ROOT}/services/`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ service: newService }),
  }).then((res) => res.json());
};

const handleDeleteButton = (id) => {
  return fetch(`${API_ROOT}/users/${id}`, {
    method: "DELETE",
    headers: headers,
  }).then((res) => res.json());
};

const servicesForUser = (id) => {
  return fetch(`${API_ROOT}/users/${id}`, {
    headers: headers,
  }).then((res) => res.json());
};

const createRequest = (request) => {
  return fetch(`${API_ROOT}/requests`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ request: request }),
  }).then((res) => res.json());
};

const persist = () => {
  return fetch(`${API_ROOT}/persist`, {
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    },
  }).then((res) => res.json());
};

export default {
  auth: {
    login: login,
    getCurrentUser: getCurrentUser,
    signup: signup,
    persist: persist,
  },
  services: {
    getServices,
    servicesForUser,
  },
  requests: {
    getRequests,
    patchRequestStatus,
    createRequest,
  },
  posts: {
    postNewServiceOffering,
  },
  users: {
    handleDeleteButton,
    patchUserProfile,
  },
};
