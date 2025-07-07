import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  LinearProgress,
  Grid,
  Chip,
  Fade,
  Button,
} from '@mui/material';
import { Edit, Add, EmojiEvents } from '@mui/icons-material';

const HobbiesGrid = ({ hobbies, onEdit, onCreate }) => {
  const defaultHobbies = [
    { id: 1, name: 'Leitura', icon: '📚', color: '#4ECDC4', progress: 75, goal: 100 },
    { id: 2, name: 'Exercícios', icon: '🏃‍♂️', color: '#FF6B6B', progress: 60, goal: 100 },
    { id: 3, name: 'Meditação', icon: '🧘‍♀️', color: '#A29BFE', progress: 45, goal: 100 },
  ];

  const displayHobbies = hobbies.length > 0 ? hobbies : defaultHobbies;

  const getProgressColor = (progress) => {
    if (progress >= 80) return '#4CAF50';
    if (progress >= 50) return '#FF9800';
    return '#f44336';
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight="600">
          Meus Hobbies & Objetivos
        </Typography>
        <Button
          startIcon={<Add />}
          variant="contained"
          onClick={onCreate}
          sx={{
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            '&:hover': {
              background: 'linear-gradient(45deg, #FE6B8B 60%, #FF8E53 100%)',
            }
          }}
        >
          Adicionar Hobby
        </Button>
      </Box>

      <Grid container spacing={3}>
        {displayHobbies.map((hobby, index) => (
          <Grid item xs={12} sm={6} md={4} key={hobby.id || index}>
            <Fade in timeout={800 + index * 200}>
              <Card
                sx={{
                  background: `linear-gradient(135deg, ${hobby.color}20 0%, ${hobby.color}10 100%)`,
                  border: `1px solid ${hobby.color}40`,
                  backdropFilter: 'blur(20px)',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'all 0.3s ease',
                  }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ position: 'relative' }}>
                    <IconButton
                      onClick={() => onEdit(hobby)}
                      sx={{
                        position: 'absolute',
                        top: -8,
                        right: -8,
                        opacity: 0.7,
                        '&:hover': { opacity: 1 }
                      }}
                    >
                      <Edit fontSize="small" />
                    </IconButton>

                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                      <Typography
                        variant="h2"
                        sx={{ fontSize: '3rem', lineHeight: 1, mb: 1 }}
                      >
                        {hobby.icon}
                      </Typography>
                      
                      <Typography variant="h6" fontWeight="600" gutterBottom>
                        {hobby.name}
                      </Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Progresso
                        </Typography>
                        <Typography variant="body2" fontWeight="600">
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
                            bgcolor: getProgressColor(hobby.progress),
                          },
                        }}
                      />
                    </Box>

                    {hobby.progress >= 80 && (
                      <Chip
                        icon={<EmojiEvents />}
                        label="Quase lá!"
                        size="small"
                        sx={{
                          bgcolor: '#4CAF5020',
                          color: '#4CAF50',
                          border: '1px solid #4CAF5040',
                          fontWeight: 600,
                        }}
                      />
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HobbiesGrid; 