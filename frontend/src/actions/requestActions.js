export const ADD_REQUEST = "requests/add";
export const REMOVE_REQUEST = "requests/remove";
export const UPDATE_STATUS = "requests/updateStatus";

export const addRequest = (request) => {
  return {
    type: ADD_REQUEST,
    payload: request,
  };
};

export const removeRequest = (id) => {
  return {
    type: REMOVE_REQUEST,
    payload: id,
  };
};

export const updateStatus = (id, status) => {
  return {
    type: UPDATE_STATUS,
    payload: { id, status },
  };
};
