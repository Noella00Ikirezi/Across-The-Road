import React, { useState } from 'react';
import { Flex, Box, Image, Input, IconButton, Text, useToast, Switch, Stack } from '@chakra-ui/react';
import { FaUpload, FaCheck, FaTimes, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { useAuth } from '../../../api/authContext';
import { uploadTeamMember, deleteTeamMember } from '../../../api/API';

const defaultMember = {
    id: `default-member-${Date.now()}`,
    name: "Default Member",
    role: "Default Role",
    img: 'https://via.placeholder.com/150',
    tempImageUrl: ''
};

const TeamMember = () => {
    const [teamMembers, setTeamMembers] = useState([defaultMember]);
    const [editMemberIndex, setEditMemberIndex] = useState(null);
    const [isEditable, setIsEditable] = useState(false);
    const toast = useToast();
    const { authToken, userId } = useAuth();

    const handleAddMember = () => {
        const newMember = {
            id: `member-${Date.now()}`,
            name: "New Member",
            role: "New Role",
            img: '',
            tempImageUrl: ''
        };
        setTeamMembers([...teamMembers, newMember]);
        toast({
            title: 'Member added',
            description: 'A new team member has been added.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    };

    const handleSaveMember = async (index) => {
        const member = teamMembers[index];
        const formData = new FormData();
        formData.append('name', member.name);
        formData.append('role', member.role);
        formData.append('userId', userId); // Adding userId

        if (member.imageFile) {
            formData.append('team_image', member.imageFile);
        }

        try {
            await uploadTeamMember(formData, authToken);
            const updatedMembers = teamMembers.map((m, i) => (i === index ? { ...member, img: member.imageFile ? URL.createObjectURL(member.imageFile) : member.img } : m));
            setTeamMembers(updatedMembers);
            setEditMemberIndex(null);
            toast({
                title: 'Member updated',
                description: 'The team member has been updated successfully.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Error saving member:', error);
            toast({
                title: 'Error',
                description: 'Failed to save member.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleDeleteMember = async (id) => {
        try {
            await deleteTeamMember(id, authToken);
            const updatedMembers = teamMembers.filter(member => member.id !== id);
            setTeamMembers(updatedMembers);
            toast({
                title: 'Member deleted',
                description: 'The team member has been deleted successfully.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Error deleting member:', error);
            toast({
                title: 'Error',
                description: 'Failed to delete member.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
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
            <Flex wrap="wrap" justify="center" gap="4">
                {teamMembers.map((member, index) => (
                    <Flex key={member.id} direction="column" align="center" w="300px" p="3" m="2" bg="#010132" color="white" borderRadius="lg" boxShadow="md">
                        {isEditable && editMemberIndex === index ? (
                            <>
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
                                            onClick={() => setEditMemberIndex(index)}
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

export default TeamMember;
