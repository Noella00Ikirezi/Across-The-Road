import React, { useState, useEffect } from 'react';
import { Box, Text, Image, Heading, Input, IconButton, FormControl, Switch, Stack, Flex, Textarea } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { AddIcon, DeleteIcon, CheckIcon } from "@chakra-ui/icons";
import { FaUpload } from 'react-icons/fa';

const MotionBox = motion(Box);

const Service = ({ initialData, setInitialData }) => {
    const defaultService = {
        id: 1,
        title: "Default Service",
        content: "This is the default service content.",
        img: "https://via.placeholder.com/800x600",
        tempImageUrl: ''
    };

    const [services, setServices] = useState(initialData.length > 0 ? initialData : [defaultService]);
    const [isEditable, setIsEditable] = useState(false);

    useEffect(() => {
        if (initialData.length > 0) {
            setServices(initialData);
        }
    }, [initialData]);

    const handleInputChange = (index, field, value) => {
        const newServices = [...services];
        newServices[index][field] = value;
        setServices(newServices);
        setInitialData(newServices);
    };

    const handleAddService = () => {
        const newService = { id: services.length + 1, title: "", content: "", img: "", tempImageUrl: '' };
        setServices([...services, newService]);
        setInitialData([...services, newService]);
    };

    const handleDeleteService = (id) => {
        const updatedServices = services.filter(service => service.id !== id);
        setServices(updatedServices);
        setInitialData(updatedServices);
    };

    const handleImageChange = (index, event) => {
        const file = event.target.files[0];
        if (file) {
            const newImageUrl = URL.createObjectURL(file);
            const updatedServices = services.map((service, i) => i === index ? { ...service, tempImageUrl: newImageUrl, imageFile: file } : service);
            setServices(updatedServices);
            setInitialData(updatedServices);
        }
    };

    return (
        <Box mb="5rem" mt="200px" textAlign="center" maxW="1200px" mx="auto">
            <Heading as="h2" size="xl" mb="4rem" color="red.600">
                Our Identity
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
                        height="100vh"
                        width="100%"
                        align="center"
                        color="white"
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        bg="transparent"
                        boxShadow="lg"
                        borderRadius="md"
                    >
                        {isEditable ? (
                            <>
                                <FormControl mb={2}>
                                    <Input type="file" accept="image/*" id={`file-input-${index}`} onChange={e => handleImageChange(index, e)} style={{ display: 'none' }} />
                                    <IconButton icon={<FaUpload />} onClick={() => document.getElementById(`file-input-${index}`).click()} aria-label="Upload image" colorScheme="teal" mb={2} />
                                </FormControl>
                                {service.img || service.tempImageUrl ? (
                                    <Image src={service.tempImageUrl || service.img} alt="Service Image" objectFit="cover" height="50vh" width="100%" mb={2} />
                                ) : (
                                    <Box height="50vh" width="100%" mb={2} display="flex" justifyContent="center" alignItems="center" border="2px dashed gray">
                                        <Text color="gray.500">Image Placeholder</Text>
                                    </Box>
                                )}
                                <Input mb={2} value={service.title} onChange={e => handleInputChange(index, 'title', e.target.value)} placeholder="Service Title" />
                                <Textarea mb={2} value={service.content} onChange={e => handleInputChange(index, 'content', e.target.value)} placeholder="Service Content" />
                                <Stack direction="row" justify="center" spacing={4}>
                                    <IconButton icon={<CheckIcon />} size="sm" aria-label="Save service" variant="ghost" colorScheme="green" />
                                    <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteService(service.id)} size="sm" aria-label="Remove service" variant="ghost" colorScheme="red" />
                                </Stack>
                            </>
                        ) : (
                            <>
                                {service.img || service.tempImageUrl ? (
                                    <Image src={service.tempImageUrl || service.img} alt="Service Image" objectFit="cover" height="50vh" width="100%" mb={2} />
                                ) : (
                                    <Box height="50vh" width="100%" mb={2} display="flex" justifyContent="center" alignItems="center">
                                        {isEditable && <Text color="gray.500">Image Placeholder</Text>}
                                    </Box>
                                )}
                                <Text mb={2} fontWeight="bold" fontSize="2xl">{service.title}</Text>
                                <Text mb={2} fontSize="xl">{service.content}</Text>
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
                        height="100vh"
                        width="100%"
                        align="center"
                        color="gray.500"
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        cursor="pointer"
                        onClick={handleAddService}
                        bg="transparent"
                        boxShadow="lg"
                        borderRadius="md"
                    >
                        <AddIcon boxSize={10} />
                        <Text mt={4}>Add Service</Text>
                    </MotionBox>
                )}
            </Flex>
        </Box>
    );
};

export default Service;
