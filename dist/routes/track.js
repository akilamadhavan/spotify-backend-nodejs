"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/users.ts
const express_1 = __importDefault(require("express"));
const Subscribed_1 = require("../entities/Subscribed");
const Track_1 = require("../entities/Track");
const typeorm_1 = require("typeorm");
require("reflect-metadata");
const CircularJSON = require('circular-json');
const router = express_1.default.Router();
//for storing tracks
router.post('/store', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //generate api key generation
        const userRepo = (0, typeorm_1.getRepository)(Subscribed_1.Subscribed);
        var apikey = req.headers.authorization;
        console.log("authorization key", apikey);
        //api key validation
        var apiKeyCheck = yield checkUserAuthentication(req.body.userId, apikey, userRepo);
        if (!apiKeyCheck) {
            res.status(200).json({ error: 'Invalid api key' });
        }
        var userDetail = yield retrieveUserDetail(req.body.userId, userRepo);
        if (!userDetail) {
            yield userStore(userDetail, userRepo, req);
            userDetail = yield retrieveUserDetail(req.body.userId, userRepo);
        }
        //store tracks in table based on userID
        const trackRepo = (0, typeorm_1.getRepository)(Track_1.Track);
        if (trackRepo && userDetail) {
            const tracksDetail = trackRepo.create({
                name: req.body.name,
                path: req.body.path,
                trackId: req.body.track_id,
                subscriberId: userDetail.id,
                type: req.body.type,
                artist: req.body.artist
            });
            trackRepo.save(tracksDetail).catch((err) => {
                console.log("Error: ", err);
            });
        }
        res.status(201).json(userRepo);
    }
    catch (error) {
        console.error('Error saving:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
//fetching subscribed user list latest 10
router.post('/list', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRepo = (0, typeorm_1.getRepository)(Subscribed_1.Subscribed);
        var userDetail = yield retrieveUserDetail(req.body.userId, userRepo);
        if (!userDetail) {
            yield userStore(userDetail, userRepo, req);
            userDetail = yield retrieveUserDetail(req.body.userId, userRepo);
        }
        if (userDetail) {
            let trackList = yield (0, typeorm_1.getRepository)(Track_1.Track).createQueryBuilder("track").where("track.subscriber_id = :id", { id: userDetail.id })
                .take(10)
                .orderBy('track.id', 'ASC')
                .getMany();
            console.log(trackList);
            if (trackList) {
                res.status(200).json({ apikey: userDetail.api_key, trackList });
            }
            else {
                console.log("ticket");
                res.status(204).json({ apikey: userDetail.api_key });
            }
        }
    }
    catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
/**
@param user_id
*/
function retrieveUserDetail(userId, userRepo) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = yield userRepo.createQueryBuilder("subscribed").where("subscribed.user_id = :id", { id: userId }).getOne();
        return user;
    });
}
/**
check authorization key
*/
function checkUserAuthentication(userId, apikey, userRepo) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = yield userRepo.createQueryBuilder("subscribed").where("subscribed.user_id = :id", { id: userId }).andWhere("subscribed.api_key = :api_key", { api_key: apikey }).getOne();
        return user;
    });
}
function genAPIKey() {
    return [...Array(30)]
        .map((e) => ((Math.random() * 36) | 0).toString(36))
        .join('');
}
function userStore(userDetail, userRepo, req) {
    return __awaiter(this, void 0, void 0, function* () {
        //check user exist in db based on doing save/update
        if (!userDetail) {
            const user = userRepo.create({
                userId: req.body.userId,
                email: req.body.email,
                display_name: req.body.display_name,
                api_key: genAPIKey()
            });
            userRepo.save(user).catch((err) => {
                console.log("Error: ", err);
            });
            userDetail = yield retrieveUserDetail(req.body.userId, userRepo);
        }
        else {
            userRepo.createQueryBuilder("subscribed").update(Subscribed_1.Subscribed)
                .set({ "email": req.body.email, "display_name": req.body.display_name })
                .where("subscribed.user_id = :id", { id: req.body.userId }).execute();
        }
    });
}
exports.default = router;
