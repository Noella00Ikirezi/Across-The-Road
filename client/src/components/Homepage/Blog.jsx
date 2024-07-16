import React, { useState, useEffect } from 'react';
import {
  Flex, Box, Button, Input, Avatar, Heading, Text, Card, CardHeader, CardBody, CardFooter, IconButton, Image, useToast,
  extendTheme, ChakraProvider, Textarea
} from '@chakra-ui/react';
import { BsTrash } from 'react-icons/bs';
import {  BiChat, BiEdit } from 'react-icons/bi';
import { AiOutlineUpload, AiOutlineEdit } from 'react-icons/ai';
import { Global, css } from '@emotion/react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from '../../api/authContext';
import { getAllPosts, createPost, updatePost, deletePost, createComment } from '../../api/blogApi';

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        color: 'gray.800',
        lineHeight: 'tall',
      },
      '.fixed-button': {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
      },
      'body': {
        background: 'linear-gradient(370deg, #6f13ad 0%, #010132 100%)',
        backgroundSize: '200% 200%',
        animation: 'gradientBG 15s ease infinite',
      },
    },
  },
});

const keyframes = css`
  @keyframes gradientBG {
    0% { background-position: 0 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0 50%; }
  }
`;

const Blog = () => {
  const { userId } = useAuth();
  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null); // ID of the post currently being edited
  const [userName, setUserName] = useState('User');
  const [commentContent, setCommentContent] = useState(''); // Content for new comment
  const [currentCommentPostId, setCurrentCommentPostId] = useState(null); // ID of the post currently being commented on
  const toast = useToast();

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    setUserName(storedUserName || 'User');
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await getAllPosts();
      const postsWithComments = data.map(post => ({
        ...post,
        comments: post.comments || []
      }));
      setPosts(postsWithComments);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleEditPost = (postId) => {
    setEditingPostId(postId);
  };

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);
      setPosts(posts.filter(post => post.id !== postId));
      toast({ title: "Post deleted successfully.", status: "error", duration: 3000, isClosable: true });
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleSavePost = async (post) => {
    try {
      const formData = new FormData();
      formData.append('title', post.title);
      formData.append('content', post.content);
      formData.append('user_id', userId);
      if (post.imageFile) {
        formData.append('image', post.imageFile);
      }

      if (post.id < 0) {
        const data = await createPost(formData);
        setPosts(prevPosts => prevPosts.map(p => (p.id === post.id ? { ...post, id: data.id } : p)));
        toast({ title: 'Post added successfully.', status: 'success', duration: 3000, isClosable: true });
      } else {
        await updatePost(post.id, formData);
        setPosts(prevPosts => prevPosts.map(p => (p.id === post.id ? post : p)));
        toast({ title: 'Post edited successfully.', status: 'success', duration: 3000, isClosable: true });
      }
      setEditingPostId(null);
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleImageUpload = (event, post) => {
    const file = event.target.files[0];
    setPosts(prevPosts => prevPosts.map(p => (p.id === post.id ? { ...p, imageFile: file, image: URL.createObjectURL(file) } : p)));
    
  };

  const handleAddPost = () => {
    const newPost = { id: -1, title: "", content: "", image: null, userName, comments: [] }; // Set id to -1 to indicate a new post
    setPosts([newPost, ...posts]);
    setEditingPostId(newPost.id);
  };

  const handleAddComment = async (postId) => {
    try {
      const comment = { content: commentContent, user_id: userId, post_id: postId };
      const newComment = await createComment(comment);
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId ? { ...post, comments: [...post.comments, newComment] } : post
        )
      );
      setCommentContent('');
      setCurrentCommentPostId(null);
      toast({ title: "Comment Added successfully.", status: "success", duration: 3000, isClosable: true });
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <Global styles={keyframes} />
      <Flex align="center" justify="center" minHeight="auto" className="content" padding="10rem">
        <Box>
          <Button onClick={handleAddPost} colorScheme="blue" mb={4}>Add Post</Button>
          {posts.map(post => (
            <Card key={post.id} bg="white" p="5" rounded="md" shadow="md" m="4" width="800px" w="full">
              <CardHeader>
                <Flex justify='space-between'>
                  <Avatar name={post.userName} src='https://via.placeholder.com/150' />
                  <Box pl={2}>
                    <Heading size='sm'>{post.userName}</Heading>
                    <Text fontSize='sm'>{post.userEmail}</Text>
                  </Box>
                  {post.user_id === userId && (
                    <>
                      <IconButton
                        variant='ghost'
                        aria-label='Edit'
                        icon={<AiOutlineEdit />}
                        onClick={() => handleEditPost(post.id)}
                      />
                      <IconButton
                        variant='ghost'
                        aria-label='Delete'
                        icon={<BsTrash />}
                        onClick={() => handleDeletePost(post.id)}
                      />
                    </>
                  )}
                </Flex>
              </CardHeader>
              <CardBody>
                {editingPostId === post.id ? (
                  <Box>
                    <Input
                      placeholder="Title"
                      value={post.title}
                      onChange={(e) => setPosts(prevPosts => prevPosts.map(p => (p.id === post.id ? { ...p, title: e.target.value } : p)))}
                      mb={4}
                    />
                    <Textarea
                      placeholder="What do you want to discuss?"
                      value={post.content}
                      onChange={(e) => setPosts(prevPosts => prevPosts.map(p => (p.id === post.id ? { ...p, content: e.target.value } : p)))}
                      mb={4}
                    />
                    {post.image && (
                      <Image objectFit='cover' src={post.imageUrl || post.image} alt={post.title} mb={4} />
                    )}
                    <Flex justify="space-between" align="center" mb={4}>
                      <Input type="file" id={`upload-${post.id}`} style={{ display: 'none' }} onChange={(e) => handleImageUpload(e, post)} />
                      <label htmlFor={`upload-${post.id}`}>
                        <IconButton as="span" icon={<AiOutlineUpload />} aria-label="Upload Image" />
                      </label>
                    </Flex>
                    <Button colorScheme="blue" onClick={() => handleSavePost(post)}>Save</Button>
                  </Box>
                ) : (
                  <>
                    <Heading size='md' mb={2}>{post.title}</Heading>
                    <Text>{post.content}</Text>
                    {post.image && (
                      <Image objectFit='cover' src={post.imageUrl || post.image} alt={post.title} />
                    )}
                    {post.comments && post.comments.length > 0 && (
                      <Box mt={4}>
                        <Heading size='sm'>Comments</Heading>
                        {post.comments.map(comment => (
                          <Box key={comment.id} mt={2} p={2} bg="gray.100" rounded="md">
                            <Text><strong>{comment.userName}:</strong> {comment.content}</Text>
                          </Box>
                        ))}
                      </Box>
                    )}
                  </>
                )}
              </CardBody>
              <CardFooter
                justify='space-between'
                flexWrap='wrap'
                sx={{
                  '& > button': {
                    minW: '136px',
                  },
                }}
              >
                <Button flex='1' variant='ghost' leftIcon={<BiEdit />} onClick={() => handleEditPost (post.id)}>Edit</Button>
                <Button flex='1' variant='ghost' leftIcon={<BiChat />} onClick={() => setCurrentCommentPostId(post.id)}>Comment</Button>
              </CardFooter>
              {currentCommentPostId === post.id && (
                <Box mt={4}>
                  <Textarea
                    placeholder="Write your comment..."
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    mb={4}
                  />
                  <Button colorScheme="blue" onClick={() => handleAddComment(post.id)}>Add Comment</Button>
                </Box>
              )}
            </Card>
          ))}
        </Box>
      </Flex>
      <Footer />
    </ChakraProvider>
  );
};

export default Blog;
