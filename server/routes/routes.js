const express = require('express');
const fs = require('fs');
const path = require('path');
const blogController = require('../controllers/blog.controller');
const userController = require('../controllers/user.controller');
const { insertData,fetchPagesByUserId, fetchAllPages,fetchPageById } = require('../controllers/dataController');
const authenticateJWT = require('../middleware/auth');
const { authorizePostOwner, authorizeCommentOwner } = require('../middleware/authorizeOwner');
const upload = require('../config/upload');
const router = express.Router();

// Route to fetch logs
router.get('/logs', authenticateJWT, (req, res) => {
    const logDirectory = path.join(__dirname, '../logs');
    fs.readdir(logDirectory, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to read log directory' });
        }
        const logFiles = files.filter(file => file.endsWith('.log'));
        res.json(logFiles);
    });
});

// Route to fetch specific log file content
router.get('/logs/:filename', authenticateJWT, (req, res) => {
    const logDirectory = path.join(__dirname, '../logs');
    const logFile = path.join(logDirectory, req.params.filename);
    fs.readFile(logFile, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to read log file' });
        }
        res.send(data);
    });
});

// CMS Data Insertion Route
router.post('/insertData', authenticateJWT, upload.fields([
    { name: 'navbar_logo', maxCount: 1 },
    { name: 'about_image_0', maxCount: 10 },
    { name: 'about_image_1', maxCount: 10 },
    { name: 'service_image_0', maxCount: 10 },
    { name: 'feedback_image_0', maxCount: 10 },
    { name: 'team_image_0', maxCount: 10 },
    { name: 'footer_image', maxCount: 1 }
]), insertData);

// CMS Data Fetch Routes
router.get('/fetchAllPages', authenticateJWT, fetchAllPages);
router.get('/pages/:id', authenticateJWT, fetchPageById);
router.get('/pages/user/:userId', authenticateJWT, fetchPagesByUserId);

// User Authentication Routes
router.post('/register', userController.register_user);
router.post('/login', userController.login_user);
router.get('/users', authenticateJWT, userController.getAllUsers);
router.post('/logout', authenticateJWT, userController.logout_user);
router.get('/profile', authenticateJWT, userController.get_profile);
router.put('/profile', authenticateJWT, userController.update_profile);

// Post Routes
router.get('/posts', authenticateJWT, blogController.getAllPosts);
router.get('/posts/:id', authenticateJWT, blogController.getPostById);
router.post('/posts', authenticateJWT, upload.single('image'), blogController.createPost);
router.put('/posts/:id', authenticateJWT, authorizePostOwner, upload.single('image'), blogController.updatePost);
router.delete('/posts/:id', authenticateJWT, authorizePostOwner, blogController.deletePost);

// Comment Routes
router.post('/comments', authenticateJWT, blogController.createComment);
router.put('/comments/:id', authenticateJWT, authorizeCommentOwner, blogController.updateComment);
router.delete('/comments/:id', authenticateJWT, authorizeCommentOwner, blogController.deleteComment);

module.exports = router;
