import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Pie, Bar } from 'react-chartjs-2';

const DashboardCharts = ({ pages, posts, comments, users }) => {
    const pageData = {
        labels: pages.map(page => `Page ${page.id}`),
        datasets: [
            {
                label: 'Pages',
                data: pages.map(page => page.userId),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    const postData = {
        labels: posts.map(post => `Post ${post.id}`),
        datasets: [
            {
                label: 'Posts',
                data: posts.map(post => post.user_id),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    const commentData = {
        labels: comments.map(comment => `Comment ${comment.id}`),
        datasets: [
            {
                label: 'Comments',
                data: comments.map(comment => comment.user_id),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    const userData = {
        labels: users.map(user => user.email),
        datasets: [
            {
                label: 'Users',
                data: users.map(user => user.id),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    return (
        <Flex direction="column" align="center" justify="center">
            <Box width="80%" mb={6}>
                <Pie data={pageData} />
            </Box>
            <Box width="80%" mb={6}>
                <Bar data={postData} />
            </Box>
            <Box width="80%" mb={6}>
                <Pie data={commentData} />
            </Box>
            <Box width="80%">
                <Bar data={userData} />
            </Box>
        </Flex>
    );
};

export default DashboardCharts;
