import React from 'react';
import { Box, Heading, Text, SimpleGrid, Center } from '@chakra-ui/react';

const StatsSection = () => {
  // Données statiques pour la démonstration
  const data = [
    { name: 'Total Websites', value: 10 },
    { name: 'Total Tables', value: 20 },
    { name: 'Total Elements', value: 100 },
    { name: 'Max Elements in Table', value: 50 },
  ];

  return (
    <Box
      bgGradient="linear-gradient(270deg, #010132 100%, #6f13ad 0%)" 
      color="white"
      p="4"
      borderRadius="md"
      border="1px solid white"
      backgroundPosition="center"
      flex="1"
    >
      <Box p="6" borderRadius="lg" mb="4" padding="2rem" textAlign="center">
        <Heading as="h2" size="lg" mb="2" color="white">
          Aperçu
        </Heading>
        <Text color="white">
          Vous trouverez ici des statistiques en temps réel sur les données du site Web.
        </Text>
      </Box>
      <Heading as="h2" size="lg" mb="4" color="gray.200">
        Statistiques en Temps Réel
      </Heading>
      <Center>
        <SimpleGrid columns={2} spacing={4} justifyItems="center">
          {data.map((entry, index) => (
            <Box key={entry.name} textAlign="center">
              <Box
                width="100px"
                height="100px"
                bg={index % 2 === 0 ? '#0088FE' : '#00C49F'}
                borderRadius="50%"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                boxShadow="md"
              >
                <Text color="white" fontSize="xl" fontWeight="bold">
                  {entry.value}
                </Text>
                <Text color="gray.300" fontSize="md">
                  {entry.name}
                </Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Center>
    </Box>
  );
};

export default StatsSection;
