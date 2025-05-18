import { api, API_BASE_URL } from "../../config/api";
import {
  GET_ALL_BLOG_FAILURE,
  GET_ALL_BLOG_REQUEST,
  GET_ALL_BLOG_SUCCESS,
  PUBLISH_BLOG_FAILURE,
  PUBLISH_BLOG_REQUEST,
  PUBLISH_BLOG_SUCCESS,
  SAVE_OR_UPDATE_DRAFT_BLOG_FAILURE,
  SAVE_OR_UPDATE_DRAFT_BLOG_REQUEST,
  SAVE_OR_UPDATE_DRAFT_BLOG_SUCCESS,
} from "./blog.actionType";

export const createOrUpdateBlogAction = (blogData) => async (dispatch) => {
  dispatch({ type: SAVE_OR_UPDATE_DRAFT_BLOG_REQUEST });
  try {
    const { data } = await api.post(
      `${API_BASE_URL}/blogs/save-draft`,
      blogData
    );
    dispatch({ type: SAVE_OR_UPDATE_DRAFT_BLOG_SUCCESS, payload: data });
    console.log("Draft Blog ", data);
  } catch (error) {
    console.log("error ", error);
    dispatch({ type: SAVE_OR_UPDATE_DRAFT_BLOG_FAILURE, payload: error });
  }
};

export const publishBlogAction = (blogData) => async (dispatch) => {
  dispatch({ type: PUBLISH_BLOG_REQUEST });
  try {
    const { data } = await api.post(`${API_BASE_URL}/blogs/publish`, blogData);
    dispatch({ type: PUBLISH_BLOG_SUCCESS, payload: data });
    console.log("Published Blog ", data);
  } catch (error) {
    console.log("error ", error);
    dispatch({ type: PUBLISH_BLOG_FAILURE, payload: error });
  }
};

export const getAllBlogAction = () => async (dispatch) => {
  dispatch({ type: GET_ALL_BLOG_REQUEST });
  try {
    const { data } = await api.get(`${API_BASE_URL}/blogs`);
    dispatch({ type: GET_ALL_BLOG_SUCCESS, payload: data });
    console.log("GET All Posts DATA ---  ", data);
  } catch (error) {
    console.log("error ", error);
    dispatch({ type: GET_ALL_BLOG_FAILURE, payload: error });
  }
};
