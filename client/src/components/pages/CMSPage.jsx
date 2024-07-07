import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Flex, Heading, Spinner } from '@chakra-ui/react';
import { fetchPageById } from '../../api/cmsApi';

import About from '../Website/Cmspages/About-render';
import Navbar from '../Website/Cmspages/Navbar-render';
import Footer from '../Website/Cmspages/Footer-render';
import FeedbackSection from '../Website/Cmspages/FeedbackSection-render';
import Service from '../Website/Cmspages/Service-render';
import TeamSection from '../Website/Cmspages/TeamSection-render';

const CMSPage = () => {
    const { id } = useParams();
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPageData = async () => {
            try {
                const response = await fetchPageById(id);
                setPageData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching page data:', error);
                setLoading(false);
            }
        };
        getPageData();
    }, [id]);

    if (loading) {
        return (
            <Flex justify="center" align="center" height="100vh">
                <Spinner size="xl" />
            </Flex>
        );
    }

    if (!pageData) {
        return (
            <Flex justify="center" align="center" height="100vh">
                <Heading color="white">Page not found</Heading>
            </Flex>
        );
    }

    return (
        <Flex direction="column" width="100%" bg="#010132" p={4}>
            <Navbar initialData={pageData.navbar} />
            <About initialData={pageData.aboutSections} />
            <FeedbackSection initialData={pageData.feedbacks} />
            <Service initialData={pageData.services} />
            <TeamSection initialData={pageData.teamMembers} />
            <Footer initialData={pageData.footer} />
        </Flex>
    );
};

export default CMSPage;
