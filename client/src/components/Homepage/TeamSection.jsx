import React from 'react';
import { Flex, Box, Text, Image, Heading } from '@chakra-ui/react';

// Team data
const teamData = [
    {
        id: "member-1",
        name: "Aurélien Bizien",
        role: "Chef de projet et Développeur",
        img: require('../../assets/aurelien.png')
    },
    {
        id: "member-2",
        name: "Jade Ponthieu",
        role: "Développeur",
        img: require('../../assets/jade.png')
    },
    {
        id: "member-3",
        name: "Nathan Cuvelier",
        role: "Développeur",
        img: require('../../assets/nathan.png')
    },
    {
        id: "member-4",
        name: "Edouard Xardel",
        role: "Développeur",
        img: require('../../assets/edouard.png')
    },
    {
        id: "member-5",
        name: "Noëlla Ikirezi",
        role: "Développeur",
        img: require('../../assets/noella.png')
    },
];

// Team member card component
const TeamMemberCard = ({ name, role, img }) => (
    <Box
        textAlign="center"
        margin="2rem"
        w="250px"
        h="300px"
        border="1px solid #ddd"
        borderRadius="10px"
        overflow="hidden"
        bgGradient="linear(to-b, #010132, #0a000e)"
        boxShadow="0 4px 8px rgba(255, 255, 255, 0.2)"
        transition="transform 0.3s ease, box-shadow 0.3s ease"
        _hover={{
            transform: 'scale(1.05)',
            boxShadow: '0 8px 16px rgba(255, 255, 255, 0.5)',
        }}
    >
        <Image
            src={img}
            alt={name}
            boxSize="100px"
            m="auto"
            mt="1rem"
            borderRadius="full"
            objectFit="cover"
        />
        <Text fontSize="18px" color="azure" my="0.5rem">{name}</Text>
        <Text color="azure" fontSize="14px">{role}</Text>
    </Box>
);

// Main component
const TeamSection = () => (
    <Box margin="8rem" mb="5rem" mt="200px" textAlign="center">
        <Heading as="h2" size="xl" mb="4rem" color="white">
            Découvrez Notre Équipe
        </Heading>

        <Text fontSize="lg" mb="4rem" color="white">
            Nous sommes des étudiants de deuxième année à l'ESGI, passionnés de technologie et désireux de contribuer de manière significative à la société. Ce CMS gratuit, conçu spécialement pour les associations, est le fruit de notre projet annuel. À travers ce projet, nous avons non seulement cherché à simplifier la création et la gestion de sites web pour les associations, mais nous avons également acquis une expérience précieuse en développement web, gestion de projet, et plus encore.
        </Text>

        <Flex wrap="wrap" justify="center" gap="3rem">
            {teamData.map(member => (
                <TeamMemberCard key={member.id} {...member} />
            ))}
        </Flex>

        <Text fontSize="lg" mb="4rem" color="white">
            Ce projet nous a permis de renforcer notre compréhension des enjeux techniques tout en aidant les associations à se concentrer sur leurs objectifs majeurs, rendant leur gestion quotidienne plus efficace et moins complexe. Notre but est de rendre la vie associative en ligne plus accessible et moins complexe.
        </Text>
    </Box>

);

export default TeamSection;
