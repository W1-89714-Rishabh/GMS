// src/components/Home.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExerciseChecklist from './ExerciseChecklist';

const Home = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [diet, setDiet] = useState([]);
  const [products, setProducts] = useState([]);
  const [ranking, setRanking] = useState({});
  const [topPerformers, setTopPerformers] = useState([]);
  const [trainerTips, setTrainerTips] = useState([]);

  useEffect(() => {
    if (!user) return;

    // Fetch diet recommendations
    axios.get(`http://localhost:3000/api/diet/${user.id}`)
      .then(res => setDiet(res.data))
      .catch(err => console.error('Diet fetch failed', err));

    // Fetch product recommendations
    axios.get(`http://localhost:3000/api/products/recommended/${user.id}`)
      .then(res => setProducts(res.data))
      .catch(err => console.error('Product fetch failed', err));

    // Fetch user ranking
    axios.get(`http://localhost:3000/api/ranking/${user.id}`)
      .then(res => setRanking(res.data))
      .catch(err => console.error('Ranking fetch failed', err));

    // Fetch top performers
    axios.get(`http://localhost:3000/api/ranking/top-performers`)
      .then(res => setTopPerformers(res.data))
      .catch(err => console.error('Top performers fetch failed', err));

    // Fetch trainer recommendations
    axios.get(`http://localhost:3000/api/trainer/recommendation/${user.id}`)
      .then(res => setTrainerTips(res.data))
      .catch(err => console.error('Trainer tips fetch failed', err));
  }, [user]);

  if (!user) return <p>Please log in to view your dashboard.</p>;

  return (
    <div className="container mt-4">
      <h2>Welcome, {user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Height: {user.height} cm | Weight: {user.weight} kg</p>

      <hr />

      <ExerciseChecklist userId={user.id} />

      <hr />

      <h3> Diet Recommendations</h3>
      <ul className="list-group">
        {diet.map((item, index) => (
          <li key={index} className="list-group-item">{item.name}</li>
        ))}
      </ul>

      <hr />

      <h3> Product Recommendations</h3>
      <ul className="list-group">
        {products.map((product, index) => (
          <li key={index} className="list-group-item">
            {product.name} - ₹{product.price}
          </li>
        ))}
      </ul>

      <hr />

      <h3>Your Ranking</h3>
      <p>Daily Score: {ranking.dailyScore}</p>
      <p>Weekly Score: {ranking.weeklyScore}</p>

      <hr />

      <h3> Lifetime Top Performers</h3>
      <ul className="list-group">
        {topPerformers.map((trainee, index) => (
          <li key={index} className="list-group-item">
            {index + 1}. {trainee.name} — {trainee.totalScore} pts
          </li>
        ))}
      </ul>

      <hr />

      <h3>Trainer's Special Recommendations</h3>
      <ul className="list-group">
        {trainerTips.map((tip, index) => (
          <li key={index} className="list-group-item">{tip.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;