import database from "../database.js";

async function getUser(username: string): Promise<any> {

    const user = await database.query(`SELECT * FROM fighters WHERE username = $1`, [username]);
    return user.rows[0];

}

export const userRepository = {
    getUser
}