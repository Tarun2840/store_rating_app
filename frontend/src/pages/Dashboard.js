import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';  // Changed from useHistory
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const Dashboard = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();  // Changed from useHistory

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await api.get('/stores');
        setStores(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch stores');
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  const handleStoreClick = (storeId) => {
    navigate(`/stores/${storeId}`);  // Changed from history.push
  };

  const handleAddStore = () => {
    navigate('/stores/new');  // Changed from history.push
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="dashboard">
      <h1>Welcome, {user.name}</h1>
      
      {user.role === 'store_owner' && (
        <button onClick={handleAddStore} className="add-store-btn">
          Add New Store
        </button>
      )}

      <div className="stores-list">
        <h2>Stores Near You</h2>
        {stores.length > 0 ? (
          <ul>
            {stores.map(store => (
              <li 
                key={store.id} 
                onClick={() => handleStoreClick(store.id)}
                className="store-item"
              >
                <h3>{store.name}</h3>
                <p>{store.address}</p>
                <div className="rating">
                  Rating: {store.rating || 'Not rated yet'}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No stores available</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;