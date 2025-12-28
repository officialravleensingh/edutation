const BASE_URL = 'https://openlibrary.org';

const getPdfUrl = (book) => {
  if (book.ia && book.ia.length > 0) {
    return `https://archive.org/details/${book.ia[0]}`;
  }
  if (book.key) {
    return `https://openlibrary.org${book.key}`;
  }
  return null;
};

export const searchBooks = async (query = 'productivity', limit = 12, offset = 0) => {
  try {
    const searchUrl = `${BASE_URL}/search.json?q=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}&fields=key,title,author_name,first_publish_year,subject,ia,publisher,language`;
    
    const response = await fetch(searchUrl);
    
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }
    
    const data = await response.json();
    
    const books = data.docs.map(book => ({
      id: book.key || `book-${Math.random()}`,
      title: book.title || 'Unknown Title',
      author: book.author_name ? book.author_name[0] : 'Unknown Author',
      publishYear: book.first_publish_year || 'Unknown',
      subjects: book.subject ? book.subject.slice(0, 3) : [],
      pdfUrl: getPdfUrl(book),
      publisher: book.publisher ? book.publisher[0] : null,
      language: book.language ? book.language[0] : 'en'
    }));
    
    return {
      books,
      totalResults: data.numFound,
      hasMore: (offset + limit) < Math.min(data.numFound, 200)
    };
  } catch (error) {
    console.error('Error fetching books:', error);
    return { books: [], totalResults: 0, hasMore: false };
  }
};

export const getProductivityBooks = async (offset = 0) => {
  return await searchBooks('productivity', 12, offset);
};

export const searchBooksByCategory = async (category, offset = 0) => {
  const categoryQueries = {
    productivity: 'productivity time management efficiency',
    meditation: 'meditation mindfulness zen buddhism',
    selfhelp: 'self help personal development motivation',
    focus: 'focus concentration attention deep work',
    study: 'study skills learning techniques education'
  };
  
  const query = categoryQueries[category] || category;
  return await searchBooks(query, 12, offset);
};