import * as bcrypt from 'bcrypt';

export class Cencryp {

    private hashLength = 16;
    async getHash(password: string): Promise<string> {
        return bcrypt.hash(password, this.hashLength);
    }

    async compareHash(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

}

