import express from 'express';
import blogController from '../controllers/blog.controller';

const router = express.Router();

router.get('/blog/:blogId', function(req, res) {
    if (!req.isAuthenticated()) {
        res.redirect("/users/login");
    } else { 
        blogController.getBlog(req, res);
    }
    
});

router.get('/all', function(req, res) {
    if (!req.isAuthenticated()) {
        res.redirect("/users/login");
    } else { 
        blogController.getBlogs(req, res);
    }
});

router.get('/form', function(req, res){
    res.render('createblog', {title:'Create Blog'});
});

router.post('/blog/create', function(req, res){
    console.log("/blog/create invoked");
    blogController.createBlog(req, res);
});

export default router;