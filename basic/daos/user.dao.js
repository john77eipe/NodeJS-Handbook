import mongoose from 'mongoose';
import { userSchema } from '../models/user.model';

//this file adds additional methods on the schema

userSchema.methods = {

    create: function () {
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
// User Model -  Mongoose model provides an interface to the database for creating, querying, updating, deleting records, etc.
// Model is a wrapper on the Mongoose schema
// If collection name is not specified, Mongoose automatically looks for the plural version of your model name 
export const userModel = mongoose.model('User', userSchema);
// module.exports.userModel = mongoose.model('User', userSchema);