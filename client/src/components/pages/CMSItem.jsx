import React, { useState, useEffect } from 'react';
import {
    Flex,
    Button,
    Heading,
    FormControl,
    FormLabel,
    Input,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton
} from '@chakra-ui/react';
import { useAuth } from '../../api/authContext';
import About from '../Website/Cms/About';
import Navbar from '../Website/Cms/Navbar';
import Footer from '../Website/Cms/Footer';
import Service from '../Website/Cms/Service';
import TeamInfo from '../Website/Cms/TeamInfo';
import TeamMember from '../Website/Cms/TeamMember';
import { createPage } from '../../api/API';

const CMSItem = () => {
    const [pageData, setPageData] = useState({ title: '', url: '' });
    const { authToken, userId, logout } = useAuth();
    const toast = useToast();
    const [isModalOpen, setIsModalOpen] = useState(true);

    useEffect(() => {
        if (!authToken) {
            logout();
        }
    }, [authToken, logout]);

    const handleSavePage = async () => {
        if (!pageData.title.trim()) {
            toast({
                title: 'Error',
                description: 'Page title cannot be empty.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        const trimmedUrl = `/${pageData.title.trim().replace(/\s+/g, '-')}`;
        const pagePayload = { title: pageData.title, url: trimmedUrl, userId };

        try {
            await createPage(pagePayload, authToken);
            setPageData((prev) => ({ ...prev, url: trimmedUrl }));
            setIsModalOpen(false);
            toast({
                title: 'Page initialized',
                description: 'You can now edit the page components.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Failed to create page:', error);
            toast({
                title: 'Error',
                description: 'Failed to create page.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPageData({ ...pageData, [name]: value });
    };

    return (
        <Flex direction="column" width="100%" bg="#010132" p={4}>
            <Modal isOpen={isModalOpen} onClose={() => {}} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Initialize Page</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Page Title</FormLabel>
                            <Input type="text" name="title" value={pageData.title} onChange={handleChange} />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={handleSavePage}>Save</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Flex mb={4} justifyContent="space-between" alignItems="center">
                <Heading color="white">Edit Page: {pageData.title}</Heading>
            </Flex>
            <Navbar pageId={pageData.url} userId={userId} />
            <About pageId={pageData.url} userId={userId} />
            <Service pageId={pageData.url} userId={userId} />
            <TeamInfo pageId={pageData.url} userId={userId} />
            <TeamMember pageId={pageData.url} userId={userId} />
            <Footer pageId={pageData.url} userId={userId} />
        </Flex>
    );
};

export default CMSItem;
