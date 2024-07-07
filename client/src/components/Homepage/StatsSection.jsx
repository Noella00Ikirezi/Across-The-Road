import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, SimpleGrid, Center, Flex } from '@chakra-ui/react';
import axios from 'axios';
import { PieChart, Pie, Cell } from 'recharts';

const StatsSection = () => {
  const [stats, setStats] = useState({
    totalTables: 0,
    totalElements: 0,
    maxElementsInTable: 0,
    numWebsites: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:3001/websitePages');
        const websitePages = response.data;
        setStats(computeStats(websitePages));
      } catch (error) {
        console.error('Error fetching website pages:', error);
      }
    };

    fetchStats();
  }, []);

  const computeStats = (pages) => {
    let totalTables = 0;
    let totalElements = 0;
    let maxElementsInTable = 0;
    let numWebsites = 0;

    pages.forEach((page) => {
      numWebsites += page.formData && page.formData.title ? 1 : 0;

      page.components.forEach((component) => {
        totalTables++;
        const elementCount = Object.keys(component).length;
        totalElements += elementCount;
        maxElementsInTable = Math.max(maxElementsInTable, elementCount);
      });
    });

    return { totalTables, totalElements, maxElementsInTable, numWebsites };
  };

  const data = [
    { name: 'Total Websites', value: stats.numWebsites },
    { name: 'Total Tables', value: stats.totalTables },
    { name: 'Total Elements', value: stats.totalElements },
    { name: 'Max Elements in Table', value: stats.maxElementsInTable },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <Flex
      direction="column"
      color="white"
      p={4}
      borderRadius="md"
      minH="360px"
      textAlign="center"
    >
      <Heading as="h2" size="xl" mb={4}>
        Overview
      </Heading>
      <Text mb={6}>
        Ici on peut observer les statistiques de nos clients et utilisateurs.
      </Text>
      <Heading as="h2" size="lg" color="gray.200" mb={4}>
        Statistiques en temps réel
      </Heading>
      <Center>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={5}>
          {data.map((entry, index) => (
            <Box key={entry.name} p={3}>
              <PieChart width={200} height={200}>
                <Pie
                  data={[entry]}
                  cx={100}
                  cy={100}
                  innerRadius={60}
                  outerRadius={80}
                  fill={COLORS[index % COLORS.length]}
                  dataKey="value"
                >
                  {data.map((_, i) => (
                    <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
              <Text fontSize="xl" fontWeight="bold" mt={3}>
                {entry.value}
              </Text>
              <Text fontSize="md" color="gray.300">
                {entry.name}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Center>
    </Flex>
  );
};

export default StatsSection;
