import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { dashboardAPI } from '../services/api';
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  AppBar,
  Toolbar,
  Avatar,
  Button,
  Fab,
} from '@mui/material';
import {
  Logout,
  DarkMode,
  LightMode,
  Edit,
  Add,
} from '@mui/icons-material';

import PersonalityCard from '../components/PersonalityCard';
import MoodCard from '../components/MoodCard';
import HobbiesGrid from '../components/HobbiesGrid';
import ProgressChart from '../components/ProgressChart';
import QuoteCard from '../components/QuoteCard';
import EditProfileModal from '../components/EditProfileModal';
import EditHobbyModal from '../components/EditHobbyModal';

const Dashboard = () => {
  const { user, logout, updateUser } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [editHobbyOpen, setEditHobbyOpen] = useState(false);
  const [selectedHobby, setSelectedHobby] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const response = await dashboardAPI.getDashboard();
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditHobby = (hobby) => {
    setSelectedHobby(hobby);
    setEditHobbyOpen(true);
  };

  const handleCreateHobby = () => {
    setSelectedHobby(null);
    setEditHobbyOpen(true);
  };

  const handleProfileUpdate = async (profileData) => {
    try {
      const response = await dashboardAPI.updateProfile(profileData);
      updateUser(response.data.user);
      setEditProfileOpen(false);
      loadDashboardData();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleHobbyUpdate = async () => {
    setEditHobbyOpen(false);
    loadDashboardData();
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography>Carregando...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'transparent', backdropFilter: 'blur(20px)' }}>
        <Toolbar>
          <Avatar
            sx={{
              mr: 2,
              bgcolor: 'primary.main',
              background: user?.color_preferences?.primary || 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
            }}
          >
            {user?.name?.charAt(0)?.toUpperCase()}
          </Avatar>
          
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="div">
              {getGreeting()}, {user?.name?.split(' ')[0]}!
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              {user?.daily_phrase || 'Tenha um dia incrível! ✨'}
            </Typography>
          </Box>

          <IconButton color="inherit" onClick={toggleDarkMode} sx={{ mr: 1 }}>
            {darkMode ? <LightMode /> : <DarkMode />}
          </IconButton>

          <IconButton color="inherit" onClick={() => setEditProfileOpen(true)} sx={{ mr: 1 }}>
            <Edit />
          </IconButton>

          <Button color="inherit" onClick={logout} startIcon={<Logout />}>
            Sair
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {/* Quote of the Day */}
          <Grid item xs={12}>
            <QuoteCard phrase={user?.daily_phrase} onEdit={() => setEditProfileOpen(true)} />
          </Grid>

          {/* Mood & Personality Row */}
          <Grid item xs={12} md={6}>
            <MoodCard 
              currentMood={user?.current_mood} 
              onEdit={() => setEditProfileOpen(true)} 
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <PersonalityCard 
              user={user} 
              onEdit={() => setEditProfileOpen(true)} 
            />
          </Grid>

          {/* Hobbies Grid */}
          <Grid item xs={12}>
            <HobbiesGrid 
              hobbies={dashboardData?.hobbies || []}
              onEdit={handleEditHobby}
              onCreate={handleCreateHobby}
            />
          </Grid>

          {/* Progress Chart */}
          <Grid item xs={12}>
            <ProgressChart hobbies={dashboardData?.hobbies || []} />
          </Grid>
        </Grid>
      </Container>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        }}
        onClick={handleCreateHobby}
      >
        <Add />
      </Fab>

      {/* Modals */}
      <EditProfileModal
        open={editProfileOpen}
        onClose={() => setEditProfileOpen(false)}
        user={user}
        onSave={handleProfileUpdate}
      />

      <EditHobbyModal
        open={editHobbyOpen}
        onClose={() => setEditHobbyOpen(false)}
        hobby={selectedHobby}
        onSave={handleHobbyUpdate}
      />
    </Box>
  );
};

export default Dashboard; 