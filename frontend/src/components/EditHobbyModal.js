import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  IconButton,
  Slider,
  Card,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { dashboardAPI } from '../services/api';

const EditHobbyModal = ({ open, onClose, hobby, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    icon: '',
    color: '#4ECDC4',
    progress: 0,
    goal: 100,
    is_active: true,
  });
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (hobby) {
      setFormData({
        name: hobby.name || '',
        icon: hobby.icon || '',
        color: hobby.color || '#4ECDC4',
        progress: hobby.progress || 0,
        goal: hobby.goal || 100,
        is_active: hobby.is_active !== undefined ? hobby.is_active : true,
      });
    } else {
      setFormData({
        name: '',
        icon: '',
        color: '#4ECDC4',
        progress: 0,
        goal: 100,
        is_active: true,
      });
    }
  }, [hobby]);

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleSliderChange = (field) => (event, newValue) => {
    setFormData({
      ...formData,
      [field]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (hobby?.id) {
        await dashboardAPI.updateHobby(hobby.id, formData);
      } else {
        await dashboardAPI.createHobby(formData);
      }
      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving hobby:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (hobby?.id && window.confirm('Tem certeza que deseja excluir este hobby?')) {
      setLoading(true);
      try {
        await dashboardAPI.deleteHobby(hobby.id);
        onSave();
        onClose();
      } catch (error) {
        console.error('Error deleting hobby:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const hobbyIcons = [
    '📚', '🏃‍♂️', '🧘‍♀️', '🎨', '🎵', '🍳', '🌱', '💻',
    '📸', '✍️', '🎯', '🏋️‍♂️', '🎪', '🎭', '🎮', '🧩',
    '🎸', '🎹', '🎺', '🎻', '🏊‍♂️', '🚴‍♂️', '🧗‍♂️', '⛷️'
  ];

  const colorPalette = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#FF7675', '#74B9FF', '#A29BFE', '#6C5CE7',
    '#FD79A8', '#FDCB6E', '#E17055', '#00B894', '#00CEC9'
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">
          {hobby ? 'Editar Hobby' : 'Adicionar Novo Hobby'}
        </Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nome do Hobby"
                value={formData.name}
                onChange={handleChange('name')}
                required
                placeholder="Ex: Leitura, Exercícios, Pintura..."
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Escolha um ícone:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {hobbyIcons.map((icon) => (
                  <Card
                    key={icon}
                    sx={{
                      p: 1,
                      cursor: 'pointer',
                      border: formData.icon === icon ? '2px solid' : '1px solid #ccc',
                      borderColor: formData.icon === icon ? 'primary.main' : '#ccc',
                      '&:hover': { bgcolor: 'action.hover' },
                    }}
                    onClick={() => setFormData({ ...formData, icon })}
                  >
                    <Typography variant="h6">{icon}</Typography>
                  </Card>
                ))}
              </Box>
              
              <TextField
                fullWidth
                label="Ou digite um emoji"
                value={formData.icon}
                onChange={handleChange('icon')}
                placeholder="🎯"
                helperText="Você pode usar qualquer emoji ou deixar vazio"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Escolha uma cor:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {colorPalette.map((color) => (
                  <Box
                    key={color}
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      bgcolor: color,
                      cursor: 'pointer',
                      border: formData.color === color ? '3px solid' : '2px solid white',
                      borderColor: formData.color === color ? 'primary.main' : 'white',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                      '&:hover': { transform: 'scale(1.1)' },
                    }}
                    onClick={() => setFormData({ ...formData, color })}
                  />
                ))}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Progresso atual: {formData.progress}%
              </Typography>
              <Slider
                value={formData.progress}
                onChange={handleSliderChange('progress')}
                min={0}
                max={100}
                step={5}
                marks
                valueLabelDisplay="auto"
                sx={{
                  color: formData.color,
                  '& .MuiSlider-thumb': {
                    bgcolor: formData.color,
                  },
                  '& .MuiSlider-track': {
                    bgcolor: formData.color,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Meta/Objetivo"
                type="number"
                value={formData.goal}
                onChange={handleChange('goal')}
                helperText="Defina uma meta numérica para este hobby"
                InputProps={{
                  inputProps: { min: 1 }
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        {hobby?.id && (
          <Button onClick={handleDelete} color="error" disabled={loading}>
            Excluir
          </Button>
        )}
        
        <Box sx={{ flexGrow: 1 }} />
        
        <Button onClick={onClose} color="inherit" disabled={loading}>
          Cancelar
        </Button>
        
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading || !formData.name}
          sx={{
            background: `linear-gradient(45deg, ${formData.color} 30%, ${formData.color}AA 90%)`,
            '&:hover': {
              background: `linear-gradient(45deg, ${formData.color} 60%, ${formData.color}CC 100%)`,
            }
          }}
        >
          {loading ? 'Salvando...' : hobby ? 'Atualizar' : 'Criar Hobby'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditHobbyModal; 