import mongoose from 'mongoose';
import { userSchema } from '../models/user.model';

//this file adds additional methods on the schema

userSchema.methods = {

    create: function () {
        //this create method is not needed; 
        //only added to show that you can wrap the actual model calls
        return this.save()
            .then(save_value => {
                return {
                    isSuccess: true,
                    data: save_value
                };
            })
            .catch(err => {
                return {
                    isSuccess: false,
                    data: err
                };
            });
    },

    update: function (query, updateData, callback) {
        this.findOneAndUpdate(query, { $set: updateData }, { new: true }, callback)
    }
}

userSchema.statics = {

    findByUsernameOrEmail : function(username, email) {
        return this.find({
            $or: [ { username: username }, { email: email} ] 
        }).then( (content) => {
            if(content.length>0) {
                return {
                    isSuccess: false,
                    data: content
                };
            } else {
                return {
                    isSuccess: true,
                    data: content
                };
            }
        })
        .catch(err => {
            console.log(err);
            return {
                isSuccess: true,
                data: err
            };
        });
    }    
}    
// User Model -  Mongoose model provides an interface to the database for creating, querying, updating, deleting records, etc.
// Model is a wrapper on the Mongoose schema
// If collection name is not specified, Mongoose automatically looks for the plural version of your model name 
export const userModel = mongoose.model('User', userSchema);
// module.exports.userModel = mongoose.model('User', userSchema);