import React, { useState } from 'react';
import { Box, Flex, Input, Textarea, IconButton, Heading, Text, useToast, Switch, Stack } from '@chakra-ui/react';
import { FaCheck, FaTimes, FaEdit } from 'react-icons/fa';
import { useAuth } from '../../../api/authContext';
import { uploadTeamInfo } from '../../../api/API';

const TeamInfo = ({ pageId }) => {
    const [teamInfo, setTeamInfo] = useState({ title: 'Meet Our Team', description: 'We are second-year students at ESGI, passionate about technology and eager to make a meaningful contribution to society...' });
    const [editTeamInfo, setEditTeamInfo] = useState(null);
    const [isEditable, setIsEditable] = useState(false);
    const toast = useToast();
    const { authToken, userId } = useAuth();

    const handleEditTeamInfo = () => {
        setEditTeamInfo({ ...teamInfo });
    };

    const handleSaveTeamInfo = async () => {
        try {
            await uploadTeamInfo({ ...editTeamInfo, userId }, authToken); // Sending userId
            setTeamInfo(editTeamInfo);
            setEditTeamInfo(null);
            setIsEditable(false);
            toast({
                title: 'Team info updated',
                description: 'The team info has been updated successfully.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Error saving team info:', error);
            toast({
                title: 'Error',
                description: 'Failed to save team info.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleCancelTeamInfoEdit = () => {
        setEditTeamInfo(null);
        setIsEditable(false);
    };

    return (
        <Box color="white" mb="4" w="full" textAlign="center">
            <Stack direction="row" justifyContent="center" alignItems="center" mb={4}>
                <Text fontSize="lg" color="white" mr={2}>Edit Mode:</Text>
                <Switch isChecked={isEditable} onChange={() => setIsEditable(!isEditable)} />
            </Stack>
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
                    <Heading color="white" as="h2" size="xl" mb="4">{teamInfo.title}</Heading>
                    <Text>{teamInfo.description}</Text>
                    <IconButton
                        icon={<FaEdit />}
                        onClick={() => { setIsEditable(true); handleEditTeamInfo(); }}
                        size="sm"
                        aria-label="Edit team info"
                        colorScheme="blue"
                        mt={2}
                    />
                </>
            )}
        </Box>
    );
};

export default TeamInfo;
