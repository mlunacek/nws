import { Routes, Route } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material'

import AppBar from '@/Layout/AppBar';
import Layout from '@/Layout/Layout';

import HomePage from '@/NWS/HomePage';
import AboutPage from '@/NWS/AboutPage';

function App() {
  return (
    <Box>
      <CssBaseline />
      <AppBar />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Layout>
    </Box>
  );
}

export default App;
