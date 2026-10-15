import React from 'react';

const ArticleHeader = ({ title, author, publishDate, readTime, category }) => {
  return (
    <div className="article-header">
      <span className="article-category">{category}</span>
      <h1 className="article-title">{title}</h1>
      
      <div className="article-meta">
        <div className="article-author">
          <div className="author-avatar">
            {author?.name?.charAt(0) || 'A'}
          </div>
          <div className="author-info">
            <span className="author-name">{author?.name}</span>
            <span className="author-role">{author?.role}</span>
          </div>
        </div>
        
        <div className="article-details">
          <span>{publishDate}</span>
          <span className="meta-separator">•</span>
          <span>{readTime} min read</span>
        </div>
      </div>
    </div>
  );
};

export default ArticleHeader;
