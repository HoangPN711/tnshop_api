import {verify} from 'jsonwebtoken';
import {Response, NextFunction} from 'express';
import {UNAUTHORIZED} from 'http-status-codes';

const jwtAuth = (req: any, res: Response, next: NextFunction) => {

    const authHeader: string | undefined = req.headers.authorization;
    const accessTokenSecret = "0n7gfEVifBZHJK2nN8X8XRHzmoUoAnNE";

    if (!authHeader) {
        res.sendStatus(UNAUTHORIZED);
    } else {

        const accessToken = authHeader.split(' ')[1];

        verify(accessToken, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(UNAUTHORIZED);
            }
            req.user = user;

            return  next();
        });
    }

};

export default jwtAuth;