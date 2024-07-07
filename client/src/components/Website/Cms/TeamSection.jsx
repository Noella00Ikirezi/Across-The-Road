import React, { useState, useEffect } from 'react';
import { Box, Flex, Image, Input, Textarea, IconButton, Switch, Stack, Text, useToast, Heading, FormControl } from '@chakra-ui/react';
import { FaPlus, FaUpload, FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';

const defaultMember = {
    id: `default-member-${Date.now()}`,
    name: "Default Member",
    role: "Default Role",
    img: 'https://via.placeholder.com/150',
    tempImageUrl: ''
};

const defaultTeamInfo = {
    title: "Meet Our Team",
    description: "We are second-year students at ESGI, passionate about technology and eager to make a meaningful contribution to society..."
};

const TeamSection = ({ initialData = { members: [defaultMember], info: defaultTeamInfo }, setInitialData }) => {
    const [teamMembers, setTeamMembers] = useState(initialData.members);
    const [teamInfo, setTeamInfo] = useState(initialData.info);
    const [isEditable, setIsEditable] = useState(false);
    const [editMemberIndex, setEditMemberIndex] = useState(null);
    const [editTeamInfo, setEditTeamInfo] = useState(null);
    const toast = useToast();

    useEffect(() => {
        if (initialData) {
            setTeamMembers(initialData.members || []);
            setTeamInfo(initialData.info || {});
        }
    }, [initialData]);

    // Handlers for team info
    const handleEditTeamInfo = () => {
        setEditTeamInfo({ ...teamInfo });
    };

    const handleSaveTeamInfo = () => {
        setTeamInfo(editTeamInfo);
        setInitialData({ ...initialData, info: editTeamInfo });
        setEditTeamInfo(null);
        toast({
            title: 'Team info updated',
            description: 'The team info has been updated successfully.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    };

    const handleCancelTeamInfoEdit = () => {
        setEditTeamInfo(null);
    };

    // Handlers for team members
    const handleAddMember = () => {
        const newMember = {
            id: `member-${Date.now()}`,
            name: "New Member",
            role: "New Role",
            img: 'https://via.placeholder.com/150',
            tempImageUrl: ''
        };
        const updatedMembers = [...teamMembers, newMember];
        setTeamMembers(updatedMembers);
        setInitialData({ ...initialData, members: updatedMembers });
    };

    const handleEditMember = (index) => {
        setEditMemberIndex(index);
    };

    const handleSaveMember = (index) => {
        setEditMemberIndex(null);
        setInitialData({ ...initialData, members: teamMembers });
        toast({
            title: 'Member updated',
            description: 'The team member has been updated successfully.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    };

    const handleDeleteMember = (id) => {
        const updatedMembers = teamMembers.filter(member => member.id !== id);
        setTeamMembers(updatedMembers);
        setInitialData({ ...initialData, members: updatedMembers });
        toast({
            title: 'Member deleted',
            description: 'The team member has been deleted.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    };

    const handleInputChange = (index, field, value) => {
        const updatedMembers = [...teamMembers];
        updatedMembers[index][field] = value;
        setTeamMembers(updatedMembers);
    };

    const handleImageChange = (index, event) => {
        const file = event.target.files[0];
        if (file) {
            const newImageUrl = URL.createObjectURL(file);
            const updatedMembers = teamMembers.map((member, i) => i === index ? { ...member, tempImageUrl: newImageUrl, imageFile: file } : member);
            setTeamMembers(updatedMembers);
        }
    };

    const handleCancelEdit = () => {
        setEditMemberIndex(null);
    };

    return (
        <Flex color="white" direction="column" align="center" padding="5rem">
            <Stack direction="row" justifyContent="center" alignItems="center" mb={4}>
                <Text fontSize="lg" color="white" mr={2}>Edit Mode:</Text>
                <Switch isChecked={isEditable} onChange={() => setIsEditable(!isEditable)} />
            </Stack>
            <Box mb="4" w="full" textAlign="center">
                {isEditable && editTeamInfo ? (
                    <>
                        <Input
                            value={editTeamInfo.title}
                            placeholder="Title"
                            onChange={(e) => setEditTeamInfo({ ...editTeamInfo, title: e.target.value })}
                            mb="2"
                            color="white"
                            bg="transparent"
                        />
                        <Textarea
                            value={editTeamInfo.description}
                            placeholder="Description"
                            onChange={(e) => setEditTeamInfo({ ...editTeamInfo, description: e.target.value })}
                            color="white"
                            bg="transparent"
                        />
                        <Flex justifyContent="center" mt={2}>
                            <IconButton
                                icon={<FaCheck />}
                                onClick={handleSaveTeamInfo}
                                size="sm"
                                aria-label="Save"
                                colorScheme="green"
                                mr={2}
                            />
                            <IconButton
                                icon={<FaTimes />}
                                onClick={handleCancelTeamInfoEdit}
                                size="sm"
                                aria-label="Cancel"
                                colorScheme="red"
                            />
                        </Flex>
                    </>
                ) : (
                    <>
                        <Heading as="h2" size="xl" mb="4">{teamInfo.title}</Heading>
                        <Text>{teamInfo.description}</Text>
                        {isEditable && (
                            <IconButton
                                icon={<FaEdit />}
                                onClick={handleEditTeamInfo}
                                size="sm"
                                aria-label="Edit team info"
                                colorScheme="blue"
                                mt={2}
                            />
                        )}
                    </>
                )}
            </Box>
            <Flex wrap="wrap" justify="center" gap="4">
                {teamMembers.map((member, index) => (
                    <Flex key={member.id} direction="column" align="center" w="300px" p="3" m="2" bg="#010132" color="white" borderRadius="lg" boxShadow="md">
                        {isEditable && editMemberIndex === index ? (
                            <>
                                <FormControl mb={2} textAlign="center">
                                    <Box
                                        as="label"
                                        htmlFor={`file-input-${index}`}
                                        cursor="pointer"
                                        border="2px dashed gray"
                                        borderRadius="md"
                                        p="4"
                                        width="150px"
                                        height="150px"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        mb={2}
                                    >
                                        {member.tempImageUrl ? (
                                            <Image src={member.tempImageUrl} alt={member.name} boxSize="150px" borderRadius="full" objectFit="cover" />
                                        ) : (
                                            <>
                                                <FaUpload size={32} color="gray" />
                                                <Text mt={2} color="gray">Upload Image</Text>
                                            </>
                                        )}
                                    </Box>
                                    <Input type="file" accept="image/*" id={`file-input-${index}`} onChange={e => handleImageChange(index, e)} style={{ display: 'none' }} />
                                </FormControl>
                                <Input mb={2} value={member.name} onChange={e => handleInputChange(index, 'name', e.target.value)} placeholder="Name" color="white" />
                                <Input mb={2} value={member.role} onChange={e => handleInputChange(index, 'role', e.target.value)} placeholder="Role" color="white" />
                                <Flex justifyContent="center" mt={2}>
                                    <IconButton
                                        icon={<FaCheck />}
                                        onClick={() => handleSaveMember(index)}
                                        size="sm"
                                        aria-label="Save"
                                        colorScheme="green"
                                        mr={2}
                                    />
                                    <IconButton
                                        icon={<FaTimes />}
                                        onClick={handleCancelEdit}
                                        size="sm"
                                        aria-label="Cancel"
                                        colorScheme="red"
                                    />
                                </Flex>
                            </>
                        ) : (
                            <>
                                <Image src={member.tempImageUrl || member.img} alt={member.name} boxSize="150px" borderRadius="full" objectFit="cover" m="auto" />
                                <Text fontSize="lg" fontWeight="bold" textShadow="1px 1px 2px #ffffff">{member.name}</Text>
                                <Text textShadow="1px 1px 2px #ffffff">{member.role}</Text>
                                {isEditable && (
                                    <Flex justifyContent="center" mt={2}>
                                        <IconButton
                                            icon={<FaEdit />}
                                            onClick={() => handleEditMember(index)}
                                            size="sm"
                                            aria-label="Edit"
                                            colorScheme="blue"
                                            mr={2}
                                        />
                                        <IconButton
                                            icon={<FaTrash />}
                                            onClick={() => handleDeleteMember(member.id)}
                                            size="sm"
                                            aria-label="Delete"
                                            colorScheme="red"
                                        />
                                    </Flex>
                                )}
                            </>
                        )}
                    </Flex>
                ))}
                {isEditable && (
                    <Flex
                        direction="column"
                        align="center"
                        justify="center"
                        w="300px"
                        h="300px"
                        p="3"
                        m="2"
                        border="2px dashed gray"
                        borderRadius="lg"
                        cursor="pointer"
                        onClick={handleAddMember}
                    >
                        <FaPlus size={32} color="gray" />
                        <Text mt={2} color="gray">Add Member</Text>
                    </Flex>
                )}
            </Flex>
        </Flex>
    );
};

export default TeamSection;
