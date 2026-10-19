/**
 * Image Store — client-side image persistence via localStorage
 
 
 * Storage layout:
 *   key: "igdesai_img_<id>"  →  value: data:image/...;base64,...
 */

const IMG_PREFIX = 'igdesai_img_';

/**
 * Save an image File/Blob to localStorage.
 * Returns a Promise that resolves with the generated image ID.
 */
export function saveImage(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve('');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const id = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      try {
        localStorage.setItem(IMG_PREFIX + id, reader.result);
      } catch (e) {
        console.warn('Image storage failed (quota exceeded?):', e);
        // Still resolve with the id — the display side will handle missing images gracefully
      }
      resolve(id);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

/**
 * Retrieve the data-URL for a stored image by its ID.
 * Returns null if the image is not found or ID is empty.
 */
export function getImageUrl(id) {
  if (!id) return null;
  try {
    return localStorage.getItem(IMG_PREFIX + id) || null;
  } catch (e) {
    console.warn('Failed to read image from localStorage:', e);
    return null;
  }
}

/**
 * Delete a stored image by its ID.
 */
export function deleteImage(id) {
  if (!id) return;
  try {
    localStorage.removeItem(IMG_PREFIX + id);
  } catch (e) {
    console.warn('Failed to delete image from localStorage:', e);
  }
}
