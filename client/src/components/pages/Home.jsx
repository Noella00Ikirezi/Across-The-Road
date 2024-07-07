import React from 'react';
import { Box, keyframes } from '@chakra-ui/react';
import Navbar from '../Homepage/Navbar';
import Footer from '../Homepage/Footer';
import Service from '../Homepage/Service';
import FeedbackSection from '../Homepage/FeedbackSection';
import About from '../Homepage/About';
import TeamSection from '../Homepage/TeamSection';
import CreateCMS from '../Homepage/CreateCMS';

// Define keyframes for the background animation
const gradient = keyframes`
    0% { background-position: 0 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0 50%; }
`;

function Home() {
    return (
        <Box
            className="home-container"
            bgGradient="linear(670deg, #6f13ad 0%, #010132 100%)"
            backgroundSize="200% 200%"
            animation={`${gradient} 30s ease infinite`}
            overflowX="hidden"
            padding="20px"
        >
            <Navbar />
            <CreateCMS id="createcms" />
            <About id="about" />
            <Service id="services" />
            <FeedbackSection id="feedbacksection" />
            <TeamSection id="teamsection" />
            <Footer />
        </Box>
    );
}

export default Home;
