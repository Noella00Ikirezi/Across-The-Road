import React, { useState, useEffect } from 'react';
import { Flex, Box, Text, Image, VStack, Divider } from '@chakra-ui/react';

const feedbackData = [
    {
        id: "feedback-1",
        content: "Un outil nécessaire pour la vivacité des associations.",
        name: "Jeane Dufour",
        title: "Fondateur association handifac",
        img: require('../../assets/people01.png')
    },
    {
        id: "feedback-2",
        content: "Produit fiable et visuellement à la hauteur.",
        name: "Jean Brillet",
        title: "Adhérent SSO",
        img: require('../../assets/people02.png')
    },
    {
        id: "feedback-3",
        content: "Remet une visibilité sur la vie des associations",
        name: "Eric Barbier",
        title: "Président de la commission associative du Nord",
        img: require('../../assets/people03.png')
    },
];

const FeedbackItem = ({ content, name, title, img }) => (
    <Box
        textAlign="center"
        margin="7rem"
        w="500px"
        maxW="100%"
        h="400px"
        border="1px solid #ddd"
        borderRadius="10px"
        overflow="hidden"
        bgGradient="linear(to-b, #010132, #0a000e)"
        boxShadow="0 4px 8px rgba(255, 255, 255, 0.5)"
        transition="transform 0.3s ease, box-shadow 0.3s ease"
        _hover={{
            transform: 'scale(1.05)',
            boxShadow: '0 8px 16px rgba(255, 255, 255, 0.5)',
        }}
    >
        <Flex direction="column" h="300px" justify="space-between" p="1rem" align="center">
            <Image
                src={img}
                alt={name}
                w="150px"
                h="200px"
                marginBottom="0rem"
                borderRadius="full"
                objectFit="cover"
                m="auto"
            />
            <Text fontSize="20px" p="10px" color="azure" mb="0.5rem">{content}</Text>
            <Text color="azure" fontSize="15px">{name} - <span>{title}</span></Text>
        </Flex>
    </Box>
);

const FeedbackSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % feedbackData.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Flex direction="row" wrap="nowrap" align="center" justify="center" mt="200px" >
            <VStack align="start" p="2rem" w="40%" bg="transparent">
                <Text fontSize="30px" fontWeight="bold" mb="1rem" color="white">
                    Avis et Commentaires
                </Text>
                <Text fontSize="20px" color="white">
                    Découvrez les retours de nos utilisateurs qui apprécient l'impact de notre
                    solution sur la dynamique associative. Chaque avis souligne l'importance
                    de notre outil dans leur quotidien et contribue à une meilleure visibilité.
                </Text>
            </VStack>
            <Divider orientation="vertical" borderColor="white" borderWidth="2px" height="500px"/>
            <Box w="60%" display="flex" justifyContent="center">
                <FeedbackItem {...feedbackData[activeIndex]} />
            </Box>
        </Flex>
    );
};

export default FeedbackSection;
