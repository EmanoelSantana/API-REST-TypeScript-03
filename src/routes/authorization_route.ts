import { NextFunction, Request, Response, Router } from "express";
import ForbiddenError from "../models/errors/forbidden_model";
import jwt from 'jsonwebtoken';
import basicAuthenticationMiddleware from "../middlewares/basic_authentication_middleware";
import jwtAuthenticationMiddleware from "../middlewares/jwt_authentication_middleware";

const authorizationRoute = Router();

authorizationRoute.post('/token', basicAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction)  => {
    try {
        const user = req.user;

        if (!user) {
            throw new ForbiddenError('Usuário não informado');
        }
        const jwtPayload = { username: user.username };
        const jwtOptions = { subject: user?.uuid };
        const secretKey = 'my_secret_key';
        
        const JWT = jwt.sign(jwtPayload, secretKey,jwtOptions);

        res.status(200).json({ token: JWT});
        

    } catch (error) {
        next(error);
    }
});

authorizationRoute.post('/token/validate', jwtAuthenticationMiddleware, (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(200);
});

export default authorizationRoute;