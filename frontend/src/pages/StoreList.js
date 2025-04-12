import  { useState, useEffect, useContext } from 'react';
import API from '../services/api.js';
import RatingForm from '../components/RatingForm.js';
import { AuthContext } from '../context/AuthContext.js';

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const { data } = await API.get('/stores');
        setStores(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStores();
  }, []);

  const handleRatingSubmit = async (storeId, rating) => {
    try {
      await API.post('/ratings', {
        userId: user.id,
        storeId,
        rating
      });
      // Refresh stores to show updated ratings
      const { data } = await API.get('/stores');
      setStores(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="store-list">
      <h2>Stores</h2>
      <div className="row">
        {stores.map(store => (
          <div key={store.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{store.name}</h5>
                <p className="card-text">{store.address}</p>
                <p>Average Rating: {store.rating || 'No ratings yet'}</p>
                <RatingForm 
                  storeId={store.id} 
                  onSubmit={handleRatingSubmit} 
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreList;