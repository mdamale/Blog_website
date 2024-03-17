import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signIn } from './auth';

function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(user => user.email === formData.email && user.password === formData.password && !user.disabled);

    if (user) {
      signIn(); // Assuming signIn function sets authentication status
      localStorage.setItem('userName', user.name);
      localStorage.setItem('isModerator', user.email.includes('@moderator.com') ? 'true' : 'false');
      localStorage.setItem('isAdmin', user.email.includes('@admin.com') ? 'true' : 'false');

      navigate('/');
    } else {
      alert('Invalid email or password, or your account may be disabled.');
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        mt: 8,
        backgroundImage: 'url("")', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Card elevation={3} sx={{ bgcolor: '#C4D5D3' }} >
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5" sx={{ mb: 3, fontStyle: 'italic'  }}>
            Sign-In
          </Typography>
          <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Enter Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Enter Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2, bgcolor: '#F26D6D'}}
            >
              Sign In
            </Button>
          </form>
          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 2, mb: 2, bgcolor: '#F26D6D'}}
            onClick={() => navigate('/signup')}
          >
            Don't have an account? Sign Up
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default SignIn;
