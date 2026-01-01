import React, { useState, useEffect, useRef } from 'react';
import { Container, Box, Button, Grid } from '@mui/material';
import { ArrowBackIosNew, AdminPanelSettingsRounded, SecurityRounded, WorkOutlineRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

// Import the separated components
import ProfileCard from './ProfileCard';
import ProfileForm from './ProfileForm';

const ProfilePage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [profile, setProfile] = useState({ name: '', email: '', role: '', password: '', profileImage: null });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // 1. Fetch Profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8080/api/user/me', { headers: { Authorization: `Bearer ${token}` } });
        setProfile({ ...res.data, password: '' });
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

  // 2. Logic: Upload Photo
  const handlePhotoClick = () => fileInputRef.current.click();
  
  const handlePhotoChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  setError(''); setSuccess('');

  try {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', file);

    const res = await axios.post('http://localhost:8080/api/user/me/photo', formData, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
    });

    // Cache-busting
    setProfile(prev => ({
  ...prev,
  profileImage: res.data.profileImage
}));


    setSuccess("Profile photo updated successfully!");
  } catch (err) {
    console.error('Error uploading photo:', err);
    setError("Failed to upload photo. Please try again.");
  }
};


  // 3. Logic: Save Profile
  const handleSave = async () => {
    try {
      setSaving(true); setError(''); setSuccess('');
      const token = localStorage.getItem('token');
      const payload = { ...profile };
      if (!payload.password) delete payload.password; 
      
      await axios.put('http://localhost:8080/api/user/me', payload, { headers: { Authorization: `Bearer ${token}` } });
      setSuccess('Profile updated successfully!');
      setProfile(prev => ({ ...prev, password: '' })); 
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  // Helper: Role Colors
  const getRoleColor = (role) => {
     if (role === 'ADMIN') return { bg: '#ede9fe', color: '#7c3aed', icon: <AdminPanelSettingsRounded sx={{ fontSize: 16 }} /> };
     if (role === 'MANAGER') return { bg: '#dbeafe', color: '#2563eb', icon: <SecurityRounded sx={{ fontSize: 16 }} /> };
     return { bg: '#dcfce7', color: '#16a34a', icon: <WorkOutlineRounded sx={{ fontSize: 16 }} /> };
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#ffffff', fontFamily: '"Inter", sans-serif', position: 'relative', overflow: 'hidden', py: 4 }}>
      {/* Background */}
      <Box sx={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <Box sx={{ position: 'absolute', top: '-20%', left: '20%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, transparent 70%)', animation: 'float 25s infinite ease-in-out alternate' }} />
        <Box sx={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(14, 165, 233, 0.05) 0%, transparent 70%)', animation: 'float 20s infinite ease-in-out alternate-reverse' }} />
        <style>{`@keyframes float { 0% { transform: translate(0,0); } 100% { transform: translate(20px, 40px); } }`}</style>
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Button startIcon={<ArrowBackIosNew sx={{ fontSize: 14 }} />} onClick={() => navigate('/dashboard')}
             sx={{ color: '#64748b', textTransform: 'none', mb: 4, '&:hover': { bgcolor: '#f1f5f9' } }}>
             Back to Dashboard
          </Button>

          <Grid container spacing={4}>
            {/* Left Column */}
            <Grid item xs={12} md={4}>
              <ProfileCard 
                profile={profile} 
                loading={loading}
                roleStyle={getRoleColor(profile.role || 'EMPLOYEE')}
                handlePhotoClick={handlePhotoClick}
                handlePhotoChange={handlePhotoChange}
                fileInputRef={fileInputRef}
              />
            </Grid>

            {/* Right Column */}
            <Grid item xs={12} md={8}>
              <ProfileForm 
                profile={profile}
                saving={saving}
                error={error}
                success={success}
                handleChange={handleChange}
                handleSave={handleSave}
              />
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ProfilePage;