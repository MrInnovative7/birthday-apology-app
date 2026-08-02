# Romantic Birthday & Apology Website 🎉❤️

A premium, interactive romantic birthday and apology experience with magical animations, smooth transitions, and heartfelt messages. Built with Next-generation React, GSAP, Framer Motion, and Three.js.

## 🌟 Features

- **7 Animated Full-Screen Pages** with cinematic GSAP transitions
- **Premium Animations**: GSAP page transitions, Framer Motion interactions, particle effects
- **Interactive Elements**: Clickable hearts, animated envelope, gift box opening
- **Particle Effects**: Confetti, fireworks, floating hearts, sparkles, fireflies
- **Three.js Background**: Dynamic particle systems and visual effects
- **Smooth Scrolling**: Lenis smooth scroll integration
- **Custom Cursor**: Animated cursor with trail effect
- **Music Player**: Soft romantic piano with toggle control
- **Loading Screen**: Elegant 100% loader with animations
- **Easter Egg**: Press 'H' to reveal a hidden message
- **Fully Responsive**: Mobile, tablet, and desktop optimized
- **Production Ready**: Deployable to Vercel without modifications

## 🎨 Design Philosophy

The website embodies a **magical, premium romantic experience** inspired by:
- Apple's meticulous attention to motion and detail
- Disney's enchantment and wonder
- Luxury brand aesthetics

