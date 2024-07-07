import React, { useState } from 'react';
import {
    useToast,
    useDisclosure,
    Box,
    Flex,
    Text,
    IconButton,
    Image,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Avatar,
    Heading,
    Input,
    CardBody,
    CardHeader,
    Card,
    CardFooter
} from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { BiLike, BiChat, BiShare } from 'react-icons/bi';

const Event = () => {
    const [posts, setPosts] = useState([
        // Default post
        {
            id: 1,
            title: "Default Post",
            content: "This is a default post with only text.",
            image: null, // No image for default post
            userName: "John Doe",
            likes: 10,
            comments: 5
        }
    ]);
    const [editedPost, setEditedPost] = useState(null);
    const [newPost, setNewPost] = useState({ title: "", content: "", image: null });
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDelete = (postId) => {
        setPosts(posts.filter(post => post.id !== postId));
        toast({ title: "Post deleted successfully.", status: "info", duration: 3000, isClosable: true });
    };

    const handleEdit = (post) => {
        setEditedPost(post);
        onOpen();
    };

    const handleSave = () => {
        if (editedPost) {
            setPosts(prevPosts => prevPosts.map(p => (p.id === editedPost.id ? editedPost : p)));
            toast({ title: "Post edited successfully.", status: "success", duration: 3000, isClosable: true });
        } else {
            const newId = Math.max(...posts.map(post => post.id)) + 1;
            setPosts(prevPosts => [...prevPosts, { ...newPost, id: newId, userName: "New User", likes: 0, comments: 0 }]);
            toast({ title: "Post added successfully.", status: "success", duration: 3000, isClosable: true });
        }
        onClose();
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setNewPost(prevState => ({ ...prevState, image: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    return (
        <>
            <Box align="center">
                <Button onClick={() => { setEditedPost(null); setNewPost({ title: "", content: "", image: null }); onOpen(); }} colorScheme="teal" mb={4}>
                    Add New Post
                </Button>
            </Box>
            {posts.map(post => (
                <Box key={post.id} bg="white" p="5" rounded="md" shadow="md" m="4" maxWidth="400px" w="full">
                    <Card maxW='md'>
                        <CardHeader>
                            <Flex spacing='4'>
                                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                    <Avatar name={post.userName} src='https://bit.ly/sage-adebayo' />
                                    <Box>
                                        <Heading size='sm'>{post.userName}</Heading>
                                        <Text>{post.title}</Text>
                                    </Box>
                                </Flex>
                                <IconButton
                                    variant='ghost'
                                    colorScheme='gray'
                                    aria-label='See menu'
                                    icon={<BsThreeDotsVertical />}
                                />
                            </Flex>
                        </CardHeader>
                        <CardBody>
                            <Text>{post.content}</Text>
                        </CardBody>
                        {post.image && <Image
                            objectFit='cover'
                            src={post.image}
                            alt={post.title}
                        />}
                        <CardFooter
                            justify='space-between'
                            flexWrap='wrap'
                            sx={{
                                '& > button': {
                                    minW: '136px',
                                },
                            }}
                        >
                            <Button flex='1' variant='ghost' leftIcon={<BiLike />}>
                                Like
                            </Button>
                            <Button flex='1' variant='ghost' leftIcon={<BiChat />}>
                                Comment
                            </Button>
                            <Button flex='1' variant='ghost' leftIcon={<BiShare />}>
                                Share
                            </Button>
                        </CardFooter>
                    </Card>
                </Box>
            ))}

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{editedPost ? "Edit Post" : "Add New Post"}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input value={editedPost ? editedPost.title : newPost.title} onChange={(e) => { if (editedPost) setEditedPost(prevState => ({ ...prevState, title: e.target.value })); else setNewPost(prevState => ({ ...prevState, title: e.target.value })); }} placeholder="Post Title" mb={3} />
                        <Input value={editedPost ? editedPost.content : newPost.content} onChange={(e) => { if (editedPost) setEditedPost(prevState => ({ ...prevState, content: e.target.value })); else setNewPost(prevState => ({ ...prevState, content: e.target.value })); }} placeholder="Post Content" mb={3} />
                        <Input type="file" onChange={handleImageUpload} placeholder="Upload Image" />
                        {editedPost?.image && <Image src={editedPost.image} alt="Post" mt={4} borderRadius="md" />}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleSave}>
                            Save
                        </Button>
                        <Button variant="ghost" onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default Event;
