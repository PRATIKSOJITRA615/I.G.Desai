/**
 * Shared Staff Data Module
 * 
 * Single source of truth for staff data used by both:
 *   - Admin StaffManager (CRUD operations)
 *   - User-facing Staff page (read + category filter)
 * 
 * Persists admin changes to localStorage.
 * Category normalization: "Higher Secondary" → "higher-secondary"
 */

const STORAGE_KEY = 'igdesai_staff_data';
const DATA_VERSION_KEY = 'igdesai_staff_data_version';
const DATA_VERSION = 3; // bump this whenever DEFAULT_STAFF is updated

// Canonical category definitions shared across admin and public pages
export const CATEGORIES = [
  { id: 'trustees', label: 'Trustees', adminValue: 'Trustees' },
  { id: 'pre-primary', label: 'Pre Primary', adminValue: 'Pre-Primary' },
  { id: 'primary', label: 'Primary', adminValue: 'Primary' },
  { id: 'secondary', label: 'Secondary', adminValue: 'Secondary' },
  { id: 'higher-secondary', label: 'Higher Secondary', adminValue: 'Higher Secondary' },
  { id: 'principal', label: 'Principal', adminValue: 'Principal' },
];

/**
 * Convert an admin category value (e.g. "Higher Secondary") to
 * the lowercase-hyphenated dept key used for filtering (e.g. "higher-secondary").
 */
export function categoryToDepKey(category) {
  if (!category) return '';
  return category.toLowerCase().replace(/\s+/g, '-');
}

/**
 * Default staff records — the initial seed data.
 * Each record uses the admin-style `category` value.
 * The user-facing page derives `dept` at read-time via categoryToDepKey().
 */
const DEFAULT_STAFF = [
  { id: 1, name: "Dr. Naimesh Kishorchandra Desai", category: "Trustees", posttype: "President", qualification: "M.D., D.C.H.Pediatrics", descriptions: "Doctor-Pediatrician", image: "", sortno: 1 },
  { id: 2, name: "Shri Parimalbhai Gunvantrai Desai", category: "Trustees", posttype: "Secretary", qualification: "M.E.Civil ( U.S.A.), M.ASCE, M.IE, M.IGS", descriptions: "", image: "", sortno: 2 },
  { id: 3, name: "Shri Arvindlal Harilal Gandhi", category: "Trustees", posttype: "Business", qualification: "B.Com.", descriptions: "", image: "", sortno: 3 },
  { id: 4, name: "Shri Dineshchandra Nandsukhlal Navab", category: "Trustees", posttype: "Business", qualification: "", descriptions: "", image: "", sortno: 4 },
  { id: 5, name: "Srimati Jhanaviben Gautambhai Desai", category: "Trustees", posttype: "Housewife and Social Activits", qualification: "", descriptions: "", image: "", sortno: 5 },
  { id: 6, name: "Shri Laljibhai Shivajibhai Patel", category: "Trustees", posttype: "", qualification: "", descriptions: "", image: "", sortno: 6 },
  { id: 7, name: "Hardik Desai", category: "Trustees", posttype: "Head Of Shilp Maitri Group", qualification: "", descriptions: "", image: "", sortno: 7 },
  { id: 8, name: "Sonalben M. Desai", category: "Pre-Primary", posttype: "Principal", qualification: "B.Com. Mont", descriptions: "", image: "", sortno: 1 },
  { id: 9, name: "Dakshaben F. Tandel", category: "Pre-Primary", posttype: "", qualification: "B.Com. Mont", descriptions: "", image: "", sortno: 2 },
  { id: 10, name: "Gitaben H. Modi", category: "Pre-Primary", posttype: "", qualification: "B.A. , M.A.", descriptions: "", image: "", sortno: 3 },
  { id: 11, name: "Hemakshiben R. Mistry", category: "Pre-Primary", posttype: "", qualification: "B.Com. Mont", descriptions: "", image: "", sortno: 4 },
  { id: 12, name: "Urviben D desai", category: "Pre-Primary", posttype: "", qualification: "B.Com. Mont", descriptions: "", image: "", sortno: 5 },
  { id: 13, name: "Manishaben U Patel", category: "Pre-Primary", posttype: "", qualification: "H.S.C. Mont.", descriptions: "", image: "", sortno: 6 },
  { id: 14, name: "Alpaben M Nayak", category: "Pre-Primary", posttype: "", qualification: "B.Com. ,D.C.A.", descriptions: "", image: "", sortno: 7 },
  { id: 15, name: "Sunandaben R Vasava", category: "Pre-Primary", posttype: "", qualification: "Std. 5th", descriptions: "", image: "", sortno: 8 },
  { id: 16, name: "Savitaben S Patel", category: "Pre-Primary", posttype: "", qualification: "Std. 7th", descriptions: "", image: "", sortno: 9 },
  { id: 17, name: "Mrs. Shruti Desai", category: "Primary", posttype: "Headmistress (Primary Section)", qualification: "M.A., B.Ed. (English Literature)", descriptions: "15 Years", image: "", sortno: 1 },
  { id: 18, name: "Mr. Rajesh Panchal", category: "Secondary", posttype: "Senior Science Educator", qualification: "M.Sc., B.Ed. (Physics)", descriptions: "12 Years", image: "", sortno: 1 },
  { id: 19, name: "Mrs. Alka Patel", category: "Secondary", posttype: "Mathematics Instructor", qualification: "B.Sc., B.Ed. (Mathematics)", descriptions: "9 Years", image: "", sortno: 2 },
  { id: 20, name: "Mr. Sandeep Solanki", category: "Secondary", posttype: "Computer & ICT Coordinator", qualification: "M.C.A., B.Ed.", descriptions: "8 Years", image: "", sortno: 3 },
  { id: 21, name: "Mrs. Meena Shah", category: "Primary", posttype: "Social Science teacher", qualification: "B.A., B.Ed. (History)", descriptions: "11 Years", image: "", sortno: 2 },

  // ── Higher Secondary ──────────────────────────────────────────────────────
  { id: 22, name: "Shri Alpeshkumar N Kacha", category: "Higher Secondary", posttype: "Principal", qualification: "M.Sc., M.Ed.", descriptions: "Faculty Of Science | Subject – Maths, Science", image: "", sortno: 1 },
  { id: 23, name: "Sunilkumar Sundarbhai Khalasi", category: "Higher Secondary", posttype: "Faculty of Account", qualification: "M.COM, M.ED", descriptions: "", image: "", sortno: 2 },
  { id: 24, name: "Kirankumar Pulajibhai Gamit", category: "Higher Secondary", posttype: "Teacher", qualification: "M.Com, M.Ed.", descriptions: "Subject B.A Higher Secondary", image: "", sortno: 3 },
  { id: 25, name: "Bhumikaben Nareshbhai Patel", category: "Higher Secondary", posttype: "Teacher", qualification: "M.A., B.Ed.", descriptions: "Subject English Higher Secondary", image: "", sortno: 4 },
  { id: 26, name: "Patel Pragnaben Kanubhai", category: "Higher Secondary", posttype: "Teacher", qualification: "M.Com.", descriptions: "Statistics Commerce", image: "", sortno: 5 },
  { id: 27, name: "Dhavalbhai Priyakantbhai Pandya", category: "Higher Secondary", posttype: "Faculty Of Computer", qualification: "M.Com. (PGDCA, HDSA)", descriptions: "Subject – Computer", image: "", sortno: 6 },
  { id: 28, name: "Pareshbhai Jagdishbhai Dave", category: "Higher Secondary", posttype: "Faculty Of Computer", qualification: "D.M.E., P.D.C.A.", descriptions: "Subject – Computer", image: "", sortno: 7 },
  { id: 29, name: "Shivali Pravinchandra Desai", category: "Higher Secondary", posttype: "Faculty Of Science", qualification: "M.Sc., B.Ed.", descriptions: "Subject – Chemistry", image: "", sortno: 8 },
  { id: 30, name: "Rachnaben Brijeshkumar Mehta", category: "Higher Secondary", posttype: "Faculty Of Science", qualification: "M.Sc., B.Ed.", descriptions: "Subject – Maths", image: "", sortno: 9 },
  { id: 31, name: "Sudarshan K Master", category: "Higher Secondary", posttype: "Teacher", qualification: "M.Sc., B.Ed. (Botany)", descriptions: "Sub – Biology", image: "", sortno: 10 },
];

