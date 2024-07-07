import React, { useRef, useEffect, useState } from 'react';
import { Box, Text, Icon, Button, Heading } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { FaLaptopCode, FaBullhorn, FaHandsHelping } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const MotionBox = motion(Box);

const Service = () => {
    const navigate = useNavigate();
    const services = [
        { id: '1', title: 'Création Rapide de Site Web', content: 'Lancez un site web pour votre association en quelques clics, sans coûts cachés.', route: '/activity1', icon: FaLaptopCode },
        { id: '2', title: 'Amplifiez la Portée de Vos Événements grâce à notre Blog', content: 'Faites connaître vos événements à des milliers de membres à travers notre réseau dédié.', route: '/activity2', icon: FaBullhorn },
        { id: '3', title: 'Engagez-vous dans la Vie Associative', content: 'Rejoignez et participez activement aux initiatives de votre communauté.', route: '/activity3', icon: FaHandsHelping },
    ];

    const ref = useRef();
    const [show, setShow] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setShow(true);
                        observer.disconnect();
                    }
                });
            },
            {
                threshold: 0.5
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <Box ref={ref} mt="200px" textAlign="center" justifyContent="center" alignContent="center">
    <Heading as="h2" size="xl" mb="4rem" color="white">
        Révolutionnez Votre Association avec Nos Sites Web Dynamiques
    </Heading>
    <Text margin="4rem" color="white">
        Chez <strong>Across The Road</strong>, nous offrons un CMS sur mesure et personnalisable
    </Text>
    {services.map((service, index) => (
        <MotionBox
            key={service.id}
            initial="hidden"
            animate={show ? 'visible' : 'hidden'}
            variants={variants}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            bg="#010132"  // Fond du MotionBox en rouge
            color="white"  // Texte blanc dans le MotionBox
            p={8}
            borderRadius="50px"
            mb="2rem"
            mx="10%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="300px"
            transform={index % 2 === 0 ? 'rotate(-2deg)' : 'rotate(2deg)'}
        >
            <Icon as={service.icon} w={32} h={32} mb={4} color="red" />  {/* Icône en rouge */}
            <Heading as="h3" size="lg" mb={4}>
                {service.title}
            </Heading>
            <Text fontSize="xl" mb={6} color="white">  {/* Augmentation de la taille du texte */}
                {service.content}
            </Text>
            <Button
                onClick={() => navigate(service.route)}
                rightIcon={<ArrowForwardIcon />}
                bg="red"  // Fond du bouton en rouge
                variant="solid"
                size="lg"
                color="white"  // Texte blanc dans le bouton
            >
                Voir plus
            </Button>
        </MotionBox>
    ))}
</Box>

    
    );
};

export default Service;
