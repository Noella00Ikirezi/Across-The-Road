import React, { useState, useEffect } from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { fetchPageById } from '../../../api/cmsApi';

const About = ({ pageId }) => {
    const [aboutData, setAboutData] = useState([]);

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const response = await fetchPageById(pageId);
                setAboutData(response.data.aboutSections || []);
            } catch (error) {
                console.error('Error fetching about data:', error);
            }
        };

        fetchAboutData();
    }, [pageId]);

    return (
        <Flex direction="column" align="center" justify="center" minHeight="100vh" color="white" width="100%" p="5rem">
            <Flex wrap="wrap" justify="center" gap={4}>
                {aboutData.map(section => (
                    <Flex key={section.id} direction="row" align="center" w="full" minHeight="100vh">
                        {section.imageUrl ? (
                            <Box flex="1" height="50vh" display="flex" justifyContent="center" alignItems="center">
                                <Image src={section.imageUrl} alt="About Section" objectFit="cover" height="100%" width="100%" borderRadius="md" />
                            </Box>
                        ) : (
                            <Box flex="1" height="50vh" border="2px dashed gray" borderRadius="md" display="flex" justifyContent="center" alignItems="center" textAlign="center" color="gray.500" m="4">
                                Image Placeholder
                            </Box>
                        )}
                        <Box flex="1" pl="4">
                            <Text fontSize="xl" fontWeight="bold" textAlign="center">{section.title || 'Title not available'}</Text>
                            <Text fontSize="md" textAlign="center" my="2">{section.content || 'Content not available'}</Text>
                        </Box>
                    </Flex>
                ))}
            </Flex>
        </Flex>
    );
};

export default About;
