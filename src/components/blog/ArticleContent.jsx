import React from 'react';

const ArticleContent = ({ content }) => {
  if (!content || !Array.isArray(content)) return null;
  
  return (
    <div className="article-content">
      {content.map((block, index) => {
        switch (block.type) {
          case 'paragraph':
            return <p key={index}>{block.text}</p>;
          case 'heading':
            return <h2 key={index}>{block.text}</h2>;
          case 'image':
            return (
              <figure key={index} className="article-image-figure">
                <img src={block.url} alt={block.caption || 'Article image'} />
                {block.caption && <figcaption>{block.caption}</figcaption>}
              </figure>
            );
          case 'quote':
            return (
              <blockquote key={index}>
                <p>"{block.text}"</p>
                {block.author && <cite>- {block.author}</cite>}
              </blockquote>
            );
          default:
            return <p key={index}>{block.text || block.content}</p>;
        }
      })}
    </div>
  );
};

export default ArticleContent;
