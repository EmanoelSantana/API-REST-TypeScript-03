import express, {Request, Response, NextFunction} from "express";
import userRoutes from "./routes/users_route";
import statusRoutes from "./routes/status_route";
import errorHandle from "./middlewares/erro_handle_middleware";
import authorizationRoute from "./routes/authorization_route";
import jwtAuthenticationMiddleware from "./middlewares/jwt_authentication_middleware";

const app = express();

// config application
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// config rotas 
app.use(statusRoutes);
app.use(authorizationRoute);  

app.use(jwtAuthenticationMiddleware);
app.use(userRoutes); // todas as rotas vão usar o jwtAuthenticationMiddleware, por causa da ordem

// config de error
app.use(errorHandle);

// Inicialização do servidor
app.listen(3001, () => {
    console.log('Aplicação executando na porta 3001!');
});