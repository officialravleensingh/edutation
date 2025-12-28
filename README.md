# Edutation - Productivity & Learning Platform

A comprehensive web application designed to enhance productivity and learning through integrated tools including a Pomodoro timer, educational video library, and digital book resources.

## 🚀 Features

###  FocusFlow - Pomodoro Timer
- **Customizable Timer Settings**: Adjustable focus sessions (15-45 minutes) and short breaks (5-15 minutes)
- **Visual Progress Tracking**: Circular progress indicator with smooth animations
- **Mode Switching**: Seamless transition between focus and break modes
- **Persistent Settings**: Timer preferences saved locally
- **Responsive Design**: Works perfectly on desktop and mobile devices

###  Course Library - Educational Videos
- **YouTube Integration**: Curated educational content via YouTube Data API v3
- **Smart Search**: Real-time search with 500ms debounce for optimal performance
- **Video Categories**: Focus, meditation, productivity, and self-improvement content
- **Embedded Player**: Full-screen video playback with detailed information
- **Pagination**: Efficient browsing through extensive video collections
- **Loading States**: Skeleton loaders for smooth user experience

###  Digital Library - Book Resources
- **Open Library Integration**: Access to thousands of books via Open Library API
- **Category Filtering**: Productivity, meditation, self-help, focus, and study skills
- **Advanced Search**: Search by title, author, or subject matter
- **PDF Access**: Direct links to readable content when available
- **Book Details**: Comprehensive information including publisher, year, and subjects
- **Responsive Cards**: Clean, organized display of book information

###  User Experience
- **Dark/Light Mode**: System-aware theme switching with smooth transitions
- **Responsive Navigation**: Mobile-friendly hamburger menu
- **Loading Indicators**: Visual feedback for all async operations
- **Error Handling**: Graceful error messages and recovery options
- **Accessibility**: ARIA labels and keyboard navigation support

##  Technology Stack

### Frontend Framework
- **React 18.3.1**: Modern React with hooks and functional components
- **Vite**: Lightning-fast build tool and development server
- **React Router DOM**: Client-side routing for SPA navigation

### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful, customizable icons

### APIs & Data
- **YouTube Data API v3**: Educational video content
- **Open Library API**: Book search and metadata
- **Local Storage**: Settings and preferences persistence


## 📁 Project Structure

```
edutation/
├── public/                 # Static assets (empty - no static files needed)
├── src/
│   ├── api/               # External API integrations
│   │   ├── youtubeApi.js  # YouTube Data API wrapper
│   │   └── openLibraryApi.js # Open Library API wrapper
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # Base UI components
│   │   │   ├── button.jsx # Customizable button component
│   │   │   └── card.jsx   # Card layout component
│   │   └── SkeletonLoader.jsx # Loading state component
│   ├── lib/              # Utility functions
│   │   └── utils.js      # Class name utilities
│   ├── pages/            # Main application pages
│   │   ├── Index.jsx     # Pomodoro timer page
│   │   ├── Videos.jsx    # Video library page
│   │   ├── Resources.jsx # Book resources page
│   │   └── NavBar.jsx    # Navigation component
│   ├── App.jsx           # Main application component
│   ├── main.jsx          # Application entry point
│   └── index.css         # Global styles and CSS variables
├── .env                  # Environment variables
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
├── vite.config.js        # Vite build configuration
└── README.md            # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- YouTube Data API v3 key (for video functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd edutation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_YOUTUBE_API_KEY=your_youtube_api_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:8080`

### Build for Production

```bash
# Production build
npm run build

# Preview production build
npm run preview

# Development build (for testing)
npm run build:dev
```

## 🔧 Configuration

### YouTube API Setup
1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable YouTube Data API v3
4. Create credentials (API Key)
5. Add the API key to your `.env` file

### Customization Options

#### Timer Settings
- Modify default timer values in `src/pages/Index.jsx`
- Adjust timer ranges in the settings component
- Customize visual themes and colors

#### Video Content
- Update search queries in `src/api/youtubeApi.js`
- Modify video categories and filters
- Adjust pagination limits

#### Book Categories
- Edit category list in `src/pages/Resources.jsx`
- Customize search parameters in `src/api/openLibraryApi.js`
- Modify book display format

##  Usage Guide

### Pomodoro Timer
1. **Set Your Preferences**: Adjust focus time (15-45 min) and break time (5-15 min)
2. **Choose Mode**: Select between Focus and Short Break
3. **Start Timer**: Click Start to begin your session
4. **Stay Focused**: The timer will automatically switch modes when complete
5. **Track Progress**: Visual progress ring shows remaining time

### Video Library
1. **Browse Content**: View curated educational videos on the main page
2. **Search Videos**: Use the search bar to find specific topics
3. **Watch Videos**: Click any video to open the embedded player
4. **Navigate Pages**: Use pagination controls to explore more content
5. **Return to Library**: Click "Back to videos" to return to the main view

### Digital Library
1. **Explore Categories**: Use category buttons to filter books by topic
2. **Search Books**: Enter keywords to find specific books or authors
3. **View Details**: Each book card shows title, author, publication info, and subjects
4. **Access Content**: Click "Read Online" for available PDF content
5. **Browse Pages**: Navigate through the extensive book collection

## 🔒 Security & Privacy

- **API Key Protection**: Environment variables keep sensitive data secure
- **No User Data Collection**: Application doesn't store personal information
- **Local Storage Only**: Settings saved locally on user's device
- **HTTPS Ready**: Production builds support secure connections


##  Troubleshooting

### Common Issues

**Videos not loading:**
- Verify YouTube API key in `.env` file
- Check API key permissions and quotas
- Ensure internet connection is stable

**Books not displaying:**
- Open Library API might be temporarily unavailable
- Check browser console for network errors
- Try refreshing the page

**Timer not working:**
- Clear browser cache and local storage
- Disable browser extensions that might interfere
- Check browser compatibility (modern browsers required)

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

This is a capstone project, but suggestions and feedback are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is created for educational purposes as part of a capstone project.


## 📞 Support

For questions or issues related to this capstone project, please create an issue in the repository or contact me.

---

**Built with ❤️ for enhanced productivity and learning**