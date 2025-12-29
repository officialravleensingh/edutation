import { useState, useEffect, useCallback } from "react";
import { NavBar } from "./NavBar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, ChevronLeft, ChevronRight, Book, ExternalLink } from "lucide-react";
import { searchBooks, getProductivityBooks, searchBooksByCategory } from "../api/openLibraryApi";
import SkeletonLoader from "../components/SkeletonLoader";

const Resources = ({ toggleTheme, isDarkMode, isThemeLoading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuery, setCurrentQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Constants
  const MAX_PAGES = 17;

  const categories = [
    { id: "all", label: "All Books" },
    { id: "productivity", label: "Productivity" },
    { id: "meditation", label: "Meditation" },
    { id: "selfhelp", label: "Self Help" },
    { id: "focus", label: "Focus" },
    { id: "study", label: "Study Skills" }
  ];

  const loadInitialBooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    setCurrentPage(1);
    try {
      const data = await getProductivityBooks();
      setBooks(data.books);
      setTotalResults(data.totalResults);
      setHasMore(data.hasMore);
      setCurrentQuery("");
    } catch (err) {
      setError('Failed to load books. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = useCallback(async (page = 1) => {
    if (!searchTerm.trim() && !currentQuery) return;
    
    const query = searchTerm.trim() || currentQuery;
    const offset = (page - 1) * 12;
    setLoading(true);
    setError(null);
    
    try {
      const data = await searchBooks(query, 12, offset);
      setBooks(data.books);
      setTotalResults(data.totalResults);
      setHasMore(data.hasMore);
      setCurrentQuery(query);
      setCurrentPage(page);
    } catch (err) {
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, currentQuery]);

  useEffect(() => {
    loadInitialBooks();
  }, [loadInitialBooks]);

  useEffect(() => {
    if (searchTerm.trim()) {
      const timeoutId = setTimeout(() => {
        handleSearch();
      }, 500);
      return () => clearTimeout(timeoutId);
    } else if (searchTerm === "" && currentQuery) {
      loadInitialBooks();
    }
  }, [searchTerm, handleSearch, loadInitialBooks]);



  const handleNextPage = () => {
    if (hasMore && currentPage < MAX_PAGES) {
      const nextPage = currentPage + 1;
      if (currentQuery) {
        handleSearch(nextPage);
      } else {
        loadPage(nextPage);
      }
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      if (currentQuery) {
        handleSearch(prevPage);
      } else {
        loadPage(prevPage);
      }
    }
  };

  const loadPage = async (page) => {
    const offset = (page - 1) * 12;
    setLoading(true);
    try {
      const data = await getProductivityBooks(offset);
      setBooks(data.books);
      setHasMore(data.hasMore);
      setCurrentPage(page);
    } catch (err) {
      setError('Failed to load page.');
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySearch = async (categoryId) => {
    setLoading(true);
    setError(null);
    setCurrentPage(1);
    setSearchTerm("");
    
    try {
      const data = await searchBooksByCategory(categoryId);
      setBooks(data.books);
      setTotalResults(data.totalResults);
      setHasMore(data.hasMore);
      setCurrentQuery(categoryId);
    } catch (err) {
      setError('Failed to load category books.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar toggleTheme={toggleTheme} isDarkMode={isDarkMode} isThemeLoading={isThemeLoading} />

      <main className="flex-1 py-8 container space-y-6">
        <div className="mb-8">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">Digital Library</h1>
          <p className="text-muted-foreground text-xl">Discover books on productivity, focus, and self-improvement.</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(category => (
            <Button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                if (category.id === "all") {
                  loadInitialBooks();
                } else {
                  handleCategorySearch(category.id);
                }
              }}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
            >
              {category.label}
            </Button>
          ))}
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search books by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-4">Available Books</h2>
          
          {error && (
            <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          {loading ? (
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <SkeletonLoader className="h-8 w-8 rounded" />
                      <div className="flex-1">
                        <SkeletonLoader className="h-4 w-3/4 mb-2" />
                        <SkeletonLoader className="h-3 w-1/2 mb-2" />
                        <SkeletonLoader className="h-3 w-1/4" />
                      </div>
                      <SkeletonLoader className="h-8 w-20 rounded" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : books.length === 0 ? (
            <div className="text-center py-12">
              <Book className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-muted-foreground">No books found matching your search.</p>
            </div>
          ) : (
            <>
              <div className="grid gap-4">
                {books.map((book) => (
                  <Card key={book.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      {/* Mobile Layout */}
                      <div className="block sm:hidden p-4">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0">
                            <Book className="h-6 w-6 text-blue-500 mt-1" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-sm line-clamp-2 mb-1">{book.title}</h3>
                            <p className="text-xs text-muted-foreground mb-1">by {book.author}</p>
                            <p className="text-xs text-muted-foreground">{book.publishYear}</p>
                          </div>
                          <div className="flex-shrink-0">
                            {book.pdfUrl ? (
                              <a href={book.pdfUrl} target="_blank" rel="noopener noreferrer">
                                <Button size="sm" className="text-xs px-2 py-1 h-7">
                                  <ExternalLink size={12} className="mr-1" />
                                  Read
                                </Button>
                              </a>
                            ) : (
                              <Button size="sm" variant="outline" disabled className="text-xs px-2 py-1 h-7">
                                N/A
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden sm:block">
                        <div className="flex items-center p-4 gap-4">
                          <div className="flex-shrink-0">
                            <Book className="h-8 w-8 text-blue-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium line-clamp-2 mb-1">{book.title}</h3>
                            <p className="text-sm text-muted-foreground mb-1">by {book.author}</p>
                            <div className="flex items-center text-xs text-muted-foreground mb-2">
                              <span>Published: {book.publishYear}</span>
                              {book.publisher && (
                                <>
                                  <span className="mx-2">•</span>
                                  <span>{book.publisher}</span>
                                </>
                              )}
                            </div>
                            {book.subjects.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {book.subjects.slice(0, 3).map((subject, index) => (
                                  <span key={index} className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                                    {subject}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="flex-shrink-0">
                            {book.pdfUrl ? (
                              <a href={book.pdfUrl} target="_blank" rel="noopener noreferrer">
                                <Button size="sm" className="flex items-center gap-2">
                                  <ExternalLink size={14} />
                                  {book.pdfUrl.includes('archive.org') ? 'Read Online' : 'View Details'}
                                </Button>
                              </a>
                            ) : (
                              <Button size="sm" variant="outline" disabled>
                                No PDF Available
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {(hasMore || currentPage > 1) && (
                <div className="flex flex-col items-center gap-4 mt-8">
                  <div className="flex items-center gap-4">
                    <Button 
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <ChevronLeft size={16} />
                      Previous
                    </Button>
                    
                    <span className="text-sm text-muted-foreground px-4">
                      Page {currentPage}
                    </span>
                    
                    <Button 
                      onClick={handleNextPage}
                      disabled={!hasMore || currentPage >= MAX_PAGES}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      Next
                      <ChevronRight size={16} />
                    </Button>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    {totalResults > 0 && `${Math.min(totalResults, 200).toLocaleString()} books available`}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Resources;