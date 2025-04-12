import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminRoute = ({ element, ...rest }) => {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      element={user && user.role === 'admin' ? element : <Navigate to="/" replace />}
    />
  );
};

export default AdminRoute;