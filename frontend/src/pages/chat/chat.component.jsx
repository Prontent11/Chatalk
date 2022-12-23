import React, { useEffect } from "react";
import axios from "axios";
const ChatPage = () => {
  const fetchChats = async () => {
    const res = await axios.get("/api");
    console.log(res.data);
  };
  useEffect(() => {
    fetchChats();
  }, []);

  return <div>ChatPage</div>;
};

export default ChatPage;
