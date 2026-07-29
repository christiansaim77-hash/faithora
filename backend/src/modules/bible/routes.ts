/**
 * FAITHORA Bible Routes
 * Handles Bible content endpoints.
 */

export const bibleRoutes = {
  books: "/books",
  chapters: "/chapters/:bookId",
  verses: "/verses/:chapterId",
  search: "/search"
};