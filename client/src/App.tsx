import { io } from "socket.io-client";
import "./App.css";
import { useState, useEffect, useRef } from "react";

function App() {
  const [cast, setCast] = useState(false);
  const URL = "http://localhost:8080";
  const [stream, setStream] = useState<MediaStream>();
  const socket = io(URL);
  const startDisplay = async () => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });
    await navigator.mediaDevices
      .getDisplayMedia({
        video: true,
        audio: true,
      })
      .then((data) => {
        setStream(data);
      });
  };
  useEffect(() => {
    if (stream) {
      shareStream();
    }
  }, [stream]);
  const shareStream = () => {
    console.log(socket);
    const media = new MediaRecorder(stream, {
      videoBitsPerSecond: 3000000,
      audioBitsPerSecond: 64000,
    });
    console.log(stream);
    console.log(media);
    media.start(1000);

    media.addEventListener("dataavailable", (e) => {
      console.log(e);
      socket.emit("video", e.data);
    });
  };
  useEffect(() => {
    if (cast) {
      startDisplay();
    }
  }, [cast]);
  const toggleCast = () => {
    if (cast === true) {
      socket.disconnect();
    } else {
      socket.connect();
      setCast(() => {
        return !cast;
      });
    }
  };
  return (
    <>
      <video id={"webcam"} autoPlay></video>
      <button onClick={toggleCast}>
        {cast ? "Stop Stream" : "Start Stream"}
      </button>
    </>
  );
}

export default App;
