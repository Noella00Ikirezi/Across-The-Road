import React from 'react';
import { Box, Text, keyframes } from '@chakra-ui/react';
import aboutVideo from '../../assets/democls.mp4';


const gradient = keyframes`
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
`;

const About = () => {
    return (
        <Box
            padding="6rem"
            textAlign="center"
            marginBottom="10rem"
            marginTop="5rem"
            bgGradient="linear(to-r, #010132, purple.400, #010132)"
            backgroundSize="400% 400%"
            animation={`${gradient} 30s ease infinite`}
        >
            <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                gap="3rem"
                margin="0 auto"
                maxWidth="100%"
            >
                <Box textAlign="left" maxWidth="500px">
                    <Text fontSize={{ base: '2xl', md: '4xl' }} color="#ffffff" mb="1rem">
                        Simples, intuitives, ludiques.
                    </Text>
                    <Text fontSize="xl" color="#ffffff" lineHeight="1.5">
                        Nous pensons que la création d’un site devrait toujours être simple, agréable et abordable.
                        Notre mission est simple.
                    </Text>
                    <Text fontSize="xl" color="#ffffff" lineHeight="1.5" mt="1rem">
                        Vous donner les moyens de créer et de gérer un site de qualité professionnelle en toute liberté, de façon autonome quelles que soient vos connaissances techniques.
                    </Text>
                </Box>
                <Box width="600px" height="auto" borderRadius="8px" overflow="hidden">
                    <video
                        src={aboutVideo}
                        alt="About"
                        width="100%"
                        height="auto"
                        autoPlay
                        loop
                        muted
                        style={{ borderRadius: '8px' }}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default About;
