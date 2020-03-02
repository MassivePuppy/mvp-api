const bcrypt = require('bcrypt');
const saltRounds = 10;

export const HashUtil = {
    hash: (password: string): Promise<string> => {
        return bcrypt.hash(password, saltRounds)
    }, 

    check: (input: string, hash: string): Promise<boolean> => {
        return bcrypt.compare(input, hash)
    }
}