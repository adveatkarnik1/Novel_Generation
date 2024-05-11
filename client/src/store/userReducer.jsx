const UserReducer = (userState, action) => {
  switch (action.type) {
    case "_id":
      return {
        ...userState,
        _id: action.payload,
      };

    case "username":
      return {
        ...userState,
        username: action.payload,
      };

    case "email":
      return {
        ...userState,
        email: action.payload,
      };

    case "loginStatus":
      return {
        ...userState,
        loginStatus: action.payload,
      };

    case "isAdmin":
      return {
        ...userState,
        isAdmin: action.payload,
      };

    case "generated":
      return {
        ...userState,
        generated: action.payload,
      }

    case "favourites":
      return {
        ...userState,
        favourites: action.payload,
      };

    default:
      return userState;
  }
};

export default UserReducer;
