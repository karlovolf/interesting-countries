# World Countries Explorer

An interactive web application for exploring detailed information about countries worldwide with search, filtering, and an interactive world map.

## Installation

```bash
# Clone the repository
git clone https://github.com/karlovolf/interesting-countries
cd interesting-countries

# Install dependencies
npm install

# Start development server
npm run dev
```

## Usage

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Key Features

- **Interactive World Map** - Clickable countries with dynamic coloring based on filters
- **Advanced Search** - Search by country name, capital, region, or country codes
- **Smart Filtering** - Filter by region, subregion, and population ranges
- **Detailed Country Information** - View comprehensive data including demographics, currencies, languages, and borders
- **Responsive Design** - Optimized for both desktop and mobile devices
- **Accessibility** - Screen reader support and keyboard navigation

## How It Works

### Architecture
- **Frontend**: React 18 with TypeScript and Vite for fast development
- **State Management**: Redux Toolkit for efficient data fetching and caching
- **UI Components**: Radix UI primitives with Tailwind CSS for modern, responsive design
- **Map Visualization**: react-simple-maps with world atlas data for interactive geography

### Workflow
1. **Data Fetching** - REST Countries API provides real-time country information
2. **Search & Filter** - Client-side filtering with instant results for optimal performance
3. **Map Integration** - Geographic data matching with API data for visual representation
4. **Detail Views** - Modal-based country details with comprehensive information display

### Tech Stack
- **Frontend**: React 18.3.1 + TypeScript 5.8.3
- **Build Tool**: Vite 7.1.7
- **Styling**: Tailwind CSS 4.1.13
- **State Management**: Redux Toolkit 2.9.0
- **UI Components**: Radix UI via ShadcnUI (Dialog, Popover, Select)
- **Icons**: Lucide React 0.544.0
- **Maps**: react-simple-maps 3.0.0 + d3-geo 3.1.1
- **API**: REST Countries API v3.1

## License

MIT License - feel free to use this project for personal or commercial purposes.
