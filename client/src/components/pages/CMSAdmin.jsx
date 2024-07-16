import React, { Component } from 'react';
import { Box, Heading, Text, Button, SimpleGrid, Center } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { fetchAllPages } from '../../api/cmsApi';

class CMSAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            websitePages: [],
        };
    }

    componentDidMount() {
        fetchAllPages()
            .then((response) => {
                this.setState({ websitePages: response.data });
            })
            .catch((error) => {
                console.error('Error fetching website pages:', error);
            });
    }

    render() {
        const { websitePages } = this.state;

        return (
            <Box bg="#010132" p="20px" minHeight="100vh">
                <Center>
                    <Box display="flex" justifyContent="center" width="100%">
                        <Box width="70%" margin="20px" height="100vh" overflowY="auto">
                            <Heading as="h1" size="xl" mb="40px" color="white" textAlign="center">
                                Website Pages
                            </Heading>
                            <SimpleGrid columns={[1, 2, 3]} spacing="40px">
                                {websitePages.map((page) => (
                                    <Box
                                        key={page.page.id}
                                        p="20px"
                                        boxShadow="md"
                                        borderRadius="lg"
                                        bg="white"
                                        color="black"
                                        textAlign="center"
                                    >
                                        <Heading as="h2" size="md" mb="10px">
                                            {page.page.title}
                                        </Heading>
                                        <Text fontSize="md">{page.page.url}</Text>
                                        <Link to={`/CMSPage/${page.page.id}`}>
                                            <Button colorScheme="blue" mt="20px" size="sm">
                                                View Page
                                            </Button>
                                        </Link>
                                    </Box>
                                ))}
                            </SimpleGrid>
                        </Box>
                    </Box>
                </Center>
            </Box>
        );
    }
}

export default CMSAdmin;
