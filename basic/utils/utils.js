const bcrypt = require('bcrypt'); //FIXME: Change to ES6

export const utils = {
    hashPassword : async (password, saltRounds = 10) => {
        const salt = bcrypt.genSaltSync(saltRounds);
        //you could use hashSync for synchrounous version
        const hash = await bcrypt.hash(password, salt);
        return hash;
    },

    comparePassword : async (password, hashpassword) => {
        const match = await bcrypt.compare(password, hashpassword)
        return match;
    },
};