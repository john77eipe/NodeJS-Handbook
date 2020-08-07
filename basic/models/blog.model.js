import mongoose from 'mongoose';

const getTags = tags => tags.join(',');
const setTags = tags => {
  if (!Array.isArray(tags)) return tags.split(',').slice(0, 10); // max tags
  return [];
};

export const blogSchema = new mongoose.Schema({
	title: { 
        type: String, 
        trim: true, 
        maxlength: 400 
    },
    body: { 
        type: String, 
        default: '', 
        trim: true, 
        maxlength: 1000
    },
    user: { 
        type: mongoose.Schema.ObjectId, 
        ref: 'User'
    },
    tags: { 
        type: [], 
        get: getTags, 
        set: setTags 
    },
    image: {
        cdnUri: String,
        files: []
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
});


/**
 * Validations
 */

blogSchema.path('title').required(true, 'Article title cannot be blank');
blogSchema.path('body').required(true, 'Article body cannot be blank'); 