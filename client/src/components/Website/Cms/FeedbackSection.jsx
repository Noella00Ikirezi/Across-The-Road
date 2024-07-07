import React, { useState, useEffect } from 'react';
import { Flex, Box, Text, Image, IconButton, Input, Textarea, Switch, Stack, Heading, useToast } from '@chakra-ui/react';
import { FaEdit, FaTrash, FaCheck, FaTimes, FaPlus, FaUpload } from 'react-icons/fa';

const FeedbackSection = ({ initialData, setInitialData }) => {
    const defaultFeedback = {
        id: Math.random().toString(36).substr(2, 9),
        content: 'This is feedback content.',
        name: 'Default User',
        role: 'Default Role',
        img: 'https://via.placeholder.com/150',
        tempImageUrl: ''
    };

    const [feedbackData, setFeedbackData] = useState(Array.isArray(initialData) && initialData.length > 0 ? initialData : [defaultFeedback]);
    const [editIndex, setEditIndex] = useState(-1);
    const [currentFeedback, setCurrentFeedback] = useState({});
    const [isEditable, setIsEditable] = useState(false);
    const toast = useToast();

    useEffect(() => {
        if (Array.isArray(initialData) && initialData.length > 0) {
            setFeedbackData(initialData);
        }
    }, [initialData]);

    const handleEditFeedback = (index) => {
        setEditIndex(index);
        setCurrentFeedback({ ...feedbackData[index] });
    };

    const handleSaveFeedback = (id) => {
        const updatedFeedback = feedbackData.map((item, idx) => idx === editIndex ? { ...item, ...currentFeedback, img: item.tempImageUrl } : item);
        setFeedbackData(updatedFeedback);
        setInitialData(updatedFeedback);
        setEditIndex(-1);
        setCurrentFeedback({});
        toast({
            title: 'Feedback updated',
            description: 'The feedback has been updated successfully.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    };

    const handleAddFeedback = () => {
        const newFeedback = {
            id: Math.random().toString(36).substr(2, 9),
            content: "New feedback content",
            name: "New Contributor",
            role: "New Title",
            img: 'https://via.placeholder.com/150',
            tempImageUrl: ''
        };
        const updatedFeedback = [...feedbackData, newFeedback];
        setFeedbackData(updatedFeedback);
        setInitialData(updatedFeedback);
        toast({
            title: 'Feedback added',
            description: 'A new feedback has been added.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    };

    const handleInputChange = (field, value) => {
        setCurrentFeedback(prev => ({ ...prev, [field]: value }));
    };

    const handleImageChange = (id, event) => {
        const file = event.target.files[0];
        if (file) {
            const newImageUrl = URL.createObjectURL(file);
            setFeedbackData(prevFeedback =>
                prevFeedback.map(feedback =>
                    feedback.id === id ? { ...feedback, tempImageUrl: newImageUrl, imageFile: file } : feedback
                )
            );
            setInitialData(prevFeedback =>
                prevFeedback.map(feedback =>
                    feedback.id === id ? { ...feedback, tempImageUrl: newImageUrl, imageFile: file } : feedback
                )
            );
        }
    };

    const handleDeleteFeedback = (id) => {
        const updatedFeedback = feedbackData.filter(item => item.id !== id);
        setFeedbackData(updatedFeedback);
        setInitialData(updatedFeedback);
        toast({
            title: 'Feedback deleted',
            description: 'The feedback has been deleted.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    };

    const handleCancelClick = () => {
        setEditIndex(-1);
        setCurrentFeedback({});
    };

    return (
        <Flex direction="column" align="center" justify="center" minHeight="100vh" color="white" width="100%" p="4">
            <Heading as="h2" size="xl" mt="5rem" color="white">Feedback</Heading>
            <Stack direction="column" justifyContent="center" alignItems="center" mb={4}>
                <Text fontSize="lg" mr={2}>Edit Mode:</Text>
                <Switch isChecked={isEditable} onChange={() => setIsEditable(!isEditable)} />
            </Stack>
            <Flex wrap="wrap" justify="center" gap={4}>
                {feedbackData.map((item, index) => (
                    <Box
                        key={item.id}
                        textAlign="center"
                        margin="2rem"
                        w="300px"
                        maxW="100%"
                        h="auto"
                        padding="10px"
                        border="1px solid #ddd"
                        borderRadius="10px"
                        overflow="hidden"
                        bgGradient="linear(to-b, #010132, #0a000e)"
                        boxShadow="0 4px 8px rgba(255, 255, 255, 0.5)"
                        transition="transform 0.3s ease, box-shadow 0.3s ease"
                        _hover={{
                            transform: 'scale(1.05)',
                            boxShadow: '0 8px 16px rgba(255, 255, 255, 0.5)',
                        }}
                    >
                        <Flex direction="column" justify="space-between" p="3rem" align="center" gap={4}>
                            <Image
                                src={item.tempImageUrl || item.img}
                                alt={`${item.name} photo`}
                                boxSize="100px"
                                borderRadius="full"
                                objectFit="cover"
                                m="auto"
                            />
                            <Text fontSize="lg" fontWeight="bold">{item.name}</Text>
                            <Text fontSize="sm">{item.role}</Text>
                            <Text fontSize="md">{item.content}</Text>
                            {isEditable && (
                                editIndex === index ? (
                                    <>
                                        <Input
                                            value={currentFeedback.name || ''}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            placeholder="Name"
                                            mb={2}
                                            color="white"
                                        />
                                        <Input
                                            value={currentFeedback.role || ''}
                                            onChange={(e) => handleInputChange('role', e.target.value)}
                                            placeholder="Role"
                                            mb={2}
                                            color="white"
                                        />
                                        <Textarea
                                            value={currentFeedback.content || ''}
                                            onChange={(e) => handleInputChange('content', e.target.value)}
                                            placeholder="Content"
                                            mb={2}
                                            color="white"
                                        />
                                        <Flex justify="center" gap={2}>
                                            <IconButton
                                                icon={<FaCheck />}
                                                onClick={() => handleSaveFeedback(item.id)}
                                                size="sm"
                                                aria-label="Save feedback"
                                                colorScheme="green"
                                                color="white"
                                                variant="ghost"
                                            />
                                            <IconButton
                                                icon={<FaTimes />}
                                                onClick={handleCancelClick}
                                                size="sm"
                                                aria-label="Cancel editing"
                                                colorScheme="red"
                                                color="white"
                                                variant="ghost"
                                            />
                                            <IconButton
                                                icon={<FaUpload />}
                                                onClick={() => document.getElementById(`file-input-${item.id}`).click()}
                                                size="sm"
                                                aria-label="Upload image"
                                                colorScheme="teal"
                                                color="white"
                                                variant="ghost"
                                            />
                                            <input
                                                id={`file-input-${item.id}`}
                                                type="file"
                                                hidden
                                                onChange={(e) => handleImageChange(item.id, e)}
                                            />
                                        </Flex>
                                    </>
                                ) : (
                                    <Flex justify="center" gap={2}>
                                        <IconButton
                                            icon={<FaEdit />}
                                            onClick={() => handleEditFeedback(index)}
                                            size="sm"
                                            aria-label="Edit feedback"
                                            colorScheme="blue"
                                            color="white"
                                            variant="ghost"
                                        />
                                        <IconButton
                                            icon={<FaTrash />}
                                            onClick={() => handleDeleteFeedback(item.id)}
                                            size="sm"
                                            aria-label="Delete feedback"
                                            colorScheme="red"
                                            color="white"
                                            variant="ghost"
                                        />
                                    </Flex>
                                )
                            )}
                        </Flex>
                    </Box>
                ))}
                {isEditable && (
                    <Flex
                        direction="column"
                        align="center"
                        justify="center"
                        w="300px"
                        h="auto"
                        p="3"
                        m="2"
                        border="2px dashed gray"
                        borderRadius="10px"
                        cursor="pointer"
                        onClick={handleAddFeedback}
                    >
                        <FaPlus size={32} color="gray" />
                        <Text mt={2} color="gray">Add Feedback</Text>
                    </Flex>
                )}
            </Flex>
        </Flex>
    );
};

export default FeedbackSection;
