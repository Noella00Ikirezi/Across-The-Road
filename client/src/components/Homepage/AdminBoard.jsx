import React, { useState, useEffect } from 'react';
import { Box, Heading, Center, Tabs, TabList, TabPanels, Tab, TabPanel, Table, Tbody, Td, Th, Thead, Tr, Select, Spinner } from '@chakra-ui/react';
import apiClient from '../../api/apiClient';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import LogTable from './LogTable';
import { logActivity } from '../../api/logApi';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

const AdminDashboard = () => {
    const [logFiles, setLogFiles] = useState([]);
    const [selectedLog, setSelectedLog] = useState('');
    const [logContent, setLogContent] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pages, setPages] = useState([]);
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchLogFiles();
        fetchPages();
        fetchUsers();
        fetchPosts();
        fetchComments();
        logActivity('Visited Admin Dashboard');
    }, []);

    const fetchLogFiles = async () => {
        try {
            const response = await apiClient.get('/logs');
            setLogFiles(response.data);
        } catch (error) {
            console.error('Error fetching log files:', error);
        }
    };

    const fetchLogContent = async (filename) => {
        setLoading(true);
        try {
            const response = await apiClient.get(`/logs/${filename}`);
            const parsedLog = response.data.split('\n').map((log) => {
                const [timestamp, level, message] = log.split(' ', 3);
                return { timestamp, level, message };
            });
            setLogContent(parsedLog);
            logActivity(`Viewed log file: ${filename}`);
        } catch (error) {
            console.error('Error fetching log content:', error);
        }
        setLoading(false);
    };

    const fetchPages = async () => {
        try {
            const response = await apiClient.get('/fetchAllPages');
            setPages(response.data.data);
        } catch (error) {
            console.error('Error fetching pages:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await apiClient.get('/users');
            setUsers(response.data.users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchPosts = async () => {
        try {
            const response = await apiClient.get('/posts');
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const fetchComments = async () => {
        try {
            const response = await apiClient.get('/comments');
            setComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleLogChange = (event) => {
        const filename = event.target.value;
        setSelectedLog(filename);
        fetchLogContent(filename);
    };

    const pageData = pages.map(page => ({
        title: page.page.title,
        url: page.page.url,
        userId: page.page.userId,
        navbar: page.navbar ? page.navbar.logo : 'None',
    }));

    const userData = users.map(user => ({
        id: user.id,
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
    }));

    const postData = posts.map(post => ({
        title: post.title,
        content: post.content,
        userName: post.userName,
    }));

    const commentData = comments.map(comment => ({
        content: comment.content,
        postId: comment.post_id,
        userName: comment.userName,
    }));

    const barChartData = {
        labels: pages.map(page => page.page.title),
        datasets: [
            {
                label: 'Pages Created',
                data: pages.map(page => page.page.userId),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    const pieChartData = {
        labels: users.map(user => user.email),
        datasets: [
            {
                label: 'User Posts',
                data: users.map(user => posts.filter(post => post.userEmail === user.email).length),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                ],
            },
        ],
    };

    return (
        <Box bg="#010132" p={4} minH="100vh">
            <Center>
                <Box width="90%">
                    <Heading as="h1" size="xl" mb="40px" color="white" textAlign="center">
                        Admin Dashboard
                    </Heading>
                    <Tabs variant="soft-rounded" colorScheme="green">
                        <TabList>
                            <Tab>Logs</Tab>
                            <Tab>Pages</Tab>
                            <Tab>Users</Tab>
                            <Tab>Posts</Tab>
                            <Tab>User Activity</Tab>
                            <Tab>Post Comments</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Box mb={4}>
                                    <Select placeholder="Select log file" value={selectedLog} onChange={handleLogChange} bg="white" color="black">
                                        {logFiles.map((file) => (
                                            <option key={file} value={file}>{file}</option>
                                        ))}
                                    </Select>
                                </Box>
                                <Box bg="white" color="black" p={4} borderRadius="md" boxShadow="md" height="60vh" overflowY="auto">
                                    {loading ? (
                                        <Center><Spinner /></Center>
                                    ) : (
                                        <LogTable logData={logContent} />
                                    )}
                                </Box>
                            </TabPanel>
                            <TabPanel>
                                <Table>
                                    <Thead>
                                        <Tr>
                                            <Th>Title</Th>
                                            <Th>URL</Th>
                                            <Th>User ID</Th>
                                            <Th>Navbar</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {pageData.map((page, index) => (
                                            <Tr key={index}>
                                                <Td>{page.title}</Td>
                                                <Td>{page.url}</Td>
                                                <Td>{page.userId}</Td>
                                                <Td>{page.navbar}</Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </TabPanel>
                            <TabPanel>
                                <Table>
                                    <Thead>
                                        <Tr>
                                            <Th>ID</Th>
                                            <Th>Name</Th>
                                            <Th>Email</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {userData.map((user, index) => (
                                            <Tr key={index}>
                                                <Td>{user.id}</Td>
                                                <Td>{user.name}</Td>
                                                <Td>{user.email}</Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </TabPanel>
                            <TabPanel>
                                <Table>
                                    <Thead>
                                        <Tr>
                                            <Th>Title</Th>
                                            <Th>Content</Th>
                                            <Th>User Name</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {postData.map((post, index) => (
                                            <Tr key={index}>
                                                <Td>{post.title}</Td>
                                                <Td>{post.content}</Td>
                                                <Td>{post.userName}</Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </TabPanel>
                            <TabPanel>
                                <Bar data={barChartData} />
                            </TabPanel>
                            <TabPanel>
                                <Pie data={pieChartData} />
                            </TabPanel>
                            <TabPanel>
                                <Table>
                                    <Thead>
                                        <Tr>
                                            <Th>Content</Th>
                                            <Th>Post ID</Th>
                                            <Th>User Name</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {commentData.map((comment, index) => (
                                            <Tr key={index}>
                                                <Td>{comment.content}</Td>
                                                <Td>{comment.postId}</Td>
                                                <Td>{comment.userName}</Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Center>
        </Box>
    );
};

export default AdminDashboard;
