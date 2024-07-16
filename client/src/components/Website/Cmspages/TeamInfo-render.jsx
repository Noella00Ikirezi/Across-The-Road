import React, { useState, useEffect } from 'react';
import { Box, Flex, Image, Text, Heading } from '@chakra-ui/react';
import { fetchPageById } from '../../../api/cmsApi';

const TeamInfo = ({ pageId }) => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [teamInfo, setTeamInfo] = useState({ title: '', description: '' });

    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                const response = await fetchPageById(pageId);
                setTeamMembers(response.data.teamMembers || []);
                setTeamInfo(response.data.teamInfo || { title: '', description: '' });
            } catch (error) {
                console.error('Error fetching team data:', error);
            }
        };

        fetchTeamData();
    }, [pageId]);

    return (
        <Flex color="white" direction="column" align="center" padding="5rem">
            <Box mb="4" w="full" textAlign="center">
                <Heading as="h2" size="xl" mb="4">{teamInfo.title || 'Team'}</Heading>
                <Text>{teamInfo.description || 'Description not available'}</Text>
            </Box>
            <Flex wrap="wrap" justify="center" gap="4">
                {teamMembers.map(member => (
                    <Flex key={member.id} direction="column" align="center" w="300px" p="3" m="2" bg="#010132" color="white" borderRadius="lg" boxShadow="md">
                        <Image src={member.img} alt={member.name} boxSize="150px" borderRadius="full" objectFit="cover" m="auto" />
                        <Text fontSize="lg" fontWeight="bold" textShadow="1px 1px 2px #ffffff">{member.name}</Text>
                        <Text textShadow="1px 1px 2px #ffffff">{member.role}</Text>
                    </Flex>
                ))}
            </Flex>
        </Flex>
    );
};

export default TeamInfo;
