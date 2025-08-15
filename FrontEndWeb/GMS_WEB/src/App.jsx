import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import UserLayout from './components/UserLayout';
import Home from './components/Home';
import RecommendationForm from './components/RecommendationForm';

<Routes>
  <Route path="/" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/user" element={<UserLayout />}>
    <Route index element={<Home />} />
    <Route path="recommend" element={<RecommendationForm />} />
  </Route>
</Routes>