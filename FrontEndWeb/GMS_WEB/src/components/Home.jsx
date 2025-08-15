import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const storedUser = sessionStorage.getItem('user');
  const initialUser = storedUser ? JSON.parse(storedUser) : null;
  const [user, setUser] = useState(initialUser);
  const [newWeight, setNewWeight] = useState(initialUser?.weight || '');
  const [bmi, setBmi] = useState(0);
  const [diet, setDiet] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [exerciseSelections, setExerciseSelections] = useState({});
  const [products, setProducts] = useState([]);
  const [ranking, setRanking] = useState({ dailyScore: 0, weeklyScore: 0 });
  const [lifetimeTop10, setLifetimeTop10] = useState([]);
  useEffect(() => {
    if (!user) return;
    const heightM = user.height / 100;
    const calculated = (user.weight / (heightM * heightM)).toFixed(2);
    setBmi(calculated);
  }, [user]);
  useEffect(() => {
    if (!user) return;
    Promise.all([
      axios.get(`http://localhost:3000/user/ranking/${user.id}`),
      axios.get(`http://localhost:3000/user/ranking/lifetime`),
      axios.get(`http://localhost:3000/diet/particular/${user.id}`),
      axios.get(`http://localhost:3000/excercise/particular/${user.id}`),
      axios.get(`http://localhost:3000/products/prod/${user.id}`)
    ])
      .then(([rankRes, lifeRes, dietRes, exRes, prodRes]) => {
        setRanking(rankRes.data.data);
        setLifetimeTop10(lifeRes.data.data.slice(0, 10));
        setDiet(dietRes.data.data);
        setExercises(exRes.data.data);
        setProducts(prodRes.data.data);
        const initSelections = {};
        exRes.data.data.forEach(ex => {
          initSelections[ex.exercise_name] = false;
        });
        setExerciseSelections(initSelections);
      })
      .catch(err => console.error('Dashboard fetch failed', err));
  }, [user]);
  const handleWeightChange = e => {
    setNewWeight(e.target.value);
  };
  const handleWeightUpdate = () => {
    axios
      .patch(`http://localhost:3000/user/updateWeight/${user.id}`, {
        weight: Number(newWeight)
      })
      .then(() => {
        const updated = { ...user, weight: Number(newWeight) };
        setUser(updated);
        sessionStorage.setItem('user', JSON.stringify(updated));
      })
      .catch(err => console.error('Weight update failed', err));
  };
  const toggleExercise = name => {
    setExerciseSelections(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };
  const handleWorkoutDone = () => {
    const doneCount = Object.values(exerciseSelections).filter(Boolean).length;
    const earned = doneCount * 10;

    axios
      .patch(`http://localhost:3000/user/ranking/addScore/${user.id}`, {
        points: earned
      })
      .then(() => axios.get(`http://localhost:3000/user/ranking/${user.id}`))
      .then(res => {
        setRanking(res.data.data);
        const reset = {};
        exercises.forEach(ex => {
          reset[ex.exercise_name] = false;
        });
        setExerciseSelections(reset);
      })
      .catch(err => console.error('Updating workout score failed', err));
  };

  if (!user) {
    return <p className="mt-4">Please log in to view your dashboard.</p>;
  }

  return (
    <div className="container mt-4">
      <div className="card mb-4">
        <div className="card-header">Your Profile</div>
        <div className="card-body">
          <h5 className="card-title">{user.name}</h5>
          <p className="card-text">
            Height: {user.height} cm | Weight: {user.weight} kg
          </p>
          <div className="input-group mb-3" style={{ maxWidth: '300px' }}>
            <input
              type="number"
              className="form-control"
              value={newWeight}
              onChange={handleWeightChange}
              placeholder="New weight (kg)"
            />
            <button
              className="btn btn-outline-primary"
              onClick={handleWeightUpdate}
            >
              Update
            </button>
          </div>
          <p>
            Latest BMI: <strong>{bmi}</strong>
          </p>
        </div>
      </div>
      <div className="card mb-4">
        <div className="card-header">Diet Recommendations (Based on BMI)</div>
        <div className="card-body">
          <div className="row">
            {diet.map((d, i) => (
              <div key={i} className="col-md-6 mb-3">
                <div className="p-3 border rounded shadow-sm">
                  <h6 className="mb-1">{d.Diet_Name}</h6>
                  <span className="badge bg-info">{d.Type}</span>
                  <span className="badge bg-success ms-2">
                    {d.Calories} kcal
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="card mb-4">
        <div className="card-header">Today's Exercise</div>
        <div className="card-body">
          {exercises.map((ex, idx) => (
            <div className="form-check" key={idx}>
              <input
                className="form-check-input"
                type="checkbox"
                id={`exe-${idx}`}
                checked={exerciseSelections[ex.exercise_name] || false}
                onChange={() => toggleExercise(ex.exercise_name)}
              />
              <label className="form-check-label" htmlFor={`exe-${idx}`}>
                {ex.exercise_name} <small>({ex.body_type})</small>
              </label>
            </div>
          ))}
          <button
            className="btn btn-success mt-3"
            onClick={handleWorkoutDone}
          >
            Done My Workout
          </button>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-header">Product Recommendations</div>
        <ul className="list-group list-group-flush">
          {products.map((p, i) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-center"
              key={i}
            >
              <span>{p.name}</span>
              <span className="badge bg-primary rounded-pill">
                ₹{p.price}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="card mb-4">
        <div className="card-header">Your Ranking & Points</div>
        <div className="card-body">
          <p>Daily Score: <strong>{ranking.dailyScore}</strong></p>
          <p>Weekly Score: <strong>{ranking.weeklyScore}</strong></p>
        </div>
      </div>
      <div className="card mb-4">
        <div className="card-header">Lifetime Top 10 Performers</div>
        <ul className="list-group list-group-flush">
          {lifetimeTop10.map((t, idx) => (
            <li
              className="list-group-item d-flex justify-content-between"
              key={idx}
            >
              <span>
                {idx + 1}. {t.name}
              </span>
              <span>{t.totalScore} pts</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;