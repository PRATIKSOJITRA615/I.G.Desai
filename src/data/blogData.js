/**
 * Shared Blog Data Module
 *
 * Single source of truth for blog/news data used by both:
 *   - Admin BlogManager (CRUD operations)
 *   - User-facing BlogArticle page (read)
 *
 * Persists admin changes to localStorage.
 * Image references are stored as imageStore IDs.
 */

const STORAGE_KEY = 'igdesai_blog_data';

export const BLOG_CATEGORIES = [
  { id: 'academic', label: 'Academic' },
  { id: 'sports', label: 'Sports' },
  { id: 'cultural', label: 'Cultural' },
  { id: 'competitions', label: 'Competitions' },
  { id: 'health-wellness', label: 'Health & Wellness' },
  { id: 'social-outreach', label: 'Social Outreach' },
  { id: 'news', label: 'News & Announcements' },
  { id: 'blog', label: 'Blog Posts' }
];

const DEFAULT_BLOGS = [
  {
    id: 1,
    title: 'Annual Sports Day 2026',
    filename: 'sports-day.jpg',
    filepath: '/uploads/blogs/',
    imageId: '',          // imageStore ID (empty = no uploaded image)
    category: 'Sports',
    content: '',
    displayrank: 1,
    createdAt: '2026-01-15',
  },
];

/**
 * Load blog list from localStorage, falling back to defaults.
 */
export function getBlogList() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.warn('Failed to read blog data from localStorage:', e);
  }
  return [...DEFAULT_BLOGS];
}

/**
 * Persist the entire blog list.
 */
export function saveBlogList(blogList) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blogList));
  } catch (e) {
    console.warn('Failed to save blog data to localStorage:', e);
  }
}

/**
 * Add a new blog post and persist.
 * Returns the updated list.
 */
export function addBlog(blogList, newBlogData) {
  const newBlog = {
    id: Date.now(),
    title: newBlogData.title || '',
    filename: newBlogData.filename || '',
    filepath: '/uploads/blogs/',
    imageId: newBlogData.imageId || '',
    category: newBlogData.category || 'News & Announcements',
    content: newBlogData.content || '',
    displayrank: newBlogData.displayrank || 0,
    createdAt: new Date().toISOString().split('T')[0],
  };
  const updated = [...blogList, newBlog];
  saveBlogList(updated);
  return updated;
}

/**
 * Delete a blog post by ID and persist.
 * Returns the updated list.
 */
export function deleteBlog(blogList, id) {
  const updated = blogList.filter(b => b.id !== id);
  saveBlogList(updated);
  return updated;
}

/**
 * Get blog list formatted for user-facing display.
 * Sorted by displayrank ascending.
 */
export function getBlogsForPublic() {
  const list = getBlogList();
  return list
    .sort((a, b) => (a.displayrank || 0) - (b.displayrank || 0))
    .map(b => ({
      id: b.id,
      title: b.title,
      imageId: b.imageId || '',
      filename: b.filename || '',
      filepath: b.filepath || '',
      category: b.category || 'News & Announcements',
      content: b.content || '',
      createdAt: b.createdAt || '',
    }));
}