### Color Palette
- **Deep Purple (#2E114E)**: Foundation - mysterious and romantic
- **Dark Violet**: Secondary depth for layering
- **Pink Neon (#FF2E93)**: Emotional accent - love and passion
- **Soft White**: Clarity and elegance
- **Golden Glow**: Luxury highlights

## 📋 Pages Overview

### Page 1: Hero Welcome
Cute animated character waving, heartfelt greeting, and CTA button to start the surprise.

### Page 2: Birthday Happiness Meter
Animated progress bar that fills to 150%, triggering confetti, fireworks, and celebration effects.

### Page 3: Tap Every Heart
5 interactive heart cards that reveal apology and birthday messages when clicked.

### Page 4: Beautiful Memories
Floating Polaroid gallery with parallax effect and glow animations (placeholder images for customization).

### Page 5: Animated Envelope
Click to open envelope and reveal a handwritten-style romantic letter.

### Page 6: Luxury Gift Box
Click to open gift box with explosion effects revealing 10 reasons why they're special.

### Page 7: Final Night Sky
Night sky with moon, stars, fireflies, and snowfall. Interactive heart button triggers heart rain, butterflies, fireworks, and sparkles.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and pnpm installed

### Installation

1. **Clone or extract the project**
   ```bash
   cd romantic-birthday-apology
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm run dev
   ```

   The website will be available at `http://localhost:3000`

## 🛠️ Development

### Available Scripts

```bash
# Start development server with hot reload
pnpm run dev

# Build for production
pnpm run build

# Start production server
pnpm start

# Preview production build locally
pnpm run preview

# Type check
pnpm run check

# Format code
pnpm run format
```

## 📁 Project Structure

```
client/
├── src/
│   ├── pages/
│   │   ├── Page1Hero.tsx          # Hero welcome page
│   │   ├── Page2HappinessMeter.tsx # Happiness meter
│   │   ├── Page3Hearts.tsx         # Interactive hearts
│   │   ├── Page4Gallery.tsx        # Memory gallery
│   │   ├── Page5Letter.tsx         # Animated envelope
│   │   ├── Page6Gift.tsx           # Gift box
│   │   └── Page7Final.tsx          # Final night sky
│   ├── components/
│   │   ├── CustomCursor.tsx        # Animated cursor
│   │   ├── MusicPlayer.tsx         # Music toggle
│   │   └── LoadingScreen.tsx       # Loading screen
│   ├── hooks/
│   │   ├── usePageTransition.ts    # Page transition logic
│   │   └── useParticles.ts         # Particle effects
│   ├── utils/
│   │   └── animations.ts           # GSAP animation utilities
│   ├── App.tsx                     # Main app component
│   ├── main.tsx                    # React entry point
│   └── index.css                   # Global styles
├── index.html                      # HTML template
└── public/                         # Static assets
```

## 🎨 Customization Guide

### Change Her Name
Edit `client/src/App.tsx` and update the `herName` state:
```typescript
const [herName, setHerName] = useState('Your Name Here');
```

### Replace Placeholder Images
In `Page4Gallery.tsx`, replace the placeholder image URLs with actual photos:
```typescript
// Replace the gradient with actual image
<div className="w-full h-40 md:h-48 bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400">
  {/* Change to: */}
  <img src="/path/to/your/image.jpg" alt="Memory" className="w-full h-full object-cover" />
</div>
```

### Customize Messages
Edit the message arrays in each page component:
- **Page 3**: `heartMessages` array
- **Page 5**: Letter content in `Page5Letter.tsx`
- **Page 6**: `reasons` array

### Add Background Music
Place your music file in `public/music/` and update the path in `MusicPlayer.tsx`:
```typescript
src={musicUrl || '/music/your-music.mp3'}
```

### Change Colors
Edit the color variables in `client/src/index.css`:
```css
:root {
  --primary: #FF2E93; /* Pink Neon */
  --secondary: #2E114E; /* Deep Purple */
  /* ... other colors */
}
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/romantic-birthday-apology.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect the Next.js setup
   - Click "Deploy"

3. **Custom Domain** (Optional)
   - In Vercel dashboard, go to Settings → Domains
   - Add your custom domain

### Deploy to Other Platforms

The project can be deployed to any Node.js hosting platform:

**Netlify:**
```bash
pnpm run build
# Deploy the dist folder
```

**Railway, Render, etc:**
- Build command: `pnpm run build`
- Start command: `pnpm start`
- Node version: 18+

## 📦 Tech Stack

- **React 19**: Latest React with hooks
- **TypeScript**: Type-safe development
- **Tailwind CSS 4**: Utility-first styling
- **GSAP 3**: Professional animations
- **Framer Motion**: Component animations
- **Three.js**: 3D graphics
- **React Three Fiber**: React renderer for Three.js
- **Lottie React**: Lottie animations
- **Lenis**: Smooth scrolling
- **Canvas Confetti**: Confetti effects
- **React Icons**: Icon library
- **Vite**: Fast build tool

## 🎯 Performance Optimizations

- Lazy loading of components
- Optimized animations (GPU-accelerated)
- Image optimization
- Code splitting
- Tree shaking
- Minification and compression

## ♿ Accessibility

- Respects `prefers-reduced-motion` setting
- Keyboard navigation support
- ARIA labels on interactive elements
- Semantic HTML structure
- High contrast text

## 🐛 Troubleshooting

### Port 3000 already in use
```bash
# Use a different port
pnpm run dev -- --port 3001
```

### Dependencies installation issues
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Build fails
```bash
# Check TypeScript errors
pnpm run check

# Clear build cache
rm -rf dist .vite
pnpm run build
```

## 📝 Notes

- All animations respect user preferences for reduced motion
- The website is fully responsive and works on all modern browsers
- No external APIs are required - everything runs client-side
- Music files should be in MP3 or WAV format for best compatibility
- Images should be optimized for web (compressed and appropriately sized)

## 💝 Tips for Maximum Impact

1. **Personalize Everything**: Replace placeholder text and images with your own
2. **Add Your Photos**: Upload your favorite memories to Page 4
3. **Customize Messages**: Make each message personal and heartfelt
4. **Choose Background Music**: Select soft, romantic piano music
5. **Test on Mobile**: Ensure the experience is perfect on her device
6. **Share the Link**: Deploy and share the URL with her

## 📄 License

MIT License - Feel free to use and modify for personal use.

## 🙏 Credits

Built with love using modern web technologies. Every animation, every detail, every pixel is crafted with care.

---

**Made with ❤️ for someone special**
