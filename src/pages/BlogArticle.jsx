import React, { useEffect } from 'react';
import ArticleHeader from '../components/blog/ArticleHeader';
import ArticleContent from '../components/blog/ArticleContent';
import CTABox from '../components/blog/CTABox';
import { getBlogsForPublic } from '../data/blogData';
import { getImageUrl } from '../data/imageStore';
import './BlogArticle.css';

const BlogArticle = ({ activePage }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  // Fetch blog data from the shared store (synced with admin panel)
  const blogs = getBlogsForPublic();

  let dbBlog = null;
  if (activePage && activePage.startsWith('blog-') && activePage !== 'blog-article') {
    const blogId = parseInt(activePage.replace('blog-', ''), 10);
    dbBlog = blogs.find(b => b.id === blogId);
  }
  if (!dbBlog && blogs.length > 0) {
    dbBlog = blogs[0];
  }

  if (!dbBlog) {
    return (
      <div className="blog-article-page animate-fade-in" style={{ padding: '150px 20px', textAlign: 'center' }}>
        <h2>No blog posts available.</h2>
        <p>Please check back later for new updates.</p>
      </div>
    );
  }

  const generatedContent = dbBlog.content
    ? dbBlog.content.split('\n').filter(p => p.trim()).map(p => ({ type: "paragraph", text: p }))
    : [
      { type: "paragraph", text: "As we step further into the 21st century, the intersection of education and technology becomes increasingly prominent. Artificial Intelligence is no longer just a concept from science fiction; it is actively shaping the way students learn and teachers instruct." },
      { type: "heading", text: "Personalized Learning Journeys" },
      { type: "paragraph", text: "One of the most significant advantages of AI in education is its ability to personalize learning. Adaptive learning systems can analyze a student's performance in real-time, identifying areas where they struggle and adjusting the curriculum accordingly." },
      { type: "quote", text: "Education is not preparation for life; education is life itself.", author: "John Dewey" },
      { type: "heading", text: "Empowering Educators" },
      { type: "paragraph", text: "AI is not here to replace teachers but to empower them. By automating administrative tasks such as grading and attendance, teachers have more time to focus on what truly matters: mentoring and inspiring their students." }
    ];

  // Mock data merged with DB data
  const article = {
    title: dbBlog.title,
    author: {
      name: "Dr. Dhaval Pandya",
      role: "Principal, I.G. Desai"
    },
    publishDate: dbBlog.createdAt || "June 05, 2026",
    readTime: 5,
    category: dbBlog.category || "EdTech",
    content: generatedContent
  };

  const getDisplayImage = (blog) => {
    if (!blog) return null;
    if (blog.imageId) return getImageUrl(blog.imageId);
    if (blog.filename) return `${blog.filepath}${blog.filename}`;
    return null;
  };

  const heroImage = getDisplayImage(dbBlog);
  const heroBackground = heroImage
    ? `linear-gradient(135deg, rgba(44, 62, 43, 0.85) 0%, rgba(77, 126, 29, 0.7) 100%), url(${heroImage}) center/cover no-repeat`
    : `linear-gradient(135deg, #2C3E2B 0%, #4D7E1D 100%)`;

  return (
    <div className="blog-article-page animate-fade-in">
      <div className="blog-hero-banner" style={{ background: heroBackground }}>
        <div className="container">
          <div className="blog-hero-content">
            {/* Space for future breadcrumbs or hero details */}
          </div>
        </div>
      </div>

      <div className="container blog-main-container">
        <div className="blog-grid">
          <div className="blog-main-content">
            <ArticleHeader
              title={article.title}
              author={article.author}
              publishDate={article.publishDate}
              readTime={article.readTime}
              category={article.category}
            />

            <ArticleContent content={article.content} />

            <div className="blog-ctas">
              <CTABox
                title="Subscribe to Our Newsletter"
                description="Get the latest updates on educational trends and school news delivered to your inbox."
                buttonText="Subscribe Now"
                type="newsletter"
              />

              <CTABox
                title="Want to join our vibrant community?"
                description="Learn more about our admission process and schedule a campus tour."
                buttonText="Admissions Info"
                type="consultation"
              />
            </div>
          </div>

          <aside className="blog-sidebar">
            <div className="sidebar-widget">
              <h3>Related Articles</h3>
              <ul className="related-articles-list">
                <li>
                  <a href="#">Integrating STEM in Primary Education</a>
                  <span className="related-date">May 20, 2026</span>
                </li>
                <li>
                  <a href="#">The Importance of Extracurriculars</a>
                  <span className="related-date">May 10, 2026</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogArticle;
