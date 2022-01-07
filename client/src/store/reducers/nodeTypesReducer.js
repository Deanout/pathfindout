const nodeTypesReducer = (state, action) => {
  switch (action) {
    case "ADD_NODE_TYPE":
      return [...state, action.payload];
    case "REMOVE_NODE_TYPE":
      return state.filter((nodeType) => nodeType.id !== action.payload.id);
    case "UPDATE_NODE_TYPE":
      return state.map((nodeType) => {
        if (nodeType.id === action.payload.id) {
          return Object.assign({}, nodeType, action.payload);
        }
        return nodeType;
      });
    default:
      return state;
  }
};

export default nodeTypesReducer;
