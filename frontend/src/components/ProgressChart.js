import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Fade,
} from '@mui/material';
import { TrendingUp } from '@mui/icons-material';

const ProgressChart = ({ hobbies }) => {
  const defaultHobbies = [
    { name: 'Leitura', progress: 75, color: '#4ECDC4' },
    { name: 'Exercícios', progress: 60, color: '#FF6B6B' },
    { name: 'Meditação', progress: 45, color: '#A29BFE' },
  ];

  const displayHobbies = hobbies.length > 0 ? hobbies : defaultHobbies;
  const totalProgress = displayHobbies.reduce((sum, hobby) => sum + hobby.progress, 0);
  const averageProgress = displayHobbies.length > 0 ? totalProgress / displayHobbies.length : 0;

  const getProgressColor = (progress) => {
    if (progress >= 80) return '#4CAF50';
    if (progress >= 50) return '#FF9800';
    return '#f44336';
  };

  return (
    <Fade in timeout={1400}>
      <Card
        sx={{
          background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(33, 150, 243, 0.1) 100%)',
          border: '1px solid rgba(76, 175, 80, 0.2)',
          backdropFilter: 'blur(20px)',
          '&:hover': {
            transform: 'translateY(-2px)',
            transition: 'all 0.3s ease',
          }
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <TrendingUp
              sx={{
                fontSize: '3rem',
                color: 'primary.main',
                mb: 2,
              }}
            />
            <Typography variant="h5" fontWeight="600" gutterBottom>
              Resumo dos Meus Progressos
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Acompanhe seu desenvolvimento pessoal
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom textAlign="center">
              Progresso Geral: {Math.round(averageProgress)}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={averageProgress}
              sx={{
                height: 12,
                borderRadius: 6,
                bgcolor: 'rgba(0,0,0,0.1)',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 6,
                  background: `linear-gradient(45deg, ${getProgressColor(averageProgress)} 30%, ${getProgressColor(averageProgress)}AA 90%)`,
                },
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {displayHobbies.map((hobby, index) => (
              <Box key={hobby.id || index}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="h6" sx={{ fontSize: '1.5rem' }}>
                      {hobby.icon}
                    </Typography>
                    <Typography variant="body1" fontWeight="500">
                      {hobby.name}
                    </Typography>
                  </Box>
                  <Typography variant="body2" fontWeight="600" color={getProgressColor(hobby.progress)}>
                    {hobby.progress}%
                  </Typography>
                </Box>
                
                <LinearProgress
                  variant="determinate"
                  value={hobby.progress}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: `${hobby.color}20`,
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 4,
                      background: `linear-gradient(45deg, ${hobby.color} 30%, ${hobby.color}CC 90%)`,
                    },
                  }}
                />
              </Box>
            ))}
          </Box>

          <Box sx={{ mt: 4, textAlign: 'center', p: 3, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              "O progresso não é apenas sobre chegar ao destino, mas sobre crescer durante a jornada 🌱"
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Fade>
  );
};

export default ProgressChart; 