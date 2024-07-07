import React, { useState } from 'react';
import { Flex, Button, Heading, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import { insertData } from '../../api/cmsApi';
import { useAuth } from '../../api/authContext';

import About from '../Website/Cms/About';
import Navbar from '../Website/Cms/Navbar';
import Footer from '../Website/Cms/Footer';
import FeedbackSection from '../Website/Cms/FeedbackSection';
import Service from '../Website/Cms/Service';
import TeamSection from '../Website/Cms/TeamSection';

const CMSItem = () => {
    const [pageData, setPageData] = useState({ title: '', url: '' });
    const [componentsData, setComponentsData] = useState({
        navbar: {},
        aboutSections: [],
        services: [],
        feedbacks: [],
        teamMembers: { members: [], info: {} },
        footer: {},
    });
    const { authToken } = useAuth(); // Ensure the authToken is used
    const toast = useToast();

    const appendImagesToFormData = (formData) => {
        console.log('Appending images to FormData');
        if (componentsData.navbar.logo) {
            formData.append('navbar_logo', componentsData.navbar.logo);
        }

        if (Array.isArray(componentsData.aboutSections)) {
            componentsData.aboutSections.forEach((section, index) => {
                if (section.imageFile) {
                    formData.append(`about_image_${index}`, section.imageFile);
                }
            });
        }

        componentsData.services.forEach((service, index) => {
            if (service.img) {
                formData.append(`service_image_${index}`, service.img);
            }
        });

        componentsData.feedbacks.forEach((feedback, index) => {
            if (feedback.img) {
                formData.append(`feedback_image_${index}`, feedback.img);
            }
        });

        componentsData.teamMembers.members.forEach((member, index) => {
            if (member.img) {
                formData.append(`team_image_${index}`, member.img);
            }
        });

        if (componentsData.footer.imageFile) {
            formData.append('footer_image', componentsData.footer.imageFile);
        }
    };

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

        try {
            console.log('Preparing to save page');
            const trimmedUrl = `/${pageData.title.trim().replace(/\s+/g, '-')}`;
            const page = { ...pageData, url: trimmedUrl, componentsData };

            const formData = new FormData();
            formData.append('title', page.title);
            formData.append('url', page.url);
            formData.append('componentsData', JSON.stringify(page.componentsData));

            appendImagesToFormData(formData);

            console.log('FormData prepared:', formData);
            console.log('AuthToken:', authToken);
            await insertData(formData, authToken); // Pass authToken here

            toast({
                title: 'Page saved',
                description: 'Page and components saved successfully.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Failed to save page:', error);
            let errorMessage = 'Failed to save page.';

            if (error.response && error.response.status === 400) {
                errorMessage = error.response.data.error === 'Page with the same URL already exists'
                    ? 'A page with the same URL already exists. Please choose a different title.'
                    : error.response.data.error;
            }

            toast({
                title: 'Error',
                description: errorMessage,
                status: 'error',
                duration: 5000,
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
            <Flex mb={4} justifyContent="space-between" alignItems="center">
                <Heading color="white">Create Page</Heading>
                <FormControl>
                    <FormLabel color="white">Page Title</FormLabel>
                    <Input color="white" type="text" name="title" value={pageData.title} onChange={handleChange} />
                </FormControl>
                <Button colorScheme="blue" onClick={handleSavePage}>Save Page</Button>
            </Flex>
            <Navbar
                initialData={componentsData.navbar}
                setInitialData={(data) => {
                    setComponentsData((prev) => ({ ...prev, navbar: data }));
                }}
            />
            <About
                initialData={componentsData.aboutSections}
                setInitialData={(data) => {
                    setComponentsData((prev) => ({ ...prev, aboutSections: data }));
                }}
            />
            <FeedbackSection
                initialData={componentsData.feedbacks}
                setInitialData={(data) => {
                    setComponentsData((prev) => ({ ...prev, feedbacks: data }));
                }}
            />
            <Service
                initialData={componentsData.services}
                setInitialData={(data) => {
                    setComponentsData((prev) => ({ ...prev, services: data }));
                }}
            />
            <TeamSection
                initialData={componentsData.teamMembers}
                setInitialData={(data) => {
                    setComponentsData((prev) => ({ ...prev, teamMembers: data }));
                }}
            />
            <Footer
                initialData={componentsData.footer}
                setInitialData={(data) => {
                    setComponentsData((prev) => ({ ...prev, footer: data }));
                }}
            />
        </Flex>
    );
};

export default CMSItem;
