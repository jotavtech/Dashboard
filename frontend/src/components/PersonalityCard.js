import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
  Avatar,
  Fade,
} from '@mui/material';
import { Edit, Psychology } from '@mui/icons-material';

const PersonalityCard = ({ user, onEdit }) => {
  const personalityTraits = [
    { label: 'Criativo', icon: '🎨', color: '#FF6B6B' },
    { label: 'Determinado', icon: '💪', color: '#4ECDC4' },
    { label: 'Curioso', icon: '🔍', color: '#45B7D1' },
    { label: 'Empático', icon: '❤️', color: '#96CEB4' },
    { label: 'Inovador', icon: '💡', color: '#FFEAA7' },
  ];

  const favoriteColors = user?.color_preferences || {
    primary: '#1976d2',
    secondary: '#dc004e'
  };

  return (
    <Fade in timeout={1200}>
      <Card
        sx={{
          background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(220, 0, 78, 0.1) 100%)',
          border: '1px solid rgba(25, 118, 210, 0.2)',
          backdropFilter: 'blur(20px)',
          height: '100%',
          '&:hover': {
            transform: 'translateY(-2px)',
            transition: 'all 0.3s ease',
          }
        }}
      >
        <CardContent sx={{ p: 3, height: '100%' }}>
          <Box sx={{ position: 'relative', height: '100%' }}>
            <IconButton
              onClick={onEdit}
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                opacity: 0.7,
                '&:hover': { opacity: 1 }
              }}
            >
              <Edit />
            </IconButton>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Avatar
                  sx={{
                    mx: 'auto',
                    mb: 2,
                    width: 64,
                    height: 64,
                    background: `linear-gradient(45deg, ${favoriteColors.primary} 30%, ${favoriteColors.secondary} 90%)`,
                  }}
                >
                  <Psychology fontSize="large" />
                </Avatar>
                
                <Typography variant="h6" fontWeight="600" gutterBottom>
                  Minha Personalidade
                </Typography>
              </Box>

              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Características
                </Typography>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                  {personalityTraits.slice(0, 3).map((trait, index) => (
                    <Chip
                      key={index}
                      label={`${trait.icon} ${trait.label}`}
                      sx={{
                        bgcolor: `${trait.color}20`,
                        border: `1px solid ${trait.color}40`,
                        color: 'text.primary',
                        fontWeight: 500,
                      }}
                    />
                  ))}
                </Box>

                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Cores Favoritas
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: favoriteColors.primary,
                      border: '2px solid white',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                  />
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: favoriteColors.secondary,
                      border: '2px solid white',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    Definem meu estilo
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  "Cada pessoa é única e especial 🌟"
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Fade>
  );
};

export default PersonalityCard; 