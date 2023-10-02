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
exports.Track = void 0;
// src/entities/SpotifyTrack.ts
const typeorm_1 = require("typeorm");
let Track = class Track {
};
exports.Track = Track;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Track.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'subscriber_id', type: 'int', nullable: true }) // Map 'track_name' column to 'user_id' property
    ,
    __metadata("design:type", Number)
], Track.prototype, "subscriberId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name', type: 'varchar', nullable: true }) // Map 'track_name' column to 'track_json' property
    ,
    __metadata("design:type", String)
], Track.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'path', type: 'varchar', nullable: true }) // Map 'track_name' column to 'email' property
    ,
    __metadata("design:type", String)
], Track.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'artist', type: 'varchar', nullable: true }) // Map 'track_name' column to 'display_name' property
    ,
    __metadata("design:type", String)
], Track.prototype, "artist", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'type', type: 'varchar', nullable: true }) // Map 'track_name' column to 'display_name' property
    ,
    __metadata("design:type", String)
], Track.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'track_id', type: 'varchar', nullable: true }) // Map 'track_name' column to 'display_name' property
    ,
    __metadata("design:type", String)
], Track.prototype, "trackId", void 0);
exports.Track = Track = __decorate([
    (0, typeorm_1.Entity)()
], Track);
