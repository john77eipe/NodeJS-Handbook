import { userModel } from '../daos/user.dao'

export const userService = {
    register: async (userDTO) => {
        var newUser = new userModel({
            fullname: userDTO.fullname,
            email: userDTO.email,
            username: userDTO.username,
            password: userDTO.password,
            profileimage: userDTO.profileimage
        });


        const result = await newUser.create();
        return result;
    },

    login: (userDTO, cb) => {
        userModel.findOne({
            username: userDTO.username
        }, function(err, user) {
            if (err) {
                return cb(err);
            }
            if (!user) {
                return cb(null, false);
            }
            if (user.password != userDTO.password) {
                return cb(null, false);
            }
            return cb(null, user);
        });
    },
    
    findByUsernameOrEmail: async (username, email, cb) => {
        const result = await userModel.findByUsernameOrEmail(username, email);
        return result;
    }
};