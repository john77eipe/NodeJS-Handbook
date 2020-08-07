import { blogService } from '../services/blog.service'

const blogController = {
    getBlog: async (req, res) => {
        console.log("getBlog function");
        try {
           let blogId = req.params.blogId;

            //post data check
            if(blogId) {
                const blog = await blogService.fetchBlog(blogId);
                if(blog) {
                    console.log(blog);
                    return res.render('blog', {title:'Blog', blog: blog});
                }
            } 
        } catch (err) {
            console.error(err);
            req.session.sessionFlash = {
                type: 'error',
                message: 'Something went wrong!!!'
            }
            res.redirect('/');
        }
    },
    getBlogs: async (req, res) => {
        console.log("getBlogs function");
        try {
            const blogs = await blogService.listAllBlogs(req.user);
            if(blogs) {
                res.render('blogs', {title:'Blog List', blogs: blogs});
            }
        } catch (err) {
            console.error(err);
            req.session.sessionFlash = {
                type: 'error',
                message: 'Something went wrong!!!'
            }
            res.redirect('/');
        }
    },
    
    createBlog: async (req, res) => {
        try {
            const title = req.body['blog-title'] || 'dummytitle';
            const body = req.body['blog-body'] || 'dummybody';
            const user = req.user;
            const image = req.file;
            const result = await blogService.createBlog({title, body, user, image});
            console.log(`save result isSuccess: ${result.isSuccess}`);
            console.log(`save result data: ${result.data}`);
            if(result.isSuccess) {
                req.session.sessionFlash = {
                    type: 'info',
                    message: 'Blog has been successfully created!!!'
                }
                res.redirect('/blog/${result._id}');
            } else {
                req.session.sessionFlash = {
                    type: 'error',
                    message: 'Something went wrong!!!'
                }
                res.redirect('/');
            }
        } catch (err) {
            console.error(err);
            req.session.sessionFlash = {
                type: 'error',
                message: 'Something went wrong!!!'
            }
            res.redirect('/');
        }
    }
}

export default blogController;