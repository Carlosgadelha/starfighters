import {Request, Response} from "express"
import axios from "axios";
import { battleRepository } from "../repositories/battleRepository.js";

async function getStargazersCount(userName: string): Promise<number> {

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

    const { firstUser, secondUser } : { 
                                        firstUser: string, 
                                        secondUser: string 
                                    } = req.body;

    let draw = false;
    let winner = '0';
    let loser = '0';
    let firstUserStargazersCount = 0;
    let secondUserStargazersCount = 0;

    try {
        firstUserStargazersCount =   await getStargazersCount(firstUser);
        secondUserStargazersCount =  await getStargazersCount(secondUser);

        console.log({firstUserStargazersCount, secondUserStargazersCount});
        

        if(firstUserStargazersCount === secondUserStargazersCount) {
            draw = true;
            battleRepository.newBattle(firstUser, 0, 0, 1);
            battleRepository.newBattle(secondUser, 0, 0, 1);
        }else{
            winner = firstUserStargazersCount > secondUserStargazersCount ? firstUser : secondUser;
            loser = firstUserStargazersCount > secondUserStargazersCount ? secondUser : firstUser;

            battleRepository.newBattle(winner, 1, 0, 0);
            battleRepository.newBattle(loser, 0, 1, 0);
        }
        

        res.send(
                {
                    winner,
                    loser,
                    draw
                }
            );

    } catch (error) {
        console.error(error);
    }

    
    
}