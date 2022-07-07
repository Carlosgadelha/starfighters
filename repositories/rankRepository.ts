import database from "../database.js";

async function getRank(): Promise<any> {

    const rank = await database.query(`SELECT * FROM fighters ORDER BY (wins, draws) DESC`);
    return rank.rows;

}

export const rankRepository = {
    getRank
}