import {
  createChatApi,
  createGroupChatApi,
  fetchChat,
  fetchChatsApi,
} from "../api";
import {
  END_LOADING_CHATS,
  END_LOADING_CURRENT_CHAT,
  FETCH_CHATS_FAILURE,
  FETCH_CHATS_SUCCESS,
  FETCH_CHAT_SUCCESS,
  START_LOADING_CHATS,
  START_LOADING_CURRENT_CHAT,
} from "./actionTypes";
import { showToast } from "./toastAction";

export const createChatAction = (userId) => async (dispatch) => {
  try {
    const { data } = await createChatApi(userId);
    dispatch(showToast(`Start Conversation `, "success"));
    dispatch(fetchChatsAction());
  } catch (error) {
    dispatch(showToast(error.message, "error"));
  }
};

export const fetchChatsAction = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_CHATS });
    const { data } = await fetchChatsApi();
    dispatch({ type: FETCH_CHATS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_CHATS_FAILURE });
    dispatch(showToast(error.message, "error"));
  } finally {
    dispatch({ type: END_LOADING_CHATS });
  }
};

export const createGroupChatAction = (name, users) => async (dispatch) => {
  try {
    const { data } = await createGroupChatApi(name, users);
    dispatch(showToast(`Group Created - ${data.chatName}`, "success"));
    dispatch(fetchChatsAction());
  } catch (error) {
    dispatch(showToast(error.message, "error"));
  }
};

export const fetchCurrentChat = (chatId) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_CURRENT_CHAT });
    const { data } = await fetchChat(chatId);
    dispatch({ type: FETCH_CHAT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_CHATS_FAILURE });
    dispatch(showToast(error.message, "error"));
  } finally {
    dispatch({ type: END_LOADING_CURRENT_CHAT });
  }
};
