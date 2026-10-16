import React, { useState } from 'react';
import { Download, FileText, Calendar, Search, LogIn, Award, GraduationCap } from 'lucide-react';
import './Pages.css';

const ECorner = ({ activePanel = 'student' }) => {
  const [activeTab, setActiveTab] = useState(activePanel);
  const [studentId, setStudentId] = useState('');
  const [studentResult, setStudentResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const downloads = [
    { title: "SSC Board Academic Syllabus 2026-27", size: "1.4 MB", type: "PDF", date: "May 10, 2026" },
    { title: "HSC Science Practical Timetable", size: "850 KB", type: "PDF", date: "May 18, 2026" },
    { title: "Quarterly Fee Structure & Bank Details", size: "620 KB", type: "PDF", date: "April 20, 2026" },
    { title: "Annual Academic Event Calendar", size: "2.1 MB", type: "PDF", date: "May 01, 2026" }
  ];

  const calendarEvents = [
    { date: "June 08, 2026", title: "New Academic Session Commences", desc: "First term classes begin for primary and secondary sections." },
    { date: "June 21, 2026", title: "International Yoga Day Celebration", desc: "Special assembly morning routine on campus." },
    { date: "Aug 15, 2026", title: "Independence Day Flag Hoisting", desc: "Compulsory morning ceremony with parade and cultural distribution." },
    { date: "Sept 05, 2026", title: "Teacher's Day Celebrations", desc: "Secondary students mock-teaching sessions." }
  ];

  const handleStudentSearch = (e) => {
    e.preventDefault();
    if (!studentId.trim()) {
      setErrorMsg('Please enter a valid Student Roll/ID Number.');
      setStudentResult(null);
      return;
    }
    setErrorMsg('');

    if (studentId === 'IG-1002' || studentId === '1002') {
      setStudentResult({
        name: "Patel Aarav K.",
        class: "Class X-A",
        rollNo: "Roll No: 14",
        performance: "Outstanding (Grade A1)",
        gpa: "9.6 CGPA",
        status: "Fee status: Clear",
        attendance: "94.2% Attendance"
      });
    } else if (studentId === 'IG-1205' || studentId === '1205') {
      setStudentResult({
        name: "Mehta Ishita R.",
        class: "Class XII-Science",
        rollNo: "Roll No: 07",
        performance: "Excellent (Grade A1)",
        gpa: "9.8 CGPA",
        status: "Fee status: Clear",
        attendance: "96.5% Attendance"
      });
    } else {
      setErrorMsg('No record found. For testing, use roll ID: "1002" or "1205"');
      setStudentResult(null);
    }
  };

  return (
    <div className="ecorner-page animate-fade-in">
      {/* Banner */}
      <div className="page-header" style={{ background: 'linear-gradient(135deg, #4D7E1D 0%, #A1C038 100%)' }}>
        <div className="container header-container">
          <h1>E-Corner & Student Portal</h1>
          <p>Your interactive central dashboard to view circulars, download schedules, check board results, and access grades.</p>
        </div>
      </div>

      <section className="section portal-tabs-section">
        <div className="container">
          {/* Main navigation for student options */}
          <div className="portal-tabs">
            <button
              className={`portal-tab-btn ${activeTab === 'student' ? 'active' : ''}`}
              onClick={() => setActiveTab('student')}
            >
              <LogIn size={18} />
              <span>Student Corner</span>
            </button>

            <button
              className={`portal-tab-btn ${activeTab === 'teacher' ? 'active' : ''}`}
              onClick={() => setActiveTab('teacher')}
            >
              <FileText size={18} />
              <span>Teacher Corner</span>
            </button>

            <button
              className={`portal-tab-btn ${activeTab === 'admin' ? 'active' : ''}`}
              onClick={() => setActiveTab('admin')}
            >
              <Calendar size={18} />
              <span>Admin Corner</span>
            </button>

            <button
              className={`portal-tab-btn ${activeTab === 'parent' ? 'active' : ''}`}
              onClick={() => setActiveTab('parent')}
            >
              <FileText size={18} />
              <span>Parent Corner</span>
            </button>

            <button
              className={`portal-tab-btn ${activeTab === 'email' ? 'active' : ''}`}
              onClick={() => setActiveTab('email')}
            >
              <LogIn size={18} />
              <span>Email Login</span>
            </button>
          </div>

          <div className="portal-display-box">
            {/* Student Search Panel */}
            {activeTab === 'student' && (
              <div className="portal-panel login-panel">
                <div className="panel-info">
                  <h2>Access Academic Summary Reports</h2>
                  <p>Enter your GSEB Board Roll ID or School Enrollment code to query academic progress, attendance records, and quarterly results.</p>

                  <form onSubmit={handleStudentSearch} className="student-lookup-form">
                    <div className="form-input-group">
                      <Search className="search-icon" size={20} />
                      <input
                        type="text"
                        placeholder="Enter Student ID (e.g. 1002, 1205)"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                      />
                      <button type="submit" className="btn btn-primary">Search</button>
                    </div>
                    {errorMsg && <p className="lookup-error">{errorMsg}</p>}
                    <p className="lookup-hint">💡 Demo IDs: enter <strong>1002</strong> or <strong>1205</strong> to test dashboard generation.</p>
                  </form>
                </div>

                {studentResult && (
                  <div className="student-profile-card animate-fade-in">
                    <div className="card-header">
                      <GraduationCap size={32} />
                      <div>
                        <h3>{studentResult.name}</h3>
                        <p>{studentResult.class} | {studentResult.rollNo}</p>
                      </div>
                    </div>

                    <div className="profile-details-grid">
                      <div className="detail-item">
                        <span>Evaluation Grade</span>
                        <h4>{studentResult.performance}</h4>
                      </div>

                      <div className="detail-item">
                        <span>CGPA Score</span>
                        <h4>{studentResult.gpa}</h4>
                      </div>

                      <div className="detail-item">
                        <span>Attendance Ratio</span>
                        <h4>{studentResult.attendance}</h4>
                      </div>

                      <div className="detail-item">
                        <span>Accounts Dues</span>
                        <h4 className="fee-status">{studentResult.status}</h4>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Syllabus & Downloads */}
            {activeTab === 'teacher' && (
              <div className="portal-panel downloads-panel">
                <h2>Downloads & Circulars Hub</h2>
                <p>Click below to fetch the official PDF brochures for GSEB Board exams, class timetables, and rules.</p>

                <div className="downloads-table">
                  {downloads.map((item, idx) => (
                    <div className="download-row" key={idx}>
                      <div className="download-info">
                        <FileText size={20} className="doc-icon" />
                        <div>
                          <h4>{item.title}</h4>
                          <span className="doc-meta">Added: {item.date} | size: {item.size}</span>
                        </div>
                      </div>
                      <button className="btn btn-outline download-btn">
                        <Download size={14} />
                        <span>Download {item.type}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Calendar */}
            {activeTab === 'admin' && (
              <div className="portal-panel calendar-panel">
                <h2>Official Academic Calendar</h2>
                <p>Track critical administrative dates, term schedules, examinations, and holidays.</p>

                <div className="calendar-list">
                  {calendarEvents.map((ev, idx) => (
                    <div className="calendar-row-card" key={idx}>
                      <div className="calendar-date-badge">
                        <span>{ev.date}</span>
                      </div>
                      <div className="calendar-event-info">
                        <h4>{ev.title}</h4>
                        <p>{ev.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Parent Corner */}
            {activeTab === 'parent' && (
              <div className="portal-panel">
                <h2>Parent Corner</h2>
                <p>Parent portal features coming soon.</p>
              </div>
            )}

            {/* Email Login */}
            {activeTab === 'email' && (
              <div className="portal-panel">
                <h2>Email Login</h2>
                <p>Webmail login integration coming soon.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ECorner;
