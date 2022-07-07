import {Request, Response} from "express"
import axios from "axios";

import { resultBattle } from "../services/battleServices.js";

export async function getStargazersCount(userName: string): Promise<number> {

    let soma = 0;

    await axios.get(`https://api.github.com/users/${userName}/repos`)
    .then(response => {
    
        const firstUserRepos = response.data;
        firstUserRepos.forEach(repo => {
            soma += repo.stargazers_count;
        })
    
    })
    .catch(error => {
        console.error(error);
    });

    return soma;
}

export async function newBattle(req: Request, res: Response) {

    const { firstUser, secondUser } = res.locals;

    const result = await resultBattle(firstUser, secondUser);

    res.json(result);

}