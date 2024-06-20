import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";

const socket = io.connect("http://211.211.110.135:15000");

socket.emit("init", "[init] Client -> Server");

function App() {
  const [chatArr, setChatArr] = useState([]);
  const [chat, setChat] = useState({ name: "", message: "" });

  useEffect(() => {
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    socket.on("receive message", (message) => {
      setChatArr((chatArr) => chatArr.concat(message));
    });
  }, []);

  const buttonHandler = useCallback(
    (e) => {
      socket.emit("send message", { name: chat.name, message: chat.message });
    },
    [chat]
  );

  const changeMessage = useCallback(
    (e) => {
      setChat({ name: chat.name, message: e.target.value });
    },
    [chat]
  );

  const changeName = useCallback(
    (e) => {
      setChat({ name: e.target.value, message: chat.message });
    },
    [chat]
  );

  return (
    <div className="App">
      <div className="Box">
        <div className="Header">Computer Network</div>
        <div className="ChatBox">
          {chatArr.map((ele, index) => (
            <div key={index} className="Chat">
              <div className="ChatName">{ele.name}</div>
              <div className="ChatLog">{ele.message}</div>
            </div>
          ))}
        </div>
        <div className="InputBox">
          <input
            className="InputName"
            placeholder="이름"
            onChange={changeName}
          />
          <input
            className="InputText"
            placeholder="내용"
            onChange={changeMessage}
          />
          <button onClick={buttonHandler}>전송</button>
        </div>
      </div>
    </div>
  );
}

export default App;
