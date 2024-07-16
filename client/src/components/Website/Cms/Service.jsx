import React, { useState, useEffect } from 'react';
import { Box, Flex, Image, Input, Textarea, IconButton, Switch, Stack, Text, Heading, FormControl, useToast } from '@chakra-ui/react';
import { FaUpload, FaCheck, FaPlus, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useAuth } from '../../../api/authContext';
import { uploadServiceImage, saveService } from '../../../api/API';

const MotionBox = motion(Box);

const Service = ({ initialData = [] }) => {
    const defaultService = {
        id: Math.random().toString(36).substr(2, 9),
        title: "Default Service",
        content: "This is the default service content.",
        imgUrl: '', // single field for image URL
        imageFile: null
    };

    const [services, setServices] = useState(initialData.length > 0 ? initialData : [defaultService]);
    const [isEditable, setIsEditable] = useState(false);
    const [editIndex, setEditIndex] = useState(-1);
    const [currentService, setCurrentService] = useState({});
    const toast = useToast();
    const { authToken, userId } = useAuth();

    useEffect(() => {
        if (Array.isArray(initialData) && initialData.length > 0) {
            setServices(initialData);
        }
    }, [initialData]);

    const handleInputChange = (field, value) => {
        setCurrentService(prev => ({ ...prev, [field]: value }));
    };

    const handleAddService = () => {
        const newService = { id: Math.random().toString(36).substr(2, 9), title: "", content: "", imgUrl: '', imageFile: null };
        setServices([...services, newService]);
        toast({
            title: 'Service added',
            description: 'A new service has been added.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    };

    const handleEditClick = (id) => {
        const index = services.findIndex(service => service.id === id);
        setEditIndex(index);
        setCurrentService({ ...services[index] });
    };

    const handleImageChange = (id, event) => {
        const file = event.target.files[0];
        if (file) {
            const newImageUrl = URL.createObjectURL(file);
            console.log('New Image URL:', newImageUrl); // Log the new image URL
            const updatedServices = services.map(service =>
                service.id === id ? { ...service, imgUrl: newImageUrl, imageFile: file } : service
            );
            setServices(updatedServices);
            setCurrentService(updatedServices.find(service => service.id === id)); // Update currentService with the new image URL
        }
    };

    const handleSaveClick = async () => {
        const updatedServices = [...services];
        const service = currentService;

        if (service.imageFile) {
            const formData = new FormData();
            formData.append('service_image', service.imageFile);
            formData.append('userId', userId);

            try {
                console.log('Uploading image...');
                const response = await uploadServiceImage(formData, authToken);
                console.log('Image uploaded successfully:', response.imgUrl);
                service.imgUrl = response.imgUrl; // Update imgUrl with the URL from the server
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

        console.log('Image URL to be saved:', service.imgUrl);

        const data = {
            title: service.title,
            content: service.content,
            userId: userId,
            imgUrl: service.imgUrl // Pass the image URL to the backend
        };

        try {
            console.log('Saving service...');
            await saveService(data, authToken);
            console.log('Service saved successfully');

            updatedServices[editIndex] = service;
            setServices(updatedServices);
            setEditIndex(-1);
            setCurrentService({});
            toast({
                title: 'Service updated',
                description: 'The service has been updated successfully.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Error saving service:', error);
            toast({
                title: 'Error',
                description: 'Failed to save service.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleCancelClick = () => {
        setEditIndex(-1);
        setCurrentService({});
    };

    return (
        <Box mb="5rem" mt="200px" textAlign="center" maxW="1200px" mx="auto">
            <Heading as="h2" size="xl" mb="4rem" color="red.600">
                Our Services
            </Heading>
            <Stack direction="row" justifyContent="center" alignItems="center" mb={4}>
                <Text fontSize="lg" color="white" mr={2}>Edit Mode:</Text>
                <Switch isChecked={isEditable} onChange={() => setIsEditable(!isEditable)} />
            </Stack>
            <Flex direction="column" alignItems="center" gap={6}>
                {services.map((service, index) => (
                    <MotionBox
                        key={service.id}
                        initial="hidden"
                        animate="visible"
                        variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
                        transition={{ delay: index * 0.2, duration: 0.5 }}
                        p={4}
                        width="100%"
                        maxW="800px"
                        align="center"
                        color="white"
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        bg="gray.800"
                        boxShadow="lg"
                        borderRadius="md"
                        textAlign="left"
                    >
                        {isEditable && editIndex === index ? (
                            <>
                                <FormControl mb={2}>
                                    <Input type="file" accept="image/*" id={`file-input-${index}`} onChange={e => handleImageChange(service.id, e)} style={{ display: 'none' }} />
                                    <IconButton icon={<FaUpload />} onClick={() => document.getElementById(`file-input-${index}`).click()} aria-label="Upload image" colorScheme="teal" mb={2} />
                                </FormControl>
                                {service.imgUrl ? (
                                    <Image src={service.imgUrl} alt="Service Image" objectFit="cover" height="300px" width="100%" mb={2} />
                                ) : (
                                    <Box height="300px" width="100%" mb={2} display="flex" justifyContent="center" alignItems="center" border="2px dashed gray">
                                        <Text color="gray.500">Image Placeholder</Text>
                                    </Box>
                                )}
                                <Input mb={2} value={currentService.title || ''} onChange={e => handleInputChange('title', e.target.value)} placeholder="Service Title" />
                                <Textarea mb={2} value={currentService.content || ''} onChange={e => handleInputChange('content', e.target.value)} placeholder="Service Content" />
                                <Stack direction="row" justify="center" spacing={4}>
                                    <IconButton icon={<FaCheck />} onClick={handleSaveClick} size="sm" aria-label="Save service" variant="ghost" colorScheme="green" />
                                    <IconButton icon={<FaTimes />} onClick={handleCancelClick} size="sm" aria-label="Cancel" variant="ghost" colorScheme="red" />
                                </Stack>
                            </>
                        ) : (
                            <>
                                {service.imgUrl ? (
                                    <Image src={service.imgUrl} alt="Service Image" objectFit="cover" height="300px" width="100%" mb={2} />
                                ) : (
                                    <Box height="300px" width="100%" mb={2} display="flex" justifyContent="center" alignItems="center">
                                        <Text color="gray.500">Image Placeholder</Text>
                                    </Box>
                                )}
                                <Text mb={2} fontWeight="bold" fontSize="2xl">{service.title}</Text>
                                <Text mb={2} fontSize="xl">{service.content}</Text>
                                {isEditable && (
                                    <Stack direction="row" justify="center" spacing={4}>
                                        <IconButton icon={<FaEdit />} onClick={() => handleEditClick(service.id)} size="sm" aria-label="Edit service" variant="ghost" colorScheme="blue" />
                                        <IconButton icon={<FaTrash />} size="sm" aria-label="Delete service" variant="ghost" colorScheme="red" />
                                    </Stack>
                                )}
                            </>
                        )}
                    </MotionBox>
                ))}
                {isEditable && (
                    <MotionBox
                        initial="hidden"
                        animate="visible"
                        variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
                        transition={{ delay: services.length * 0.2, duration: 0.5 }}
                        p={4}
                        width="100%"
                        maxW="800px"
                        align="center"
                        color="gray.500"
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        cursor="pointer"
                        onClick={handleAddService}
                        bg="#010132"
                        boxShadow="lg"
                        borderRadius="md"
                    >
                        <FaPlus size={10} />
                        <Text mt={4}>Add Service</Text>
                    </MotionBox>
                )}
            </Flex>
        </Box>
    );
};

export default Service;
