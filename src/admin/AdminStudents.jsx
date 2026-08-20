import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import './admin.css';

const STATUSES = ['pending', 'enrolled', 'active', 'completed', 'withdrawn', 'inactive'];

export default function AdminStudents() {
  const [searchParams] = useSearchParams();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState(searchParams.get('status') || 'all');
  const [courseFilter, setCourseFilter] = useState(searchParams.get('course') || 'all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: '', email: '', phone: '', course_name: '', level: '' });
  const [saving, setSaving] = useState(false);

  async function loadStudents() {
    setLoading(true);
    setError('');
    const { data, error: fetchError } = await supabase
      .from('students')
      .select('*')
      .order('created_at', { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
    } else {
      setStudents(data || []);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadStudents();
  }, []);

  const handleStatusChange = async (id, status) => {
    const previous = students;
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
    const { error: updateError } = await supabase.from('students').update({ status }).eq('id', id);
    if (updateError) {
      setError(updateError.message);
      setStudents(previous);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this student record? This cannot be undone.')) return;
    const previous = students;
    setStudents((prev) => prev.filter((s) => s.id !== id));
    const { error: deleteError } = await supabase.from('students').delete().eq('id', id);
    if (deleteError) {
      setError(deleteError.message);
      setStudents(previous);
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (!newStudent.name.trim() || !newStudent.email.trim()) return;
    setSaving(true);
    const { error: insertError } = await supabase.from('students').insert({
      name: newStudent.name.trim(),
      email: newStudent.email.trim(),
      phone: newStudent.phone.trim() || null,
      course_name: newStudent.course_name.trim() || null,
      level: newStudent.level.trim() || null,
      status: 'pending',
      source: 'manual',
    });
    setSaving(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }
    setNewStudent({ name: '', email: '', phone: '', course_name: '', level: '' });
    setShowAddForm(false);
    loadStudents();
  };

  const courseNames = [...new Set(students.map((s) => s.course_name).filter(Boolean))].sort();

  const filtered = students
    .filter((s) => filter === 'all' || s.status === filter)
    .filter((s) => courseFilter === 'all' || s.course_name === courseFilter);

  if (loading) return <div className="admin-page"><p>Loading students...</p></div>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Students</h1>
        <button className="admin-btn admin-btn-primary" onClick={() => setShowAddForm((v) => !v)}>
          {showAddForm ? 'Cancel' : '+ Add Student'}
        </button>
      </div>

      {error && <div className="admin-alert admin-alert-error">{error}</div>}

      {showAddForm && (
        <form className="admin-inline-form" onSubmit={handleAddStudent}>
          <input
            className="admin-input"
            placeholder="Full name"
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            required
          />
          <input
            className="admin-input"
            placeholder="Email"
            type="email"
            value={newStudent.email}
            onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
            required
          />
          <input
            className="admin-input"
            placeholder="Phone"
            value={newStudent.phone}
            onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
          />
          <input
            className="admin-input"
            placeholder="Course"
            value={newStudent.course_name}
            onChange={(e) => setNewStudent({ ...newStudent, course_name: e.target.value })}
          />
          <input
            className="admin-input"
            placeholder="Level"
            value={newStudent.level}
            onChange={(e) => setNewStudent({ ...newStudent, level: e.target.value })}
          />
          <button className="admin-btn admin-btn-primary" type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </button>
        </form>
      )}

      <div className="admin-filter-row">
        {['all', ...STATUSES].map((s) => (
          <button
            key={s}
            className={`admin-filter-chip ${filter === s ? 'active' : ''}`}
            onClick={() => setFilter(s)}
          >
            {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)} (
            {s === 'all' ? students.length : students.filter((x) => x.status === s).length})
          </button>
        ))}
        {courseNames.length > 0 && (
          <select
            className="admin-select"
            style={{ maxWidth: 220 }}
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
          >
            <option value="all">All courses</option>
            {courseNames.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="admin-empty">No students in this view.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Course</th>
              <th>Level</th>
              <th>Status</th>
              <th>Source</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>
                  {s.email}
                  <br />
                  <span className="admin-muted">{s.phone}</span>
                </td>
                <td>{s.course_name || '—'}</td>
                <td>{s.level || '—'}</td>
                <td>
                  <select
                    className="admin-select"
                    value={s.status}
                    onChange={(e) => handleStatusChange(s.id, e.target.value)}
                  >
                    {STATUSES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </td>
                <td>{s.source}</td>
                <td>{new Date(s.created_at).toLocaleDateString()}</td>
                <td>
                  <button className="admin-btn admin-btn-danger-text" onClick={() => handleDelete(s.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
