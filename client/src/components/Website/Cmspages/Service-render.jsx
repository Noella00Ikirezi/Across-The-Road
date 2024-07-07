import React from 'react';
import { Box, Flex, Image, Text, Heading } from '@chakra-ui/react';

const Service = ({ initialData }) => {
    return (
        <Box mb="5rem" mt="200px" textAlign="center" maxW="1200px" mx="auto">
            <Heading as="h2" size="xl" mb="4rem" color="red.600">
                Our Services
            </Heading>
            <Flex direction="column" alignItems="center" gap={6}>
                {initialData.map(service => (
                    <Flex key={service.id} direction="column" align="center" w="300px" p="3" m="2" bg="#010132" color="white" borderRadius="lg" boxShadow="md">
                        {service.img ? (
                            <Image src={service.img} alt={service.title} boxSize="150px" borderRadius="full" objectFit="cover" m="auto" />
                        ) : (
                            <Box width="150px" height="150px" borderWidth="2px" borderStyle="dashed" borderColor="white" display="flex" alignItems="center" justifyContent="center">
                                <Text color="white">Image Placeholder</Text>
                            </Box>
                        )}
                        <Text fontSize="lg" fontWeight="bold">{service.title}</Text>
                        <Text>{service.content}</Text>
                    </Flex>
                ))}
            </Flex>
        </Box>
    );
};

export default Service;
