export const initialState = {
  loading: false,
  dataUser: {},
  isModal: false,
  listItemsContacts: [],
  modalGeneral: {
    isOpenModal: false,
    nameComponentContent: "alertCard",
  },
};

export const appReducer = (state, action) => {
  switch (action.type) {
    case "SET_INITIAL_STATE":
      return {
        ...state,
        [action.key]: action.payload,
      };

    default:
      return state;
  }
};
