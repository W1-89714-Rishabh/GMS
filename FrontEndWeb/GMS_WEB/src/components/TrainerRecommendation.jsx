// src/components/TrainerRecommendation.jsx
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../App';

const TrainerRecommendation = () => {
  const { user } = useContext(AuthContext);
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;

    axios
      .get(`http://localhost:3000/user/recommendation/${user.id}`)
      .then(res => {
        // assuming apiSuccess wrapper: { success: true, data: [...] }
        setTips(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Trainer tips fetch failed', err);
        setError('Failed to load recommendations');
        setLoading(false);
      });
  }, [user]);

  if (!user) {
    return (
      <div className="container mt-5">
        <p>Please log in to view trainer recommendations.</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Trainer’s Special Recommendations</h2>

      {loading && <p>Loading tips…</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && tips.length === 0 && (
        <p className="text-muted">No recommendations available.</p>
      )}

      {!loading && !error && tips.length > 0 && (
        <ul className="list-group">
          {tips.map((tip, idx) => (
            <li key={idx} className="list-group-item">
              {tip.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TrainerRecommendation;