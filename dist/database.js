"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/database.ts
const typeorm_1 = require("typeorm");
(0, typeorm_1.createConnection)()
    .then(() => {
    console.log('Database connected');
})
    .catch((error) => {
    console.error('Error connecting to the database', error);
});
