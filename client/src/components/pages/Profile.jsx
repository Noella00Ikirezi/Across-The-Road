import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, TextField, Button, Grid, Avatar, Typography, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getProfile, updateProfile } from '../../api/authApi';
import { fetchPagesByUserId } from '../../api/cmsApi';
import { useAuth } from '../../api/authContext';

const theme = createTheme();

const Profile = () => {
    const { authToken, userId } = useAuth();
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        birthday: '',
        phone: '',
        email: '',
        avatar: '',
    });
    const [userPages, setUserPages] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getProfile();
                const user = response.user;
                setProfileData({
                    firstName: user.first_name || '',
                    lastName: user.last_name || '',
                    birthday: user.birthday || '',
                    phone: user.phone || '',
                    email: user.email || '',
                    avatar: user.avatar || '',
                });
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch profile information.');
                setLoading(false);
            }
        };

        const fetchUserPages = async () => {
            try {
                const response = await fetchPagesByUserId(userId);
                setUserPages(response || []); // Ensure response is not null or undefined
            } catch (error) {
                console.error('Error fetching user pages:', error);
                setUserPages([]); // Set as empty array if there is an error
            } finally {
                setLoading(false);
            }
        };

        if (authToken) {
            fetchProfile();
            fetchUserPages();
        }
    }, [authToken, userId]);

    const handleChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        if (!profileData.firstName || !profileData.lastName || !profileData.birthday || !profileData.email || !profileData.phone) {
            setError('All fields are required');
            return;
        }
        try {
            await updateProfile({
                first_name: profileData.firstName,
                last_name: profileData.lastName,
                birthday: profileData.birthday,
                email: profileData.email,
                phone: profileData.phone,
                avatar: profileData.avatar,
            });
            setEditMode(false);
            alert('Profile updated successfully.');
        } catch (error) {
            setError('Failed to update profile information.');
        }
    };

    const handlePageClick = (pageId) => {
        navigate(`/CMSPage/${pageId}`);
    };

    if (!authToken) {
        return <div>Please log in to view your profile.</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const fullName = `${profileData.firstName} ${profileData.lastName}`;
    const defaultAvatar = 'https://bootdey.com/img/Content/avatar/avatar1.png';

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                sx={{
                    backgroundColor: "#010132",
                    minHeight: "100vh",
                    padding: "2rem",
                    color: "white",
                    overflow: "hidden" // Prevent scrolling
                }}
            >
                <Grid container direction="column" alignItems="center" sx={{ overflowX: 'hidden' }}>
                    <Grid item xs={12} md={8}>
                        <Card sx={{ mb: 4 }}>
                            <CardContent>
                                <Grid container spacing={3} justifyContent="center">
                                    <Grid item xs={12} sm={3} display="flex" justifyContent="center">
                                        <Avatar
                                            src={profileData.avatar || defaultAvatar}
                                            sx={{ width: 100, height: 100 }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={9}>
                                        <Typography variant="h5" align="center" gutterBottom>
                                            {fullName}
                                        </Typography>
                                        <form>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        fullWidth
                                                        label="First Name"
                                                        name="firstName"
                                                        value={profileData.firstName}
                                                        onChange={handleChange}
                                                        disabled={!editMode}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        fullWidth
                                                        label="Last Name"
                                                        name="lastName"
                                                        value={profileData.lastName}
                                                        onChange={handleChange}
                                                        disabled={!editMode}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        fullWidth
                                                        label="Birthday"
                                                        name="birthday"
                                                        value={profileData.birthday}
                                                        onChange={handleChange}
                                                        disabled={!editMode}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        fullWidth
                                                        label="Phone"
                                                        name="phone"
                                                        value={profileData.phone}
                                                        onChange={handleChange}
                                                        disabled={!editMode}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        fullWidth
                                                        label="Email"
                                                        name="email"
                                                        value={profileData.email}
                                                        onChange={handleChange}
                                                        disabled={!editMode}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    {editMode ? (
                                                        <Button variant="contained" color="primary" fullWidth onClick={handleSave}>
                                                            Save Changes
                                                        </Button>
                                                    ) : (
                                                        <Button variant="contained" color="primary" fullWidth onClick={() => setEditMode(true)}>
                                                            Edit Profile
                                                        </Button>
                                                    )}
                                                </Grid>
                                            </Grid>
                                        </form>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={10}>
                        <Typography variant="h6" gutterBottom>
                            My Pages
                        </Typography>
                        <Grid container spacing={3}>
                            {userPages.map((page) => (
                                <Grid item xs={12} sm={6} md={4} key={page.id}>
                                    <Card
                                        onClick={() => handlePageClick(page.id)}
                                        style={{
                                            cursor: 'pointer',
                                            backgroundColor: '#fff',
                                            color: '#000',
                                        }}
                                    >
                                        <CardContent>
                                            <Typography variant="h6">{page.title}</Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {page.url}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider>
    );
};

export default Profile;