/**
 * Load staff list from localStorage, falling back to DEFAULT_STAFF on first run.
 */
export function getStaffList() {
  try {
    // If the stored data version doesn't match the current version,
    // discard the stale cache and re-seed from DEFAULT_STAFF.
    const storedVersion = parseInt(localStorage.getItem(DATA_VERSION_KEY) || '0', 10);
    if (storedVersion !== DATA_VERSION) {
      localStorage.setItem(DATA_VERSION_KEY, String(DATA_VERSION));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_STAFF));
      return [...DEFAULT_STAFF];
    }
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn('Failed to read staff data from localStorage:', e);
  }
  return [...DEFAULT_STAFF];
}

/**
 * Persist the entire staff list to localStorage.
 */
export function saveStaffList(staffList) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(staffList));
  } catch (e) {
    console.warn('Failed to save staff data to localStorage:', e);
  }
}

/**
 * Add a new staff record and persist.
 * Returns the updated list.
 */
export function addStaff(staffList, newStaffData) {
  const newStaff = {
    id: Date.now(),
    ...newStaffData,
    entrydate: new Date().toISOString().split('T')[0],
  };
  const updated = [...staffList, newStaff];
  saveStaffList(updated);
  return updated;
}

/**
 * Delete a staff record by ID and persist.
 * Returns the updated list.
 */
export function deleteStaff(staffList, id) {
  const updated = staffList.filter(s => s.id !== id);
  saveStaffList(updated);
  return updated;
}

/**
 * Get staff list formatted for the user-facing page.
 * Maps the admin `category` + `posttype` fields to the `dept` + `role` fields
 * expected by the Staff component.
 */
export function getStaffForPublic() {
  const list = getStaffList();
  return list
    .sort((a, b) => (a.sortno || 0) - (b.sortno || 0))
    .map(s => ({
      name: s.name,
      role: s.posttype || '',
      dept: categoryToDepKey(s.category),
      qualification: s.qualification || '',
      experience: s.descriptions || '',
      email: '',
      imageId: s.imageId || '',
    }));
}
