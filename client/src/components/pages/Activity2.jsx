import React from 'react';
import { Box, Text, Icon, Heading, Flex, List, ListItem, keyframes } from '@chakra-ui/react';
import { FaRegNewspaper, FaUsers, FaRegHandshake, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Navbar from "../Homepage/Navbar";
import Footer from "../Homepage/Footer";

const MotionBox = motion(Box);

const gradient = keyframes`
  0% { background-position: 0 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0 50%; }
`;

const Activity2 = () => {
    const steps = [
        { icon: FaRegNewspaper, title: 'Post Your Event', description: 'Easily post your events on our platform and reach a wider audience.' },
        { icon: FaUsers, title: 'Engage with Members', description: 'Engage with your community members by sharing articles and updates.' },
        { icon: FaRegHandshake, title: 'Connect with Other Associations', description: 'Collaborate with other associations and expand your network.' },
    ];

    const advantages = [
        'Increase visibility for your events and articles',
        'Reach a large audience across our network',
        'Simple and user-friendly posting process',
        'Engage with community members effectively',
        'Collaborate with other associations'
    ];

    return (
        <Box
            className="activity-container"
            bgGradient="linear(670deg, #6f13ad 0%, #010132 100%)"
            backgroundSize="200% 200%"
            animation={`${gradient} 30s ease infinite`}
            overflowX="hidden"
            padding="20px"
        >
            <Navbar />
            <Box padding="20px" marginTop="100px">
                <Heading as="h2" size="xl" mb="4rem" color="white" textAlign="center">
                    Amplifiez la Portée de Vos Événements grâce à notre Blog
                </Heading>
                <Text fontSize="lg" mb="4rem" color="white" textAlign="center">
                    Faites connaître vos événements à des milliers de membres à travers notre réseau dédié.
                </Text>

                <Heading as="h3" size="lg" mb="2rem" color="white" textAlign="center">
                    Avantages
                </Heading>
                <List spacing={3} color="white" mb="4rem" style={{ listStyleType: 'none' }}>
                    {advantages.map((advantage, index) => (
                        <ListItem key={index} fontSize="lg">
                            - {advantage}
                        </ListItem>
                    ))}
                </List>

                <Heading as="h3" size="lg" mb="2rem" color="white" textAlign="center">
                    Comment ça marche ?
                </Heading>
                <Flex direction="column" align="center" mb="4rem">
                    {steps.map((step, index) => (
                        <MotionBox
                            key={index}
                            bg="white"
                            color="#010132"
                            p={8}
                            mb="2rem"
                            borderRadius="50px"
                            textAlign="center"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                            width="80%"
                        >
                            <Icon as={step.icon} w={16} h={16} mb={4} color="#6f13ad" />
                            <Heading as="h4" size="md" mb={4}>
                                {step.title}
                            </Heading>
                            <Text fontSize="lg">
                                {step.description}
                            </Text>
                        </MotionBox>
                    ))}
                </Flex>

                <Heading as="h3" size="lg" mb="2rem" color="white" textAlign="center">
                    Intégration des Réseaux Sociaux
                </Heading>
                <Flex justifyContent="center" mb="4rem">
                    <Icon as={FaFacebook} w={12} h={12} color="white" mx={4} />
                    <Icon as={FaTwitter} w={12} h={12} color="white" mx={4} />
                    <Icon as={FaInstagram} w={12} h={12} color="white" mx={4} />
                    <Icon as={FaLinkedin} w={12} h={12} color="white" mx={4} />
                </Flex>
            </Box>
            <Footer />
        </Box>
    );
};

export default Activity2;
