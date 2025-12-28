const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

const formatDuration = (duration) => {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const hours = (match[1] || '').replace('H', '');
  const minutes = (match[2] || '').replace('M', '');
  const seconds = (match[3] || '').replace('S', '');
  
  if (hours) {
    return `${hours}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
  }
  return `${minutes || '0'}:${seconds.padStart(2, '0')}`;
};

export const searchVideos = async (query = 'focus meditation productivity', maxResults = 15, pageToken = '') => {
  try {
    const searchUrl = `${BASE_URL}/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=${maxResults}&key=${API_KEY}${pageToken ? `&pageToken=${pageToken}` : ''}`;
    
    const searchResponse = await fetch(searchUrl);
    
    if (!searchResponse.ok) {
      throw new Error('Failed to fetch videos');
    }
    
    const searchData = await searchResponse.json();
    const videoIds = searchData.items.map(item => item.id.videoId).join(',');
    
    const detailsResponse = await fetch(
      `${BASE_URL}/videos?part=contentDetails,statistics&id=${videoIds}&key=${API_KEY}`
    );
    
    const detailsData = await detailsResponse.json();
    
    const videos = searchData.items.map((item, index) => {
      const details = detailsData.items[index];
      return {
        id: item.id.videoId,
        title: item.snippet.title,
        videoUrl: `https://www.youtube.com/embed/${item.id.videoId}`,
        thumbnail: item.snippet.thumbnails.medium.url,
        duration: details ? formatDuration(details.contentDetails.duration) : 'N/A',
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt
      };
    });
    
    return {
      videos,
      nextPageToken: searchData.nextPageToken,
      prevPageToken: searchData.prevPageToken,
      totalResults: searchData.pageInfo.totalResults
    };
  } catch (error) {
    console.error('Error fetching videos:', error);
    return { videos: [], nextPageToken: null, prevPageToken: null, totalResults: 0 };
  }
};

export const getPopularVideos = async (pageToken = '') => {
  return await searchVideos('focus meditation productivity self improvement', 12, pageToken);
};