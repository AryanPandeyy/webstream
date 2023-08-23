"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Back = void 0;
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const child_process_1 = require("child_process");
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
class Back {
    constructor() {
        this.DEFAULT_PORT = 8080;
        this.initialize();
        this.handleSocketConnection();
        this.handleRoutes();
    }
    initialize() {
        this.app = (0, express_1.default)();
        this.httpServer = (0, http_1.createServer)(this.app);
        this.io = new socket_io_1.Server(this.httpServer, {
            cors: {
                origin: "http://localhost:5173",
            },
        });
    }
    handleSocketConnection() {
        this.io.on("connection", (socket) => {
            const ffmpeg = (0, child_process_1.spawn)("ffmpeg", ops);
            ffmpeg.on("close", (code, signal) => {
                console.log("FFmpeg child process closed, code " + code + ", signal " + signal);
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
                }
                else {
                    console.log(msg);
                }
            });
            socket.on("disconnect", () => {
                console.log("Socket Disconnected");
            });
        });
    }
    handleRoutes() {
        this.app.get("/", (req, res) => {
            res.send(`<h1>hellow</h1>`);
        });
    }
    listen(callback) {
        this.httpServer.listen(this.DEFAULT_PORT, () => callback(this.DEFAULT_PORT));
    }
}
exports.Back = Back;
