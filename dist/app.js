"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
require("./database"); // Import the database connection setup
const track_1 = __importDefault(require("./routes/track"));
var cors = require('cors');
const app = (0, express_1.default)();
app.use(cors());
/*
app.use((req, res, next) => {
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});
*/
app.use(body_parser_1.default.json());
app.use('/api', track_1.default); // Use the user routes
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
