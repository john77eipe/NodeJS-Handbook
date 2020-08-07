import mongoose from 'mongoose';
import { blogSchema } from '../models/blog.model';

/**
 * Pre-remove hook
 */

blogSchema.pre('remove', function (next) {
    // const imager = new Imager(imagerConfig, 'S3');
    // const files = this.image.files;

    // if there are files associated with the item, remove from the cloud too
    // imager.remove(files, function (err) {
    //   if (err) return next(err);
    // }, 'article');

    next();
});

blogSchema.methods = {
    /**
     * Save blog and upload image
     *
     * @param {Object} images
     * @api private
     */

    uploadAndSave: function () {
        const err = this.validateSync();
        if (err && err.toString()) throw new Error(err.toString());
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

        /*
        uploading image code shouldn't be in DAO
        if (images && !images.length) return this.save();
        const imager = new Imager(imagerConfig, 'S3');
        imager.upload(images, function (err, cdnUri, files) {
          if (err) return cb(err);
          if (files.length) {
            self.image = { cdnUri : cdnUri, files : files };
          }
          self.save(cb);
        }, 'article');
        */
    },

    /**
     * Add comment
     *
     * @param {User} user
     * @param {Object} comment
     * @api private
     */

    addComment: function (user, comment) {
        this.comments.push({
            body: comment.body,
            user: user._id
        });

        if (!this.user.email) this.user.email = 'email@product.com';

        notify.comment({
            article: this,
            currentUser: user,
            comment: comment.body
        });

        return this.save();
    },

    /**
     * Remove comment
     *
     * @param {commentId} String
     * @api private
     */

    removeComment: function (commentId) {
        const index = this.comments.map(comment => comment.id).indexOf(commentId);

        if (~index) this.comments.splice(index, 1);
        else throw new Error('Comment not found');
        return this.save();
    }
};

blogSchema.statics = {
    /**
     * Find blog by id
     *
     * @param {ObjectId} id
     * @api private
     */

    load: function (_id, username) {
        return this.findOne({ _id })
            .where('user.username').equals(username)
            .exec();
    },

    /**
     * List blogs
     *
     * @param {Object} options
     * @api private
     */

    list: function (user) {
        console.log("list dao called");
        return this.find()
            .where('user').equals(user)
            .populate('user', 'fullname username')
            .sort({ createdAt: -1 })
            .exec();
    }
};

export const blogModel = mongoose.model('Blog', blogSchema);