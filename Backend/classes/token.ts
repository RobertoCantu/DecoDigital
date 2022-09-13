import jwt from 'jsonwebtoken';

export default class Token {
    private static seed: string = process.env.SEED || 'este-es-el-seed-desarrollo';
    private static expires: string = "30d";

    constructor() {}

    static getJwtToken(payload: any): string {
        return jwt.sign({
            user: payload
        }, this.seed, {expiresIn: this.expires});
    }

    static checkToken(userToken: string) {
        return new Promise((resolve, reject) => {
            jwt.verify(userToken, this.seed, (err, decoded) => {
                if(err) {
                    reject();
                }else {
                    resolve(decoded);
                }
            });
        });
    }
}
