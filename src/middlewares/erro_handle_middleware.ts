import { Request, Response, NextFunction } from "express";
import DatabaseError from "../models/errors/database_error_model";
import ForbiddenError from "../models/errors/forbidden_model";



function errorHandle(error: any, req: Request, res: Response, next: NextFunction) {
    if ( error instanceof DatabaseError){
        res.sendStatus(400);
    } else if (error instanceof ForbiddenError) {
        res.sendStatus(403);
    } else {
        res.sendStatus(500);
    }
}

export default errorHandle;