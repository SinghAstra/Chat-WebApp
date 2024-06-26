import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserAvatar from "./UserAvatar";

const ConversationItem = ({ chat }) => {
  const currentUserId = useSelector((state) => state.user.user._id);
  let chatName;
  const navigate = useNavigate();

  if (chat.isGroupChat) {
    chatName = chat.chatName;
  } else {
    const otherUser = chat.users.find((user) => user._id !== currentUserId);
    chatName = otherUser.name;
  }

  let timeIn12HourFormat = "";
  if (chat.lastMessage) {
    const date = new Date(chat.lastMessage.createdAt);
    timeIn12HourFormat = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }
  return (
    <div
      className="w-full my-1 flex flex-row bg-black p-2 rounded-xl gap-2 cursor-pointer hover:border-2 hover:border-violet-400 font-mono"
      onClick={() => navigate(`/app/chat/${chat._id}`)}
    >
      <UserAvatar chatName={chatName} />
      <div className="flex-1 flex flex-col justify-between text-white items-start">
        <h1>{chatName}</h1>
        <div className="text-neutral-500">
          {chat.lastMessage
            ? chat.lastMessage.content.length > 20
              ? chat.lastMessage.content.substring(0, 20) + "..."
              : chat.lastMessage.content
            : "Start a conversation !"}
        </div>
      </div>
      <div className={"text-neutral-500"}>{timeIn12HourFormat}</div>
    </div>
  );
};

export default ConversationItem;
