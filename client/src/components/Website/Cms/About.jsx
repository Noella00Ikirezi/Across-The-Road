import React, { useState } from 'react';
import { Box, Flex, Image, Input, Textarea, IconButton, Switch, Stack, Text, useToast } from '@chakra-ui/react';
import { FaPlus, FaUpload, FaCheck, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import { useAuth } from '../../../api/authContext';
import { uploadAboutImage, saveAboutSection } from '../../../api/API';

const About = ({ pageId }) => {
    const defaultSection = {
        id: Math.random().toString(36).substr(2, 9),
        title: "Default Title",
        content: "Default content here...",
        imageUrl: '',
        tempImageUrl: '',
        imageFile: null
    };

    const [sections, setSections] = useState([defaultSection]);
    const [isEditable, setIsEditable] = useState(false);
    const [editIndex, setEditIndex] = useState(-1);
    const [currentSection, setCurrentSection] = useState({});
    const toast = useToast();
    const { authToken, userId } = useAuth();

    const handleAddSection = () => {
        const newSection = {
            id: Math.random().toString(36).substr(2, 9),
            title: "New Title",
            content: "New content here...",
            imageUrl: '',
            tempImageUrl: '',
            imageFile: null
        };
        setSections([...sections, newSection]);
        toast({
            title: 'Section added',
            description: 'A new section has been added.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    };

    const handleEditClick = (id) => {
        const index = sections.findIndex(section => section.id === id);
        setEditIndex(index);
        setCurrentSection({ ...sections[index] });
    };

    const handleEditSection = (field, value) => {
        setCurrentSection(prev => ({ ...prev, [field]: value }));
    };

    const handleSaveClick = async () => {
        const updatedSections = [...sections];
        const section = currentSection;

        // Upload image if present
        if (section.imageFile) {
            const formData = new FormData();
            formData.append('about_image', section.imageFile);
            formData.append('userId', userId);

            try {
                console.log('Uploading image...');
                const response = await uploadAboutImage(formData, authToken);
                console.log('Image uploaded successfully:', response.data.imageUrl);
                section.imageUrl = response.data.imageUrl; // Update imageUrl with the URL from the server
            } catch (error) {
                console.error('Error uploading image:', error);
                toast({
                    title: 'Error',
                    description: 'Failed to upload image.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }
        }

        // Log the image URL before saving the section
        console.log('Image URL to be saved:', section.imageUrl);

        const data = {
            title: section.title,
            content: section.content,
            userId: userId,
            imageUrl: section.imageUrl // Pass the image URL to the backend
        };

        try {
            console.log('Saving section...');
            await saveAboutSection(data, authToken);
            console.log('Section saved successfully');

            updatedSections[editIndex] = section;
            setSections(updatedSections);
            setEditIndex(-1);
            setCurrentSection({});
            toast({
                title: 'Section updated',
                description: 'The section has been updated successfully.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Error saving section:', error);
            toast({
                title: 'Error',
                description: 'Failed to save section.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleCancelClick = () => {
        setEditIndex(-1);
        setCurrentSection({});
    };

    const handleDeleteSection = (id) => {
        const updatedSections = sections.filter(section => section.id !== id);
        setSections(updatedSections);
        toast({
            title: 'Section deleted',
            description: 'The section has been deleted.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    };

    const handleImageChange = (id, event) => {
        const file = event.target.files[0];
        if (file) {
            const newImageUrl = URL.createObjectURL(file);
            const updatedSections = sections.map(section =>
                section.id === id ? { ...section, tempImageUrl: newImageUrl, imageFile: file } : section
            );
            setSections(updatedSections);
        }
    };

    return (
        <Flex direction="column" align="center" justify="center" minHeight="100vh" color="white" width="100%" p="5rem">
            <Stack direction="row" justifyContent="center" alignItems="center" mb={4}>
                <Text color="white" fontSize="lg" mr={2}>Edit Mode:</Text>
                <Switch isChecked={isEditable} onChange={() => setIsEditable(!isEditable)} />
            </Stack>
            <Flex wrap="wrap" justify="center" gap={4}>
                {sections.map((section, index) => (
                    <Flex key={section.id} direction="row" align="center" w="full" minHeight="50vh">
                        {(section.tempImageUrl || section.imageUrl) ? (
                            <Box flex="1" height="50vh" display="flex" justifyContent="center" alignItems="center">
                                <Image src={section.tempImageUrl || section.imageUrl} alt="About Section" objectFit="cover" height="100%" width="100%" borderRadius="md" />
                            </Box>
                        ) : (
                            isEditable && (
                                <Box
                                    flex="1"
                                    height="50vh"
                                    border="2px dashed gray"
                                    borderRadius="md"
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    textAlign="center"
                                    color="gray.500"
                                    m="4"
                                >
                                    Image Placeholder
                                </Box>
                            )
                        )}
                        <Box flex="1" pl="4">
                            {isEditable && editIndex === index ? (
                                <>
                                    <Input
                                        variant="flushed"
                                        placeholder="Title"
                                        value={currentSection.title || ''}
                                        onChange={(e) => handleEditSection('title', e.target.value)}
                                        textAlign="center"
                                        color="white"
                                    />
                                    <Textarea
                                        variant="flushed"
                                        placeholder="Content"
                                        value={currentSection.content || ''}
                                        onChange={(e) => handleEditSection('content', e.target.value)}
                                        textAlign="center"
                                        color="white"
                                    />
                                    <Flex justify="center" mt={2}>
                                        <IconButton
                                            icon={<FaCheck />}
                                            onClick={handleSaveClick}
                                            size="sm"
                                            aria-label="Save"
                                            colorScheme="green"
                                            mr={2}
                                        />
                                        <IconButton
                                            icon={<FaTimes />}
                                            onClick={handleCancelClick}
                                            size="sm"
                                            aria-label="Cancel"
                                            colorScheme="red"
                                        />
                                    </Flex>
                                </>
                            ) : (
                                <>
                                    <Text fontSize="xl" fontWeight="bold" textAlign="center">{section.title}</Text>
                                    <Text fontSize="md" textAlign="center" my="2">{section.content}</Text>
                                    {isEditable && (
                                        <Flex justify="center" mt={2}>
                                            <IconButton
                                                icon={<FaEdit />}
                                                onClick={() => handleEditClick(section.id)}
                                                size="sm"
                                                aria-label="Edit"
                                                colorScheme="blue"
                                                mr={2}
                                            />
                                            <IconButton
                                                icon={<FaTrash />}
                                                onClick={() => handleDeleteSection(section.id)}
                                                size="sm"
                                                aria-label="Delete"
                                                colorScheme="red"
                                            />
                                        </Flex>
                                    )}
                                </>
                            )}
                        </Box>
                        {isEditable && (
                            <Flex align="center">
                                <IconButton
                                    color="white"
                                    icon={<FaUpload />}
                                    variant="ghost"
                                    onClick={() => document.getElementById(`file-input-${section.id}`).click()}
                                    size="sm"
                                    ml="2"
                                    aria-label="Upload image"
                                />
                                <input
                                    id={`file-input-${section.id}`}
                                    type="file"
                                    hidden
                                    onChange={(e) => handleImageChange(section.id, e)}
                                />
                            </Flex>
                        )}
                    </Flex>
                ))}
                {isEditable && (
                    <Flex
                        direction="column"
                        align="center"
                        justify="center"
                        w="100%"
                        h="50vh"
                        p="3"
                        m="2"
                        border="2px dashed gray"
                        borderRadius="10px"
                        cursor="pointer"
                        onClick={handleAddSection}
                    >
                        <FaPlus size={32} color="gray" />
                        <Text mt={2} color="gray">Add Section</Text>
                    </Flex>
                )}
            </Flex>
        </Flex>
    );
};

export default About;
