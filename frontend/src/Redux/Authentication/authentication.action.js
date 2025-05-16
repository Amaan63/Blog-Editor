import { api } from "../../config/api";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./authentication.actionType";

export const loginUserAction = (loginData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST }); // 🚀 Dispatch action to show loading state (e.g., spinner)

  try {
    const { data } = await api.post(
      `${API_BASE_URL}/public/auth/signin`, // 🔗 API endpoint for login
      loginData.data // 📦 Send login credentials (email & password)
    );

    if (data.token) {
      localStorage.setItem("jwt", data.token); // 💾 Save JWT token to localStorage
    }

    console.log("Login Successfull", data);

    dispatch({ type: LOGIN_SUCCESS, payload: data.token }); // ✅ Dispatch success action with token
  } catch (error) {
    console.log("Error -----------", error); // 🐞 Log any error for debugging
    dispatch({ type: LOGIN_FAILURE, payload: error }); // ❌ Dispatch failure action with error
  }
};

export const registerUserAction = (loginData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  try {
    const { data } = await api.post(
      `${API_BASE_URL}/public/auth/signup`,
      loginData.data
    );

    if (data.token) {
      localStorage.setItem("jwt", data.token);
    }

    console.log("Register Successfull", data);

    dispatch({ type: REGISTER_SUCCESS, payload: data.token });
  } catch (error) {
    console.log("Error -----------", error);
    dispatch({ type: REGISTER_FAILURE, payload: error });
  }
};
