import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Fade,
} from '@mui/material';
import { FormatQuote, Edit } from '@mui/icons-material';

const QuoteCard = ({ phrase, onEdit }) => {
  const defaultPhrases = [
    "Seja a mudança que você quer ver no mundo ✨",
    "Cada dia é uma nova oportunidade de crescer 🌱",
    "O futuro pertence àqueles que acreditam em seus sonhos 💫",
    "Pequenos passos levam a grandes conquistas 🚀",
    "Sua única limitação é você mesmo 💪"
  ];

  const displayPhrase = phrase || defaultPhrases[Math.floor(Math.random() * defaultPhrases.length)];

  return (
    <Fade in timeout={800}>
      <Card
        sx={{
          background: 'linear-gradient(135deg, rgba(254, 107, 139, 0.1) 0%, rgba(255, 142, 83, 0.1) 100%)',
          border: '1px solid rgba(254, 107, 139, 0.2)',
          backdropFilter: 'blur(20px)',
          position: 'relative',
          overflow: 'visible',
          '&:hover': {
            transform: 'translateY(-2px)',
            transition: 'all 0.3s ease',
          }
        }}
      >
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <Box sx={{ position: 'relative' }}>
            <FormatQuote 
              sx={{ 
                fontSize: 40, 
                opacity: 0.3, 
                position: 'absolute',
                top: -10,
                left: -10,
                transform: 'rotate(180deg)'
              }} 
            />
            
            <Typography
              variant="h4"
              sx={{
                fontWeight: 400,
                fontStyle: 'italic',
                lineHeight: 1.4,
                color: 'text.primary',
                position: 'relative',
                zIndex: 1,
                px: 4,
              }}
            >
              "{displayPhrase}"
            </Typography>

            <FormatQuote 
              sx={{ 
                fontSize: 40, 
                opacity: 0.3, 
                position: 'absolute',
                bottom: -10,
                right: -10,
              }} 
            />
          </Box>

          <IconButton
            onClick={onEdit}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              opacity: 0.7,
              '&:hover': { opacity: 1 }
            }}
          >
            <Edit />
          </IconButton>
        </CardContent>
      </Card>
    </Fade>
  );
};

export default QuoteCard; 