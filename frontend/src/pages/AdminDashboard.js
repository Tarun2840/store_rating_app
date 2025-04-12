import  { useState, useEffect } from 'react';
 
import API from '../services/api.js';

const AdminDashboard = () => {
   
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, storesRes, ratingsRes] = await Promise.all([
          API.get('/api/users'),
          API.get('/api/stores'),
          API.get('/api/ratings')
        ]);
        
        setUsers(usersRes.data);
        setStats({
          totalUsers: usersRes.data.length,
          totalStores: storesRes.data.length,
          totalRatings: ratingsRes.data.length
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await API.delete(`/api/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
      setStats(prev => ({...prev, totalUsers: prev.totalUsers - 1}));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (loading) return <div>Loading admin dashboard...</div>;

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Total Stores</h3>
          <p>{stats.totalStores}</p>
        </div>
        <div className="stat-card">
          <h3>Total Ratings</h3>
          <p>{stats.totalRatings}</p>
        </div>
      </div>

      <div className="users-list">
        <h3>User Management</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button 
                    onClick={() => handleDeleteUser(user.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;