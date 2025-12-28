import { useState, useEffect, useCallback } from "react";
import { NavBar } from "./NavBar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { searchVideos, getPopularVideos } from "../api/youtubeApi";
import SkeletonLoader from "../components/SkeletonLoader";

export default function Videos({ toggleTheme, isDarkMode, isThemeLoading }) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuery, setCurrentQuery] = useState("");
  const [nextPageToken, setNextPageToken] = useState(null);
  const [prevPageToken, setPrevPageToken] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // Constants
  const MAX_PAGES = 17;

  const loadInitialVideos = useCallback(async () => {
    setLoading(true);
    setError(null);
    setCurrentPage(1);
    try {
      const data = await getPopularVideos();
      setVideos(data.videos);
      setNextPageToken(data.nextPageToken);
      setPrevPageToken(null);
      setTotalResults(data.totalResults);
      setCurrentQuery("");
    } catch (err) {
      setError('Failed to load videos. Please check your API key.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = useCallback(async (pageToken = "") => {
    if (!searchTerm.trim() && !currentQuery) return;
    
    const query = searchTerm.trim() || currentQuery;
    setLoading(true);
    setError(null);
    
    if (!pageToken) {
      setCurrentPage(1);
    }
    
    try {
      const data = await searchVideos(query, 12, pageToken);
      setVideos(data.videos);
      setNextPageToken(data.nextPageToken);
      setPrevPageToken(data.prevPageToken);
      setTotalResults(data.totalResults);
      setCurrentQuery(query);
    } catch (err) {
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, currentQuery]);

  useEffect(() => {
    loadInitialVideos();
  }, [loadInitialVideos]);

  useEffect(() => {
    if (searchTerm.trim()) {
      const timeoutId = setTimeout(() => {
        handleSearch();
      }, 500);
      return () => clearTimeout(timeoutId);
    } else if (searchTerm === "") {
      loadInitialVideos();
    }
  }, [searchTerm, handleSearch, loadInitialVideos]);



  const handleNextPage = () => {
    if (nextPageToken) {
      setCurrentPage(prev => prev + 1);
      if (currentQuery) {
        handleSearch(nextPageToken);
      } else {
        loadPage(nextPageToken);
      }
    }
  };

  const handlePrevPage = () => {
    if (prevPageToken && currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      if (currentQuery) {
        handleSearch(prevPageToken);
      } else {
        loadPage(prevPageToken);
      }
    }
  };

  const loadPage = async (pageToken) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPopularVideos(pageToken);
      setVideos(data.videos);
      setNextPageToken(data.nextPageToken);
      setPrevPageToken(data.prevPageToken);
    } catch (err) {
      setError('Failed to load page.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar toggleTheme={toggleTheme} isDarkMode={isDarkMode} isThemeLoading={isThemeLoading} />

      <main className="flex-1 py-8 container">
        {selectedVideo ? (
          <div className="space-y-6">
            <button onClick={() => setSelectedVideo(null)} className="text-sm font-medium hover:underline">← Back to videos</button>
            <h2 className="text-2xl font-bold">{selectedVideo.title}</h2>
            <div className="aspect-video w-full max-w-4xl">
              <iframe
                className="w-full h-full"
                src={selectedVideo.videoUrl}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="text-muted-foreground text-sm">Duration: {selectedVideo.duration}</p>
            <p className="text-muted-foreground text-sm">Channel: {selectedVideo.channelTitle}</p>
          </div>
        ) : (
          <div>
            <h1 className="text-4xl font-bold mb-2">Course Library</h1>
            <p className="text-muted-foreground text-xl mb-6">Select a video to start learning.</p>
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search videos by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>

            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-4">All Videos</h2>
              
              {error && (
                <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}
              
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <SkeletonLoader className="aspect-video w-full mb-2" />
                      <SkeletonLoader className="h-4 w-3/4 mb-1" />
                      <SkeletonLoader className="h-3 w-1/2" />
                    </div>
                  ))}
                </div>
              ) : videos.length === 0 ? (
                <p className="text-muted-foreground">No videos found matching your search.</p>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {videos.map((video) => (
                      <Card key={video.id} className="cursor-pointer overflow-hidden" onClick={() => setSelectedVideo(video)}>
                        <div className="relative aspect-video">
                          <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover"/>
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <div className="rounded bg-white/90 px-4 py-2 text-primary font-semibold text-sm">Play</div>
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">{video.duration}</div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium line-clamp-2">{video.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{video.channelTitle}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  {(nextPageToken || prevPageToken) && (
                    <div className="flex flex-col items-center gap-4 mt-8">
                      <div className="flex items-center gap-4">
                        <Button 
                          onClick={handlePrevPage}
                          disabled={!prevPageToken || currentPage === 1}
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
                          disabled={!nextPageToken || currentPage >= MAX_PAGES}
                          variant="outline"
                          className="flex items-center gap-2"
                        >
                          Next
                          <ChevronRight size={16} />
                        </Button>
                      </div>
                      
                      <div className="text-sm text-muted-foreground">
                        {totalResults > 0 && `${Math.min(totalResults, 200).toLocaleString()} results (max 200)`}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}