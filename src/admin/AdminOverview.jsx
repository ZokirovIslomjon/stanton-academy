import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { supabase } from '../lib/supabaseClient';
import './admin.css';

const DAY = 86400000;

const STATUS_COLORS = {
  pending: '#f5b400',
  enrolled: '#2563eb',
  active: '#006b3f',
  completed: '#7c3aed',
  withdrawn: '#dc2626',
  inactive: '#6b7280',
};

const EVENT_ICONS = {
  arrival: 'fa-solid fa-plane-arrival',
  start: 'fa-solid fa-flag-checkered',
  trip: 'fa-solid fa-bus',
  night: 'fa-solid fa-moon',
  sport: 'fa-solid fa-futbol',
  farewell: 'fa-solid fa-plane-departure',
};

function weekBuckets(students) {
  const now = Date.now();
  const thisWeekStart = now - 7 * DAY;
  const lastWeekStart = now - 14 * DAY;
  let thisWeek = 0;
  let lastWeek = 0;
  students.forEach((s) => {
    const t = new Date(s.created_at).getTime();
    if (t >= thisWeekStart) thisWeek += 1;
    else if (t >= lastWeekStart) lastWeek += 1;
  });
  return { thisWeek, lastWeek };
}

function TrendBadge({ students }) {
  const { thisWeek, lastWeek } = weekBuckets(students);
  if (thisWeek === 0 && lastWeek === 0) return null;
  const delta = thisWeek - lastWeek;
  if (delta === 0) {
    return (
      <span className="admin-stat-trend admin-stat-trend-flat">
        <i className="fa-solid fa-minus" /> No change
      </span>
    );
  }
  const dir = delta > 0 ? 'up' : 'down';
  return (
    <span className={`admin-stat-trend admin-stat-trend-${dir}`}>
      <i className={`fa-solid fa-arrow-${dir}`} /> {delta > 0 ? '+' : ''}{delta} this wk
    </span>
  );
}

// Splits [rangeStart, rangeEnd] into `buckets` equal-width buckets and counts
// signups in each. With no custom range this defaults to rangeStart = 8 weeks
// ago, so each bucket is exactly one week — same output as before the date
// range picker existed. A custom range just resizes the buckets to fit it.
function buildSeries(students, rangeStart, rangeEnd, buckets = 8) {
  const bucketMs = (rangeEnd - rangeStart) / buckets;
  const series = [];
  for (let i = 0; i < buckets; i += 1) {
    const start = rangeStart + i * bucketMs;
    const end = rangeStart + (i + 1) * bucketMs;
    const count = students.filter((s) => {
      const t = new Date(s.created_at).getTime();
      return t >= start && t < end;
    }).length;
    series.push({
      label: new Date(start).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      count,
    });
  }
  return series;
}

function computeStats(students) {
  const counts = { pending: 0, enrolled: 0, active: 0, completed: 0, withdrawn: 0, inactive: 0 };
  students.forEach((s) => {
    if (counts[s.status] !== undefined) counts[s.status] += 1;
  });
  return { ...counts, total: students.length };
}

// Groups pending students by course_name and looks up each course's real
// seat capacity (courses.capacity minus students already active/enrolled in
// it). course_name is free text from the signup form and isn't guaranteed to
// match a real course title (pre-existing catalog mismatch) — when it
// doesn't match, or the course has no capacity set yet, seats shows '—'
// rather than a guess.
function buildWaitingByCourse(students, courses) {
  const pendingByCourse = {};
  students
    .filter((s) => s.status === 'pending')
    .forEach((s) => {
      const key = s.course_name || 'No course selected';
      if (!pendingByCourse[key]) pendingByCourse[key] = [];
      pendingByCourse[key].push(s);
    });

  return Object.entries(pendingByCourse)
    .map(([course, pendingStudents]) => {
      const matchedCourse = courses.find((c) => c.title.toLowerCase() === course.toLowerCase());
      let seats = null;
      if (matchedCourse && matchedCourse.capacity != null) {
        const filled = students.filter(
          (s) => (s.status === 'active' || s.status === 'enrolled') && (s.course_name || '').toLowerCase() === course.toLowerCase()
        ).length;
        seats = matchedCourse.capacity - filled;
      }
      return { course, waiting: pendingStudents.length, seats, pendingStudents };
    })
    .sort((a, b) => b.waiting - a.waiting);
}

