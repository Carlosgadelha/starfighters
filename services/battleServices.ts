import { getStargazersCount } from "../controllers/battleControllers.js";
import { battleRepository } from "../repositories/battleRepository.js";


export async function resultBattle(firstUser: string, secondUser: string){

    let draw = false;
    let winner = '0';
    let loser = '0';

    try {

        const firstUserStargazersCount =   await getStargazersCount(firstUser);
        const secondUserStargazersCount =  await getStargazersCount(secondUser);

        if(firstUserStargazersCount === secondUserStargazersCount) {
            draw = true;
            battleRepository.updateDraws(firstUser);
            battleRepository.updateDraws(secondUser);
        }else{
            winner = firstUserStargazersCount > secondUserStargazersCount ? firstUser : secondUser;
            loser = firstUserStargazersCount > secondUserStargazersCount ? secondUser : firstUser;
    
            battleRepository.updateWinner(winner);
            battleRepository.updateLoser(loser);
        }

        return  {
                    winner,
                    loser,
                    draw
                }
        
    } catch (error) {
        console.error(error);
    }

    
}