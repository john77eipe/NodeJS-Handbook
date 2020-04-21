import { userModel } from '../daos/user.dao'

export const userService = {
    register: (userDTO) => {
        var newUser = new userModel({
            fullname: userDTO.fullname,
            email: userDTO.email,
            username: userDTO.username,
            password: userDTO.password,
            profileimage: userDTO.profileimage
        });


        newUser.create((err) => {
            console.log(err);
            if(err) {
                return false;
            } else {
                return true;
            }
        });      
    },

    login: (userDTO, done) => {
        userModel.findOne({
            username: userDTO.username
        }, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            if (user.password != userDTO.password) {
                return done(null, false);
            }
            return done(null, user);
        });
    }    
};