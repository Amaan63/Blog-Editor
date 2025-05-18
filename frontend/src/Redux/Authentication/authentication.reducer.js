import {
  GET_USER_FROM_TOKEN_FAILURE,
  GET_USER_FROM_TOKEN_REQUEST,
  GET_USER_FROM_TOKEN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./authentication.actionType";

const initialState = {
  jwt: null,
  error: null,
  loading: false,
  user: null,
};

export const authenticationReducer = (state = initialState, action) => {
  // 📌 Reducer function takes current state and an action, returns new state

  switch (action.type) {
    // 🔄 Decide what to do based on action type

    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case GET_USER_FROM_TOKEN_REQUEST:
      return { ...state, loading: true, error: null };
    // 🚀 Login started: set loading true, clear previous errors

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("jwt", action.payload); // store fresh token
      return {
        ...state,
        jwt: action.payload,
        loading: false,
        error: null,
      };
    // ✅ Login successful: save token (jwt), stop loading, clear error

    case GET_USER_FROM_TOKEN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };

    case LOGOUT_USER:
      return {
        ...initialState,
      };

    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
    case GET_USER_FROM_TOKEN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    // ❌ Login failed: stop loading, store error message

    default:
      return state;
    // ⚙️ No matching action: return current state unchanged
  }
};
