# Dey's Yoga Classes Website

A modern, minimalistic website for Dey's Yoga Classes built with React.

## Features

- **Modern Design**: Clean, minimalistic interface with smooth animations
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Interactive Navigation**: Smooth scrolling between sections
- **Gallery Section**: Showcases yoga practice images
- **Contact Form**: Easy way for potential students to get in touch
- **Professional Information**: Complete details about the instructor and services

## Instructor

**Swati Dey** - Masters in Yoga
- Location: 86 Karunamoyee Ghat Road, Manjusree Apartment
- Phone: +91 8910528675

## Sections

1. **Hero Section**: Welcome message and call-to-action
2. **About**: Information about the yoga practice and instructor
3. **Services**: Different types of yoga classes offered
4. **Gallery**: Photos from yoga sessions
5. **Contact**: Contact information and inquiry form
6. **Footer**: Copyright and additional information

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
```

This builds the app for production to the `build` folder.

## Hosting / Deployment

The project is ready for hosting on various platforms:

### Netlify
1. Build the project: `npm run build`
2. Connect your repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `build`

### Vercel
1. Build the project: `npm run build`
2. Deploy via Vercel CLI: `npm i -g vercel && vercel`
3. Or connect your GitHub repository to Vercel

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d build"
   ```
3. Run: `npm run deploy`

### Important Notes for Hosting
- All images are stored in the `public` folder and will be available after build
- The build folder contains optimized static files
- Ensure your hosting provider supports Single Page Applications (SPA) routing

## Technologies Used

- React 18
- CSS3 with modern features
- Responsive design
- Google Fonts (Inter)
- Modern JavaScript (ES6+)

## Design Features

- **Color Scheme**: Purple gradient theme with clean whites and grays
- **Typography**: Inter font family for modern readability
- **Animations**: Smooth hover effects and transitions
- **Layout**: CSS Grid and Flexbox for responsive design
- **Images**: Optimized yoga practice photos in gallery

## Contact Information

For any inquiries about yoga classes, please contact:
- **Phone**: +91 8910528675
- **Instructor**: Swati Dey (Masters in Yoga)
- **Address**: 86 Karunamoyee Ghat Road, Manjusree Apartment

---

© 2024 Dey's Yoga Classes. All rights reserved.
