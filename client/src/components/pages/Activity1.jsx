import React from 'react';
import { Box, keyframes, Text, Flex, VStack, Heading, Icon, useColorMode } from '@chakra-ui/react';
import { FaCode, FaCogs, FaUsers } from 'react-icons/fa';
import Navbar from "../Homepage/Navbar";
import Footer from "../Homepage/Footer";

// Define keyframes for the background animation
const gradient = keyframes`
    0% { background-position: 0 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0 50%; }
`;

function Activity1() {
    const { colorMode } = useColorMode();
    const bgColor = colorMode === 'light' ? 'white' : 'gray.800';
    const textColor = colorMode === 'light' ? '#010132' : 'white';

    return (
        <Box
            className="home-container"
            bgGradient="linear(670deg, #6f13ad 0%, #010132 100%)"
            backgroundSize="200% 200%"
            animation={`${gradient} 30s ease infinite`}
            overflowX="hidden"
            padding="20px"
            minHeight="100vh"
            display="flex"
            flexDirection="column"
        >
            <Navbar />
            <Box flex="1" padding="20px" marginTop="100px">
                <Box bg={bgColor} padding="40px" borderRadius="md" boxShadow="lg" marginBottom="40px">
                    <VStack spacing="40px" align="stretch">
                        <Box textAlign="center">
                            <Heading as="h2" size="xl" color={textColor} mb="20px">
                                Nos Services
                            </Heading>
                            <Text fontSize="lg" color={textColor}>
                                Nous offrons un service complet de création de CMS adapté à vos besoins.
                                Que vous soyez une entreprise, une association ou un particulier, nous pouvons
                                vous aider à créer une présence en ligne robuste. Avec nos outils de création de CMS,
                                vous pouvez facilement personnaliser chaque aspect de votre site web pour qu'il réponde
                                parfaitement à vos besoins spécifiques. Notre équipe d'experts est là pour vous guider à
                                chaque étape du processus, de la conception à la mise en ligne.
                            </Text>
                        </Box>
                    </VStack>
                </Box>

                <Box bg={bgColor} padding="40px" borderRadius="md" boxShadow="lg" marginBottom="40px">
                    <Flex direction="column" alignItems="center" justify="center">
                        <Box textAlign="center" padding="20px" width="100%">
                            <Icon as={FaCode} w={16} h={16} color="#6f13ad" />
                            <Heading as="h3" size="lg" color={textColor} mt="20px">
                                Création de CMS
                            </Heading>
                            <Text fontSize="md" color={textColor} mt="10px">
                                Créez et gérez votre contenu facilement avec nos outils CMS de pointe.
                                Notre plateforme intuitive vous permet de construire des pages web
                                en quelques minutes, sans avoir besoin de connaissances en codage.
                                Chaque fonctionnalité est conçue pour maximiser votre efficacité et
                                vous permettre de vous concentrer sur l'essentiel : votre contenu.
                            </Text>
                        </Box>
                    </Flex>
                </Box>

                <Box bg={bgColor} padding="40px" borderRadius="md" boxShadow="lg" marginBottom="40px">
                    <Flex direction="column" alignItems="center" justify="center">
                        <Box textAlign="center" padding="20px" width="100%">
                            <Icon as={FaCogs} w={16} h={16} color="#6f13ad" />
                            <Heading as="h3" size="lg" color={textColor} mt="20px">
                                Personnalisation
                            </Heading>
                            <Text fontSize="md" color={textColor} mt="10px">
                                Personnalisez votre CMS pour répondre à vos besoins uniques et à l'identité
                                de votre marque. Notre système flexible vous permet de modifier les thèmes,
                                les mises en page et les composants pour créer un site web qui reflète
                                parfaitement votre vision. Avec nos options de personnalisation avancées,
                                chaque détail est entre vos mains.
                            </Text>
                        </Box>
                    </Flex>
                </Box>

                <Box bg={bgColor} padding="40px" borderRadius="md" boxShadow="lg" marginBottom="40px">
                    <Flex direction="column" alignItems="center" justify="center">
                        <Box textAlign="center" padding="20px" width="100%">
                            <Icon as={FaUsers} w={16} h={16} color="#6f13ad" />
                            <Heading as="h3" size="lg" color={textColor} mt="20px">
                                Collaboration Utilisateur
                            </Heading>
                            <Text fontSize="md" color={textColor} mt="10px">
                                Collaborez avec votre équipe de manière transparente grâce à nos outils
                                de gestion des utilisateurs intégrés. Invitez des membres de votre équipe,
                                attribuez des rôles et des permissions, et travaillez ensemble sur des projets
                                en temps réel. Notre plateforme facilite la communication et la collaboration,
                                permettant à votre équipe de rester synchronisée et productive.
                            </Text>
                        </Box>
                    </Flex>
                </Box>
            </Box>
            <Footer />
        </Box>
    );
}

export default Activity1;
