import { userModel } from '../daos/user.dao'
import { utils } from '../utils/utils'

export const userService = {
    register: async (userDTO) => {
        const password =  await utils.hashPassword(userDTO.password); 

        let newUser = new userModel({
            fullname: userDTO.fullname,
            email: userDTO.email,
            username: userDTO.username,
            password: password,
            profileimage: userDTO.profileimage
        });


        const result = await newUser.create();
        return result;
    },

    login: (userDTO, cb) => {
        userModel.findOne({
            username: userDTO.username
        }, async function(err, user) {
            if (err) {
                return cb(err);
            }
            if (!user) {
                return cb(null, false);
            }
            const result = await utils.comparePassword(userDTO.password, user.password);
            if(result) {
                return cb(null, user);
            }
            return cb(null, false);
        });
    },
    
    findByUsernameOrEmail: async (username, email, cb) => {
        const result = await userModel.findByUsernameOrEmail(username, email);
        return result;
    }
};