export default function AdminOverview() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [expandedCourses, setExpandedCourses] = useState(new Set());

  const toggleCourse = (course) => {
    setExpandedCourses((prev) => {
      const next = new Set(prev);
      if (next.has(course)) next.delete(course);
      else next.add(course);
      return next;
    });
  };

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError('');

      const todayStr = new Date().toISOString().slice(0, 10);

      const [studentsRes, coursesRes, eventsRes] = await Promise.all([
        supabase
          .from('students')
          .select('id, name, email, course_name, status, created_at')
          .order('created_at', { ascending: false }),
        supabase.from('courses').select('id, title, capacity'),
        supabase
          .from('camp_events')
          .select('id, event_date, label, event_type, camp_months(year, month)')
          .gte('event_date', todayStr)
          .order('event_date', { ascending: true })
          .limit(5),
      ]);

      if (cancelled) return;

      if (studentsRes.error) {
        setError(studentsRes.error.message);
        setLoading(false);
        return;
      }

      const studentRows = studentsRes.data || [];
      const courseRows = coursesRes.error ? [] : coursesRes.data || [];

      setStudents(studentRows);
      setCourses(courseRows);
      setUpcomingEvents(eventsRes.error ? [] : eventsRes.data || []);
      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <div className="admin-page"><p>Loading overview...</p></div>;
  if (error) return <div className="admin-page"><div className="admin-alert admin-alert-error">{error}</div></div>;

  const rangeFrom = searchParams.get('from');
  const rangeTo = searchParams.get('to');
  const hasRange = Boolean(rangeFrom && rangeTo);
  const rangeStart = hasRange ? new Date(rangeFrom).getTime() : Date.now() - 8 * 7 * DAY;
  const rangeEnd = hasRange ? new Date(rangeTo).getTime() + DAY : Date.now();

  // Everything below reads from scopedStudents so the whole page — KPI cards,
  // donut, waiting list, recent registrations — consistently reflects the
  // picked date range (by created_at) instead of only some widgets.
  const scopedStudents = hasRange
    ? students.filter((s) => {
        const t = new Date(s.created_at).getTime();
        return t >= rangeStart && t < rangeEnd;
      })
    : students;

  const stats = computeStats(scopedStudents);
  const recent = scopedStudents.slice(0, 5);

  const donutData = [
    { name: 'Pending', key: 'pending', value: stats.pending },
    { name: 'Enrolled', key: 'enrolled', value: stats.enrolled },
    { name: 'Active', key: 'active', value: stats.active },
    { name: 'Completed', key: 'completed', value: stats.completed },
    { name: 'Withdrawn', key: 'withdrawn', value: stats.withdrawn },
    { name: 'Inactive', key: 'inactive', value: stats.inactive },
  ].filter((d) => d.value > 0);

  const series = buildSeries(scopedStudents, rangeStart, rangeEnd);
  const waitingByCourse = buildWaitingByCourse(scopedStudents, courses);

  return (
    <div className="admin-page">
      <h1 className="admin-page-title">Overview</h1>

      <div className="admin-stat-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-card-top">
            <div className="admin-stat-icon"><i className="fa-solid fa-users" /></div>
            {!hasRange && <TrendBadge students={students} />}
          </div>
          <div className="admin-stat-value">{stats.total}</div>
          <div className="admin-stat-label">Total Students</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card-top">
            <div className="admin-stat-icon"><i className="fa-solid fa-user-check" /></div>
            {!hasRange && <TrendBadge students={students.filter((s) => s.status === 'active')} />}
          </div>
          <div className="admin-stat-value">{stats.active}</div>
          <div className="admin-stat-label">Active Students</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card-top">
            <div className="admin-stat-icon"><i className="fa-solid fa-hourglass-half" /></div>
            {!hasRange && <TrendBadge students={students.filter((s) => s.status === 'pending')} />}
          </div>
          <div className="admin-stat-value">{stats.pending}</div>
          <div className="admin-stat-label">Pending</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card-top">
            <div className="admin-stat-icon"><i className="fa-solid fa-graduation-cap" /></div>
            {!hasRange && <TrendBadge students={students.filter((s) => s.status === 'completed')} />}
          </div>
          <div className="admin-stat-value">{stats.completed}</div>
          <div className="admin-stat-label">Completed</div>
        </div>
      </div>

      {hasRange && (
        <p className="admin-muted" style={{ marginBottom: 16 }}>
          Showing data from {new Date(rangeFrom).toLocaleDateString()} to {new Date(rangeTo).toLocaleDateString()} (set in the date range picker, top right).
        </p>
      )}

      <div className="admin-widget-card">
        <div className="admin-widget-card-title">Students Waiting for Enrollment</div>
        {waitingByCourse.length === 0 ? (
          <p className="admin-empty">No students pending enrollment{hasRange ? ' in this range' : ''}.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Waiting</th>
                <th>Available Seats</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {waitingByCourse.map((row) => (
                <React.Fragment key={row.course}>
                  <tr>
                    <td>
                      <button type="button" className="admin-btn admin-btn-ghost" onClick={() => toggleCourse(row.course)}>
                        <i className={`fa-solid ${expandedCourses.has(row.course) ? 'fa-chevron-down' : 'fa-chevron-right'}`} />
                      </button>{' '}
                      {row.course}
                    </td>
                    <td>{row.waiting}</td>
                    <td>{row.seats === null ? '—' : row.seats}</td>
                    <td className="admin-table-actions">
                      <Link
                        className="admin-btn admin-btn-ghost"
                        to={`/admin/students?status=pending&course=${encodeURIComponent(row.course)}`}
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                  {expandedCourses.has(row.course) && (
                    <tr>
                      <td colSpan={4}>
                        <div className="admin-widget-list">
                          {row.pendingStudents.map((s) => (
                            <div className="admin-widget-item" key={s.id}>
                              <div className="admin-widget-item-icon">
                                <i className="fa-solid fa-hourglass-half" />
                              </div>
                              <div className="admin-widget-item-body">
                                <div className="admin-widget-item-title">{s.name}</div>
                                <div className="admin-widget-item-meta">
                                  {s.email} · waiting since {new Date(s.created_at).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="admin-dashboard-grid">
        <div>
          <div className="admin-chart-card">
            <div className="admin-chart-card-header">
              <div className="admin-chart-card-title">{hasRange ? 'Signups (selected range)' : 'Signups (last 8 weeks)'}</div>
            </div>
            {scopedStudents.length === 0 ? (
              <p className="admin-empty">No signups {hasRange ? 'in this range' : 'yet'}.</p>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={series}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={{ stroke: '#eef2f0' }} tickLine={false} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} width={28} />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" name="Signups" stroke="#006b3f" strokeWidth={2.5} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="admin-widget-card">
            <div className="admin-widget-card-title">Recent Registrations</div>
            {recent.length === 0 ? (
              <p className="admin-empty">No signups yet.</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Course</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((s) => (
                    <tr key={s.id}>
                      <td>{s.name}</td>
                      <td>{s.email}</td>
                      <td>{s.course_name || '—'}</td>
                      <td><span className={`admin-badge admin-badge-${s.status}`}>{s.status}</span></td>
                      <td>{new Date(s.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div>
          <div className="admin-chart-card">
            <div className="admin-chart-card-header">
              <div className="admin-chart-card-title">Students by Status</div>
            </div>
            {donutData.length === 0 ? (
              <p className="admin-empty">No students yet.</p>
            ) : (
              <div className="admin-donut-wrap">
                <ResponsiveContainer width={120} height={120}>
                  <PieChart>
                    <Pie data={donutData} dataKey="value" nameKey="name" innerRadius={38} outerRadius={58} paddingAngle={2}>
                      {donutData.map((d) => (
                        <Cell key={d.key} fill={STATUS_COLORS[d.key]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="admin-donut-legend">
                  {donutData.map((d) => (
                    <div className="admin-donut-legend-item" key={d.key}>
                      <span className="admin-donut-legend-dot" style={{ background: STATUS_COLORS[d.key] }} />
                      {d.name}
                      <span className="admin-donut-legend-value">{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="admin-widget-card">
            <div className="admin-widget-card-title">Upcoming Holiday Camp Sessions</div>
            {upcomingEvents.length === 0 ? (
              <p className="admin-empty">No upcoming camp events scheduled.</p>
            ) : (
              <div className="admin-widget-list">
                {upcomingEvents.map((ev) => (
                  <div className="admin-widget-item" key={ev.id}>
                    <div className="admin-widget-item-icon">
                      <i className={EVENT_ICONS[ev.event_type] || 'fa-solid fa-calendar-day'} />
                    </div>
                    <div className="admin-widget-item-body">
                      <div className="admin-widget-item-title">{ev.label}</div>
                      <div className="admin-widget-item-meta">
                        {new Date(ev.event_date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                        {ev.camp_months ? ` · ${ev.camp_months.month}/${ev.camp_months.year} session` : ''}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
