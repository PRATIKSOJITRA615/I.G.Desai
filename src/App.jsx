import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Staff from './pages/Staff';
import Events from './pages/Events';
import Vocational from './pages/Vocational';
import Awards from './pages/Awards';
import ECorner from './pages/ECorner';
import Contact from './pages/Contact';
import AdminWrapper from './pages/admin/AdminWrapper';
import BlogArticle from './pages/BlogArticle';

const getPageFromPath = () => {
  const path = window.location.pathname;
  if (path.startsWith('/admin')) return 'admin';
  if (path === '/') return 'home';
  if (path === '/about') return 'about';
  if (path.startsWith('/staff')) {
    const parts = path.split('/');
    if (parts.length > 2 && parts[2]) return `staff-${parts[2]}`;
    return 'staff';
  }
  if (path === '/events') return 'events';
  if (path === '/vocational') return 'vocational';
  if (path === '/awards') return 'awards';
  if (path.startsWith('/blog')) {
    const parts = path.split('/');
    if (parts.length > 2 && parts[2]) return `blog-${parts[2]}`;
    return 'blog';
  }
  if (path.startsWith('/ecorner')) {
    const parts = path.split('/');
    if (parts.length > 2 && parts[2]) {
      if (parts[2] === 'admin') return 'ecorner-admin';
      return `ecorner-${parts[2]}`;
    }
    return 'ecorner';
  }
  if (path === '/contact') return 'contact';
  return 'home';
};

function App() {
  const [activePage, setActivePage] = useState(() => {
    const path = window.location.pathname;
    if (path.startsWith('/admin')) return 'admin';
    return 'home';
  });

  useEffect(() => {
    const handlePopState = () => {
      setActivePage(getPageFromPath());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    // Update the URL in the browser without reloading the page
    let newUrl = '/';
    if (activePage === 'home') newUrl = '/';
    else if (activePage === 'about') newUrl = '/about';
    else if (activePage.startsWith('staff')) {
      if (activePage === 'staff') newUrl = '/staff';
      else newUrl = `/staff/${activePage.replace('staff-', '')}`;
    }
    else if (activePage === 'events') newUrl = '/events';
    else if (activePage === 'vocational') newUrl = '/vocational';
    else if (activePage === 'awards') newUrl = '/awards';
    else if (activePage.startsWith('blog')) {
      if (activePage === 'blog') newUrl = '/blog';
      else newUrl = `/blog/${activePage.replace('blog-', '')}`;
    }
    else if (activePage.startsWith('ecorner')) {
      if (activePage === 'ecorner') newUrl = '/ecorner';
      else if (activePage === 'ecorner-admin') newUrl = '/admin';
      else newUrl = `/ecorner/${activePage.replace('ecorner-', '')}`;
    }
    else if (activePage === 'contact') newUrl = '/contact';
    else if (activePage === 'admin') {
      if (window.location.pathname.startsWith('/admin')) {
        newUrl = window.location.pathname;
      } else {
        newUrl = '/admin';
      }
    }

    if (window.location.pathname !== newUrl) {
      window.history.pushState(null, '', newUrl);
    }
  }, [activePage]);

  const renderContent = () => {
    // Dynamic single-page state routing matching all layout targets
    switch (activePage) {
      case 'home':
        return <Home setActivePage={setActivePage} />;
      case 'about':
        return <AboutUs />;

      case 'staff':
      case 'staff-trustees':
      case 'staff-pre-primary':
      case 'staff-primary':
      case 'staff-secondary':
      case 'staff-higher-secondary':
        const dept = activePage === 'staff' ? 'all' : activePage.replace('staff-', '');
        return <Staff activeDept={dept} />;

      case 'events':
        return <Events setActivePage={setActivePage} />;
      case 'vocational':
        return <Vocational />;
      case 'awards':
        return <Awards />;

      case 'blog':
      case 'blog-article':
        return <BlogArticle activePage={activePage} />;

      case 'ecorner':
      case 'ecorner-student':
      case 'ecorner-teacher':
      case 'ecorner-admin':
      case 'ecorner-parent':
      case 'ecorner-email':
        const panel = activePage === 'ecorner' ? 'student' : activePage.replace('ecorner-', '');
        return <ECorner activePanel={panel} />;

      case 'contact':
        return <Contact />;
      default:
        return <Home setActivePage={setActivePage} />;
    }
  };

  // Admin mode takes over the whole screen (no public header/footer)
  if (activePage === 'admin' || activePage === 'ecorner-admin') {
    return <AdminWrapper setActivePage={setActivePage} />;
  }

  return (
    <div className="app-shell">
      {/* Dynamic Header Component */}
      <Header activePage={activePage} setActivePage={setActivePage} />

      {/* Content Area Rendering Component */}
      <main className="main-content">
        {renderContent()}
      </main>

      {/* Dynamic Footer Component */}
      <Footer setActivePage={setActivePage} />
    </div>
  );
}

export default App;
