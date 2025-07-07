import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Grid,
  Card,
  IconButton,
} from '@mui/material';
import { Close, Palette } from '@mui/icons-material';

const EditProfileModal = ({ open, onClose, user, onSave }) => {
  const [formData, setFormData] = useState({
    daily_phrase: '',
    current_mood: '',
    color_preferences: {
      primary: '#1976d2',
      secondary: '#dc004e',
    },
    dark_mode: false,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        daily_phrase: user.daily_phrase || '',
        current_mood: user.current_mood || '',
        color_preferences: user.color_preferences || {
          primary: '#1976d2',
          secondary: '#dc004e',
        },
        dark_mode: user.dark_mode || false,
      });
    }
  }, [user]);

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleColorChange = (colorType) => (event) => {
    setFormData({
      ...formData,
      color_preferences: {
        ...formData.color_preferences,
        [colorType]: event.target.value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const moods = [
    { value: 'feliz', label: 'Feliz 😄', color: '#FFD700' },
    { value: 'alegre', label: 'Alegre 😊', color: '#FF6B6B' },
    { value: 'motivado', label: 'Motivado 🚀', color: '#4ECDC4' },
    { value: 'relaxado', label: 'Relaxado 😌', color: '#45B7D1' },
    { value: 'energico', label: 'Energético ⚡', color: '#96CEB4' },
    { value: 'pensativo', label: 'Pensativo 🤔', color: '#FFEAA7' },
    { value: 'criativo', label: 'Criativo 🎨', color: '#DDA0DD' },
    { value: 'determinado', label: 'Determinado 💪', color: '#FF7675' },
    { value: 'grato', label: 'Grato 🙏', color: '#74B9FF' },
    { value: 'inspirado', label: 'Inspirado ✨', color: '#A29BFE' },
  ];

  const colorPalettes = [
    { name: 'Oceano', primary: '#1976d2', secondary: '#03dac6' },
    { name: 'Pôr do Sol', primary: '#ff6b35', secondary: '#f7931e' },
    { name: 'Floresta', primary: '#4caf50', secondary: '#8bc34a' },
    { name: 'Lavanda', primary: '#9c27b0', secondary: '#e91e63' },
    { name: 'Fogo', primary: '#f44336', secondary: '#ff5722' },
    { name: 'Céu', primary: '#2196f3', secondary: '#00bcd4' },
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Editar Perfil</Typography>
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
                label="Frase do Dia"
                multiline
                rows={2}
                value={formData.daily_phrase}
                onChange={handleChange('daily_phrase')}
                placeholder="Digite uma frase inspiradora para o seu dia..."
                helperText="Essa frase aparecerá no topo do seu dashboard"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Como você está se sentindo?</InputLabel>
                <Select
                  value={formData.current_mood}
                  onChange={handleChange('current_mood')}
                  label="Como você está se sentindo?"
                >
                  {moods.map((mood) => (
                    <MenuItem key={mood.value} value={mood.value}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                          sx={{
                            width: 16,
                            height: 16,
                            borderRadius: '50%',
                            bgcolor: mood.color,
                          }}
                        />
                        {mood.label}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Palette /> Cores Favoritas
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Cor Primária"
                    type="color"
                    value={formData.color_preferences.primary}
                    onChange={handleColorChange('primary')}
                    InputProps={{
                      startAdornment: (
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            bgcolor: formData.color_preferences.primary,
                            mr: 1,
                            border: '1px solid #ccc',
                          }}
                        />
                      ),
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Cor Secundária"
                    type="color"
                    value={formData.color_preferences.secondary}
                    onChange={handleColorChange('secondary')}
                    InputProps={{
                      startAdornment: (
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            bgcolor: formData.color_preferences.secondary,
                            mr: 1,
                            border: '1px solid #ccc',
                          }}
                        />
                      ),
                    }}
                  />
                </Grid>
              </Grid>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 2, mb: 2 }}>
                Ou escolha uma paleta predefinida:
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {colorPalettes.map((palette) => (
                  <Card
                    key={palette.name}
                    sx={{
                      p: 1,
                      cursor: 'pointer',
                      border: '1px solid #ccc',
                      '&:hover': { bgcolor: 'action.hover' },
                    }}
                    onClick={() => setFormData({
                      ...formData,
                      color_preferences: {
                        primary: palette.primary,
                        secondary: palette.secondary,
                      }
                    })}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          bgcolor: palette.primary,
                        }}
                      />
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          bgcolor: palette.secondary,
                        }}
                      />
                      <Typography variant="caption">{palette.name}</Typography>
                    </Box>
                  </Card>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            '&:hover': {
              background: 'linear-gradient(45deg, #FE6B8B 60%, #FF8E53 100%)',
            }
          }}
        >
          Salvar Alterações
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileModal; 