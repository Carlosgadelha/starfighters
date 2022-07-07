import {Request, Response} from "express"
import { rankRepository } from "../repositories/rankRepository.js";

export async function getRank(req: Request, res: Response): Promise<any> {

    const rank = await rankRepository.getRank();

    res.send(
                {
                    "fighters": rank
                }
            );

}