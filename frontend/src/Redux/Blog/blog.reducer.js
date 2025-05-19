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

const initialState = {
  loading: false,
  blogs: [],
  blog: null,
  error: null,
};

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_OR_UPDATE_DRAFT_BLOG_REQUEST:
    case PUBLISH_BLOG_REQUEST:
    case GET_ALL_BLOG_REQUEST:
    case GET_BLOG_BY_ID_REQUEST:
    case DELETE_BLOG_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case SAVE_OR_UPDATE_DRAFT_BLOG_SUCCESS:
    case PUBLISH_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        blog: action.payload, // contains either created or updated blog
      };

    case GET_ALL_BLOG_SUCCESS:
      return { ...state, loading: false, blogs: action.payload };

    case GET_BLOG_BY_ID_SUCCESS:
      return { ...state, loading: false, blogs: [action.payload] }; // override blogs with searched one

    case DELETE_BLOG_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        blogs: state.blogs.filter((blog) => blog.id !== action.payload), // assuming payload is the deleted blogId
      };

    case SAVE_OR_UPDATE_DRAFT_BLOG_FAILURE:
    case PUBLISH_BLOG_FAILURE:
    case GET_ALL_BLOG_FAILURE:
    case GET_BLOG_BY_ID_FAILURE:
    case DELETE_BLOG_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default blogReducer;
