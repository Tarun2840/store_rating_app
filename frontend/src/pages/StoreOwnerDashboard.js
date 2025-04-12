import  { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.js';
import API from '../services/api.js';

const StoreOwnerDashboard = () => {
  const { user } = useContext(AuthContext);
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const storeRes = await API.get(`/stores/${user.storeId}`);
        setStore(storeRes.data);

        const ratingsRes = await API.get(`/ratings?storeId=${user.storeId}`);
        setRatings(ratingsRes.data);
      } catch (error) {
        console.error('Error fetching store data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStoreData();
  }, [user.storeId]);

  if (loading) return <div>Loading store owner dashboard...</div>;

  return (
    <div className="store-owner-dashboard">
      <h2>Welcome, {user.name}!</h2>
      <h3>Your Store: {store.name}</h3>
      <p>Address: {store.address}</p>
      <p>Average Rating: {store.rating || 'No ratings yet'}</p>

      <h3>Ratings Received</h3>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Rating</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {ratings.map(rating => (
            <tr key={rating.id}>
              <td>{rating.userId}</td>
              <td>{rating.rating}</td>
              <td>{rating.comment || 'No comment'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default StoreOwnerDashboard;