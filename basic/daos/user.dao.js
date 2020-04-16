import mongoose from 'mongoose';
import { userSchema } from '../models/user.model';

//this file adds additional methods on the schema

userSchema.methods = {

    create : function(callback){
        this.save(callback);
    },

    update : function(query, updateData, callback){
        this.findOneAndUpdate(query,{$set : updateData},{new : true}, callback)
    }
}
// User Model -  Mongoose model provides an interface to the database for creating, querying, updating, deleting records, etc.
// Model is a wrapper on the Mongoose schema
// If collection name is not specified, Mongoose automatically looks for the plural version of your model name 
const userModel = mongoose.model('User', userSchema);
export default userModel;
//module.exports = mongoose.model('User', userSchema);