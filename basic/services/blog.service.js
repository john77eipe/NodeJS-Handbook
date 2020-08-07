import { blogModel } from '../daos/blog.dao'
import { utils } from '../utils/utils'

export const blogService = {
    fetchBlog: async (id) => {
        const result = await blogModel.findById(id);
        return result;
    },

    listAllBlogs: async (user) => {
        const blogs = await blogModel.list(user);
        console.log(blogs);
        return blogs;
    },

    createBlog: async(blogDTO) => {
        let newBlog = new blogModel({
            title: blogDTO.title,
            body: blogDTO.body,
            user: blogDTO.user,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            image: blogDTO.image || ''
        });
        const result = await newBlog.uploadAndSave();
        return result;
    }
};