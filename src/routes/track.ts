// src/routes/users.ts
import express from 'express';
import { Subscribed } from '../entities/Subscribed';
import { Track } from '../entities/Track';
import { Entity, PrimaryGeneratedColumn, getRepository } from 'typeorm';
import "reflect-metadata";
const CircularJSON = require('circular-json');
const router = express.Router();

//for storing tracks
router.post('/store', async (req, res) => {
    try {
       
        
        //generate api key generation
        const userRepo = getRepository(Subscribed);
        var apikey = req.headers.authorization
        console.log("authorization key", apikey);
        
        //api key validation
        var apiKeyCheck = await checkUserAuthentication(req.body.userId, apikey, userRepo);
        if (!apiKeyCheck) {
            res.status(200).json({ error: 'Invalid api key' });
        }

        var userDetail = await retrieveUserDetail(req.body.userId, userRepo);
        if(!userDetail){
            await userStore(userDetail, userRepo, req);
            userDetail = await retrieveUserDetail(req.body.userId, userRepo);
        }
        
      
        //store tracks in table based on userID
        const trackRepo = getRepository(Track);
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
    } catch (error) {
        console.error('Error saving:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//fetching subscribed user list latest 10
router.post('/list', async (req, res) => {
    try {
        const userRepo = getRepository(Subscribed);
        var userDetail = await retrieveUserDetail(req.body.userId, userRepo);
        if(!userDetail){
            await userStore(userDetail, userRepo, req);
            userDetail = await retrieveUserDetail(req.body.userId, userRepo);
        }
        if (userDetail) {
            let trackList = await getRepository(Track).createQueryBuilder("track").where("track.subscriber_id = :id", { id: userDetail.id })
                .take(10)
                .orderBy('track.id', 'ASC')
                .getMany()
            console.log(trackList);
            if (trackList) {

                res.status(200).json({ apikey: userDetail.api_key, trackList });
            } else {
                console.log("ticket");
                res.status(204).json({ apikey: userDetail.api_key});
            }
        }
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
@param user_id
*/
async function retrieveUserDetail(userId: string, userRepo: any) {

    let user = await userRepo.createQueryBuilder("subscribed").where("subscribed.user_id = :id", { id: userId }).getOne();
    return user;
}

/**
check authorization key
*/

async function checkUserAuthentication(userId: string, apikey: string, userRepo: any) {

    let user = await userRepo.createQueryBuilder("subscribed").where("subscribed.user_id = :id",
        { id: userId }).andWhere("subscribed.api_key = :api_key", { api_key: apikey }).getOne();
    return user;
}

function genAPIKey(){
      return [...Array(30)]
                .map((e) => ((Math.random() * 36) | 0).toString(36))
                .join('');
}


async function userStore(userDetail: any, userRepo: any, req: any) {

    //check user exist in db based on doing save/update
    if (!userDetail) {  

        const user = userRepo.create({
            userId: req.body.userId,
            email: req.body.email,
            display_name: req.body.display_name,
            api_key: genAPIKey()
        });

        userRepo.save(user).catch((err:any) => {
            console.log("Error: ", err);
        });
        userDetail = await retrieveUserDetail(req.body.userId, userRepo);
    } else {
      
        userRepo.createQueryBuilder("subscribed").update(Subscribed)
            .set({ "email": req.body.email, "display_name": req.body.display_name })
            .where("subscribed.user_id = :id", { id: req.body.userId }).execute();
    }
}




export default router;
