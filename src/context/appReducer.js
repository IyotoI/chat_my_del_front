export const initialState = {
  loading: false,
  dataUser: {},
  isModal: false,
};

export const appReducer = (state, action) => {
  switch (action.type) {
    case "SET_INITIAL_STATE":
      debugger;
      return {
        ...state,
        [action.key]: action.payload,
      };

    default:
      return state;
  }
};
