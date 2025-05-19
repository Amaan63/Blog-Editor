import { api, API_BASE_URL } from "../../config/api";
import {
  DELETE_BLOG_BY_ID_FAILURE,
  DELETE_BLOG_BY_ID_REQUEST,
  DELETE_BLOG_BY_ID_SUCCESS,
  GET_ALL_BLOG_FAILURE,
  GET_ALL_BLOG_REQUEST,
  GET_ALL_BLOG_SUCCESS,
  GET_BLOG_BY_ID_FAILURE,
  GET_BLOG_BY_ID_REQUEST,
  GET_BLOG_BY_ID_SUCCESS,
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
    return data;
  } catch (error) {
    const errorMessage = error?.response?.data || "Blog Not found";
    dispatch({
      type: SAVE_OR_UPDATE_DRAFT_BLOG_FAILURE,
      payload: { message: errorMessage },
    });

    throw errorMessage; // Only component handles toast
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

export const getBlogByIdAction = (id) => async (dispatch) => {
  dispatch({ type: GET_BLOG_BY_ID_REQUEST });
  try {
    const { data } = await api.get(`${API_BASE_URL}/blogs/${id}`);
    dispatch({ type: GET_BLOG_BY_ID_SUCCESS, payload: data });
    console.log("GET Blog By ID ---  ", data);
  } catch (error) {
    const errorMessage = error?.response?.data?.message || "Blog Not found"; // 🐞 Log any error for debugging
    dispatch({
      type: GET_ALL_BLOG_FAILURE,
      payload: { message: errorMessage },
    }); // ❌ Dispatch failure action with error
  }
};

export const deleteBlogByIdAction = (id) => async (dispatch) => {
  dispatch({ type: DELETE_BLOG_BY_ID_REQUEST });
  try {
    const { data } = await api.delete(
      `${API_BASE_URL}/blogs/delete/blogId/${id}`
    );
    dispatch({ type: DELETE_BLOG_BY_ID_SUCCESS, payload: id });
    console.log("Delete Blog By ID ---  ", data);
  } catch (error) {
    const errorMessage = error?.response?.data?.message || "Blog Not found"; // 🐞 Log any error for debugging
    dispatch({
      type: DELETE_BLOG_BY_ID_FAILURE,
      payload: { message: errorMessage },
    }); // ❌ Dispatch failure action with error
  }
};
