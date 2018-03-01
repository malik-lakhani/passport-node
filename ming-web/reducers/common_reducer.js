const initialState = {
  status: {},
};

const common_reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'STATUS':
      return Object.assign({}, state, { status: action.status });
    default:
      return state;
  }
};

export default common_reducer;
