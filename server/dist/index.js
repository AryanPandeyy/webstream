"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const ser = new server_1.Back();
ser.listen(port => {
    console.log(`Server started ${port} `);
});
