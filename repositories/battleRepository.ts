import database from "../database.js";

async function newBattle(username: string, winner: number, loser: number, draw: number) {

    return database.query(`INSERT INTO fighters (username, wins, losses, draws) VALUES ($1, $2, $3, $4)`, [username, winner, loser, draw]);

}

async function updateWinner(username: string) {

    return database.query(`UPDATE fighters SET wins = wins + 1 WHERE username = $1`, [username]);

}

async function updateLoser(username: string) {

    return database.query(`UPDATE fighters SET losses = losses + 1 WHERE username = $1`, [username]);

}

async function updateDraws(username: string) {

    return database.query(`UPDATE fighters SET draws = draws + 1 WHERE username = $1`, [username]);

}



export const battleRepository = {
    newBattle,
    updateWinner,
    updateLoser,
    updateDraws
}