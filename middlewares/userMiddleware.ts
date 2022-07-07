import {Request, Response} from "express"
import { battleRepository } from "../repositories/battleRepository.js";
import { userRepository } from "../repositories/userRepository.js";

export async function existsUsers(req: Request, res: Response, next) {

    const { firstUser, secondUser } : { 
        firstUser: string, 
        secondUser: string 
    } = req.body;

    res.locals.firstUser = firstUser;
    res.locals.secondUser = secondUser;

    const existsFirsUser =   await userRepository.getUser(firstUser);
    const existsSecondUser =  await userRepository.getUser(secondUser);

    console.log({existsFirsUser, existsSecondUser});
    

    if (!existsFirsUser) battleRepository.newBattle(firstUser, 0, 0, 0);
    if (!existsSecondUser) battleRepository.newBattle(secondUser, 0, 0, 0);

    next();
}