import express, { Application } from "express";
import { Server } from "socket.io";
import { Server as HTTPServer, createServer } from "http";
import { spawn } from "child_process";

var ops = [
  "-i",
  "-",
  //force to overwrite
  "-c:v",
  "libx264",
  "-preset",
  "veryfast",
  "-tune",
  "zerolatency",
  "-vf",
  "scale=w=-2:0",
  ////'-filter_complex', 'aresample=44100', // resample audio to 44100Hz, needed if input is not 44100
  ////'-strict', 'experimental',
  //"-bufsize",
  //"1000",
  "-f",
  "flv",
  "rtmp://a.rtmp.youtube.com/live2/y48p-puum-d2k3-ab18-5pyr",
];
export class Back {
  private httpServer!: HTTPServer;
  private app!: Application;
  private io!: Server;
  private readonly DEFAULT_PORT: number = 8080;
  constructor() {
    this.initialize();
    this.handleSocketConnection();
    this.handleRoutes();
  }
  private initialize(): void {
    this.app = express();
    this.httpServer = createServer(this.app);
    this.io = new Server(this.httpServer, {
      cors: {
        origin: "http://localhost:5173",
      },
    });
  }
  private handleSocketConnection(): void {
    this.io.on("connection", (socket) => {
      const ffmpeg = spawn("ffmpeg", ops);
      ffmpeg.on("close", (code, signal) => {
        console.log(
          "FFmpeg child process closed, code " + code + ", signal " + signal,
        );
      });

      ffmpeg.stdin.on("error", (e) => {
        console.log("FFmpeg STDIN Error", e);
      });

      ffmpeg.stderr.on("data", (data) => {
        console.log("FFmpeg STDERR:", data.toString());
      });
      console.log("Socket Connected");
      socket.on("video", (msg) => {
        if (Buffer.isBuffer(msg)) {
          console.log("this is some video data");
          ffmpeg.stdin.write(msg);
        } else {
          console.log(msg);
        }
      });
      socket.on("disconnect", () => {
        console.log("Socket Disconnected");
      });
    });
  }
  private handleRoutes(): void {
    this.app.get("/", (req, res) => {
      res.send(`<h1>hellow</h1>`);
    });
  }
  public listen(callback: (port: number) => void): void {
    this.httpServer.listen(this.DEFAULT_PORT, () =>
      callback(this.DEFAULT_PORT),
    );
  }
}
