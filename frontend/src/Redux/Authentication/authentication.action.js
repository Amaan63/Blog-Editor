import axios from "axios";
import { api, API_BASE_URL } from "../../config/api";
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

export const loginUserAction = (loginData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST }); // 🚀 Dispatch action to show loading state (e.g., spinner)

  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/user/signin`, // 🔗 API endpoint for login
      loginData.data // 📦 Send login credentials (email & password)
    );

    if (data.token) {
      localStorage.setItem("jwt", data.token); // 💾 Save JWT token to localStorage
    }

    console.log("Login Successfull", data);

    dispatch({ type: LOGIN_SUCCESS, payload: data.token }); // ✅ Dispatch success action with token
  } catch (error) {
    const errorMessage = error?.response?.data?.message || "Login failed!"; // 🐞 Log any error for debugging
    dispatch({ type: LOGIN_FAILURE, payload: { message: errorMessage } }); // ❌ Dispatch failure action with error
  }
};

export const registerUserAction = (loginData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/user/signup`,
      loginData.data
    );

    if (data.token) {
      localStorage.setItem("jwt", data.token);
    }

    console.log("Register Successfull", data);

    dispatch({ type: REGISTER_SUCCESS, payload: data.token });
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || "Registration failed!"; // 🐞 Log any error for debugging
    dispatch({ type: REGISTER_FAILURE, payload: { message: errorMessage } }); // ❌ Dispatch failure action with error
  }
};

export const getUserFromToken = () => async (dispatch) => {
  dispatch({ type: GET_USER_FROM_TOKEN_REQUEST });
  try {
    const response = await api.get(`${API_BASE_URL}/user/token-to-user`);
    console.log("Token Retrieved Successfully", response.data);

    // Make sure your payload includes the user object
    dispatch({ type: GET_USER_FROM_TOKEN_SUCCESS, payload: response.data });
  } catch (error) {
    console.log("error ", error);
    dispatch({ type: GET_USER_FROM_TOKEN_FAILURE, payload: error });
  }
};

export const logoutUser = () => (dispatch) => {
  // Remove token from localStorage or wherever you keep it
  localStorage.removeItem("jwt");

  // Dispatch logout action to clear redux state
  dispatch({ type: LOGOUT_USER });
};
