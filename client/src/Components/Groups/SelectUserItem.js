import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaCircleArrowRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import AddUserItem from "./AddUserItem";

const SelectUserItem = ({
  groupMemberIds,
  setGroupMemberIds,
  setGroupNameInput,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const chats = useSelector((state) => state.chat.chats);
  const userConversationChats = chats.filter((chat) => !chat.isGroupChat);
  const currentUserId = useSelector((state) => state.user.user?._id);
  const users = userConversationChats.map((chat) => {
    const otherUser = chat.users.find((user) => user._id !== currentUserId);
    return otherUser;
  });
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMemberToggle = (userId) => {
    if (groupMemberIds.includes(userId)) {
      setGroupMemberIds(groupMemberIds.filter((id) => id !== userId));
    } else {
      setGroupMemberIds([...groupMemberIds, userId]);
    }
  };

  console.log("groupMemberIds", groupMemberIds);
  return (
    <div className="w-3/4 flex h-screen flex-col bg-base-100">
      <div className="flex items-center w-full p-0.5 font-mono bg-neutral">
        <div className="flex items-center w-full p-0.5 flex-1">
          <div className="px-3">
            <CiSearch size={32} />
          </div>
          <input
            type="text"
            placeholder="Search group member..."
            className="w-full bg-transparent flex-1 p-2 text-white font-mono outline outline-0 focus:outline-0 text-xl "
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {groupMemberIds.length > 0 && (
          <div
            className=" rounded-full text-violet-400 cursor-pointer px-2 hover:text-violet-700  hover:cursor-pointer"
            onClick={() => setGroupNameInput(true)}
          >
            <FaCircleArrowRight size={36} />
          </div>
        )}
      </div>

      <div className="p-2 flex-1 overflow-y-scroll scrollbar-thumb-violet-300 scrollbar-thin scrollbar-track-base-100">
        <ul className="menu menu-md bg-base-300 w-full rounded-box">
          {filteredUsers.map((user) => (
            <AddUserItem
              user={user}
              key={user._id}
              handleMemberToggle={handleMemberToggle}
              isSelected={groupMemberIds.includes(user._id)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SelectUserItem;
