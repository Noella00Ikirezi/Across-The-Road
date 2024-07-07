import React from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

const FeedbackSection = ({ initialData }) => {
    return (
        <Flex direction="column" align="center" justify="center" minHeight="100vh" color="white" width="100%" p="4">
            <Flex wrap="wrap" justify="center" gap={4}>
                {initialData.map(item => (
                    <Box key={item.id} textAlign="center" margin="2rem" w="300px" maxW="100%" h="auto" padding="10px" border="1px solid #ddd" borderRadius="10px" overflow="hidden" bgGradient="linear(to-b, #010132, #0a000e)" boxShadow="0 4px 8px rgba(255, 255, 255, 0.5)" transition="transform 0.3s ease, box-shadow 0.3s ease" _hover={{ transform: 'scale(1.05)', boxShadow: '0 8px 16px rgba(255, 255, 255, 0.5)' }}>
                        <Flex direction="column" justify="space-between" p="3rem" align="center" gap={4}>
                            <Image src={item.img} alt={`${item.name} photo`} boxSize="100px" borderRadius="full" objectFit="cover" m="auto" />
                            <Text fontSize="lg" fontWeight="bold">{item.name}</Text>
                            <Text fontSize="sm">{item.role}</Text>
                            <Text fontSize="md">{item.content}</Text>
                        </Flex>
                    </Box>
                ))}
            </Flex>
        </Flex>
    );
};

export default FeedbackSection;
