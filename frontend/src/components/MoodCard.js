import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
  Fade,
} from '@mui/material';
import { Edit } from '@mui/icons-material';

const MoodCard = ({ currentMood, onEdit }) => {
  const moods = {
    feliz: { emoji: '😄', color: '#FFD700', label: 'Feliz' },
    alegre: { emoji: '😊', color: '#FF6B6B', label: 'Alegre' },
    motivado: { emoji: '🚀', color: '#4ECDC4', label: 'Motivado' },
    relaxado: { emoji: '😌', color: '#45B7D1', label: 'Relaxado' },
    energico: { emoji: '⚡', color: '#96CEB4', label: 'Energético' },
    pensativo: { emoji: '🤔', color: '#FFEAA7', label: 'Pensativo' },
    criativo: { emoji: '🎨', color: '#DDA0DD', label: 'Criativo' },
    determinado: { emoji: '💪', color: '#FF7675', label: 'Determinado' },
    grato: { emoji: '🙏', color: '#74B9FF', label: 'Grato' },
    inspirado: { emoji: '✨', color: '#A29BFE', label: 'Inspirado' },
  };

  const currentMoodData = moods[currentMood?.toLowerCase()] || {
    emoji: '😊',
    color: '#FF6B6B',
    label: 'Bem-humorado'
  };

  return (
    <Fade in timeout={1000}>
      <Card
        sx={{
          background: `linear-gradient(135deg, ${currentMoodData.color}20 0%, ${currentMoodData.color}10 100%)`,
          border: `1px solid ${currentMoodData.color}40`,
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
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                textAlign: 'center',
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: '4rem',
                  lineHeight: 1,
                  mb: 2,
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                }}
              >
                {currentMoodData.emoji}
              </Typography>

              <Typography variant="h5" fontWeight="600" gutterBottom>
                Como estou me sentindo
              </Typography>

              <Chip
                label={currentMoodData.label}
                sx={{
                  bgcolor: currentMoodData.color,
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '1rem',
                  px: 2,
                  py: 1,
                  '& .MuiChip-label': {
                    px: 2,
                  }
                }}
              />

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 2, opacity: 0.8 }}
              >
                Meu humor de hoje reflete minha energia
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Fade>
  );
};

export default MoodCard; 