import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAdminAuth } from './AdminAuthContext';
import './admin.css';

export default function AdminLogin() {
  const { session, signIn } = useAdminAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (session) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error: signInError } = await signIn(email, password);
    setLoading(false);
    if (signInError) {
      setError('Invalid email or password.');
      return;
    }
    navigate('/admin');
  };

  return (
    <div className="admin-login-wrapper">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <h1>Stanton Academy Admin</h1>
        <p className="admin-login-subtitle">Sign in to manage the website</p>

        {error && <div className="admin-alert admin-alert-error">{error}</div>}

        <label className="admin-field-label">Email</label>
        <input
          type="email"
          className="admin-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />

        <label className="admin-field-label">Password</label>
        <input
          type="password"
          className="admin-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />

        <button type="submit" className="admin-btn admin-btn-primary" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
