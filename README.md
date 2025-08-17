# Steam Website Clone

A comprehensive Steam website clone built with HTML5, CSS3, and JavaScript ES6+. This project replicates the core functionality and design of Steam's platform, including a store, community features, game details, and authentication system.

Deploy:https://steam-front-end.vercel.app/

## 🎮 Features

### Core Pages
- **Homepage** (`index.html`) - Landing page with featured games, categories, and special offers
- **Store** (`store.html`) - Game browsing with filters, search, and shopping cart
- **Community** (`community.html`) - Forums, groups, and social features
- **About** (`about.html`) - Company information and team details
- **Support** (`support.html`) - Help articles and contact information
- **Game Detail** (`game-detail.html`) - Comprehensive game information page

### Authentication System
- **Sign In/Sign Up** - Modal-based authentication with form validation
- **User Sessions** - Persistent login state using localStorage
- **Protected Features** - Some features require authentication (e.g., playing games)

### Store Features
- **Game Browsing** - Grid layout with game cards
- **Search & Filters** - Genre, price, and tag-based filtering
- **Shopping Cart** - Add/remove games, view total, checkout
- **Wishlist** - Save games for later
- **Recently Viewed** - Track recently browsed games
- **Price Display** - Original and discounted prices with badges

### Game Detail Features
- **Comprehensive Information** - Description, features, screenshots, videos
- **DLC Support** - Downloadable content with pricing
- **User Reviews** - Rating system with helpful votes
- **System Requirements** - Minimum and recommended specs
- **Community Stats** - Owner count, wishlist numbers, ratings
- **Related Games** - Suggestions for similar titles

### Interactive Elements
- **Responsive Design** - Mobile-first approach with breakpoints
- **Hover Effects** - Smooth animations and transitions
- **Modal Windows** - Game details, cart, wishlist, authentication
- **Smooth Scrolling** - Navigation between page sections
- **Image Galleries** - Clickable screenshots and videos

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### Installation
1. Clone or download the project files
2. Open `index.html` in your web browser
3. Navigate through the different pages using the navigation menu

### File Structure
```
steam-clone/
├── index.html              # Homepage
├── store.html             # Store page
├── community.html         # Community page
├── about.html            # About page
├── support.html          # Support page
├── game-detail.html      # Game detail page
├── styles.css            # Global styles
├── script.js             # Global JavaScript
├── store-styles.css      # Store-specific styles
├── store.js              # Store functionality
├── community-styles.css  # Community styles
├── community.js          # Community functionality
├── about.js              # About page functionality
├── support.js            # Support page functionality
├── game-detail-styles.css # Game detail styles
├── game-detail.js        # Game detail functionality
└── README.md             # This file
```

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#1b2838` (Dark background)
- **Secondary Blue**: `#2a475e` (Card backgrounds)
- **Accent Blue**: `#66c0f4` (Highlights, buttons)
- **Success Green**: `#5c7e10` (Positive actions)
- **Text Colors**: `#c7d5e0` (Primary), `#8f98a0` (Secondary)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 300, 400, 500, 600, 700
- **Responsive Sizes**: Scalable from mobile to desktop

### Layout
- **Grid System**: CSS Grid for main layouts
- **Flexbox**: Component-level layouts
- **Breakpoints**: 480px, 768px, 1024px, 1200px

## 🔧 Technical Implementation

### Frontend Technologies
- **HTML5**: Semantic markup and accessibility
- **CSS3**: Modern features like Grid, Flexbox, and animations
- **JavaScript ES6+**: Modern syntax, modules, and APIs

### Key Features
- **Local Storage**: Cart, wishlist, and user data persistence
- **Session Storage**: Search query persistence across pages
- **Event Delegation**: Efficient event handling
- **Responsive Images**: Optimized image loading with Unsplash

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📱 Responsive Design

### Mobile-First Approach
- Base styles for mobile devices
- Progressive enhancement for larger screens
- Touch-friendly interactions
- Optimized navigation for small screens

### Breakpoints
- **Mobile**: 320px - 480px
- **Tablet**: 481px - 768px
- **Desktop**: 769px - 1024px
- **Large Desktop**: 1025px+

## 🛒 Shopping Features

### Cart System
- Add/remove games and DLC
- Quantity management
- Total calculation
- Checkout simulation
- Persistent storage

### Wishlist
- Save games for later
- Move items to cart
- Clear entire wishlist
- Visual indicators

### Search & Discovery
- Global search across all pages
- Genre-based filtering
- Price range filtering
- Tag-based categorization

## 🎮 Game Features

### Game Information
- Detailed descriptions
- Feature lists
- Screenshot galleries
- Video trailers
- System requirements

### Community Features
- User reviews and ratings
- Helpful vote system
- Community statistics
- Related game suggestions

### DLC Support
- Expansion packs
- Season passes
- Bundle pricing
- Add to cart functionality

## 🔐 Authentication

### User Management
- Email/password registration
- Secure login system
- Session persistence
- User profile display

### Protected Features
- Game launching (requires login)
- Personalized recommendations
- User-specific data
- Enhanced functionality

## 🎯 Future Enhancements

### Planned Features
- **User Profiles**: Customizable Steam profiles
- **Friend System**: Add friends and see online status
- **Achievements**: Game achievement tracking
- **Trading System**: Item trading between users
- **Workshop**: User-generated content
- **Multi-language**: Internationalization support

### Technical Improvements
- **Backend Integration**: Real API endpoints
- **Database**: Persistent data storage
- **Real-time Updates**: WebSocket integration
- **Progressive Web App**: PWA capabilities
- **Performance**: Code splitting and lazy loading

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test across different browsers
5. Submit a pull request

### Code Standards
- Use semantic HTML
- Follow CSS naming conventions
- Write clean, documented JavaScript
- Ensure responsive design
- Test accessibility features

## 📄 License

This project is for educational purposes and demonstrates modern web development techniques. It is not affiliated with Valve Corporation or Steam.

## 🙏 Acknowledgments

- **Valve Corporation** - For the Steam platform design inspiration
- **Unsplash** - For high-quality placeholder images
- **Font Awesome** - For the icon library
- **Google Fonts** - For the Inter font family

## 📞 Support

For questions or issues:
1. Check the existing documentation
2. Review the code comments
3. Create an issue in the repository
4. Contact the development team

---

**Note**: This is a demonstration project showcasing modern web development practices. It does not include actual game downloads or real Steam functionality.
