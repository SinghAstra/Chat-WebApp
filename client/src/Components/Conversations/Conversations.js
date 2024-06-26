import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConversationItem from "./ConversationItem";
import { fetchChatsAction } from "../../Redux/actions/chatActions";
import ConversationItemSkeleton from "./ConversationItemSkeleton";

const Conversations = ({ searchQuery }) => {
  const chats = useSelector((state) => state.chat.chats);
  const dispatch = useDispatch();
  const loadingChats = useSelector((state) => state.loading.loadingChats);
  const currentUserId = useSelector((state) => state.user.user?._id);

  useEffect(() => {
    dispatch(fetchChatsAction());
  }, [dispatch]);

  if (loadingChats) {
    return (
      <div className="overflow-y-scroll flex-1 no-scrollbar m-2 mt-0">
        <ul className="menu menu-md bg-base-200 w-full rounded-box">
          {Array.from({ length: 8 }).map((_, index) => (
            <ConversationItemSkeleton key={index} />
          ))}
        </ul>
      </div>
    );
  }

  const filteredChats = chats.filter((chat) => {
    let chatName;
    if (chat.isGroupChat) {
      chatName = chat.chatName;
    } else {
      chatName = chat.users.find((user) => user._id !== currentUserId).name;
    }
    return chatName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (chats.length === 0) {
    return (
      <div className="flex-1 mt-0 flex items-center justify-center bg-base-200 font-mono m-2 rounded-box">
        <span>No Conversation yet!</span>
      </div>
    );
  }

  if (filteredChats.length === 0) {
    return (
      <div className="flex-1 mt-0 flex items-center justify-center bg-base-200 font-mono m-2 rounded-box">
        <span>No Such Conversation found!</span>
      </div>
    );
  }

  return (
    <div className="overflow-y-scroll flex-1 m-2 mt-0 no-scrollbar">
      <ul className="menu menu-md bg-base-200 w-full rounded-box">
        {filteredChats.map((conversation) => (
          <ConversationItem chat={conversation} key={conversation._id} />
        ))}
      </ul>
    </div>
  );
};

export default Conversations;
