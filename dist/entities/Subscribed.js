"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscribed = void 0;
// src/entities/SpotifyTrack.ts
const typeorm_1 = require("typeorm");
let Subscribed = class Subscribed {
};
exports.Subscribed = Subscribed;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Subscribed.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'varchar', nullable: true }) // Map 'track_name' column to 'user_id' property
    ,
    __metadata("design:type", String)
], Subscribed.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'track_json', type: 'varchar', nullable: true }) // Map 'track_name' column to 'track_json' property
    ,
    __metadata("design:type", String)
], Subscribed.prototype, "trackJson", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email', type: 'varchar', nullable: true }) // Map 'track_name' column to 'email' property
    ,
    __metadata("design:type", String)
], Subscribed.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'display_name', type: 'varchar', nullable: true }) // Map 'track_name' column to 'display_name' property
    ,
    __metadata("design:type", String)
], Subscribed.prototype, "display_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'api_key', type: 'varchar', nullable: true }) // Map 'track_name' column to 'display_name' property
    ,
    __metadata("design:type", String)
], Subscribed.prototype, "api_key", void 0);
exports.Subscribed = Subscribed = __decorate([
    (0, typeorm_1.Entity)()
], Subscribed);
