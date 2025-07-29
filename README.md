# RNA Cartography Landing Page

A ultra-minimal, high-contrast landing page with character-by-character spiral animations evoking RNA/DNA helicity.

## 🏗️ Project Structure

```
rnacartography_site/
├── content/                 # Content configuration in Markdown
│   ├── config.md           # Site configuration (colors, fonts, URLs)
│   └── content.md          # Content structure and text
├── src/                    # Source assets
│   ├── styles/
│   │   └── main.css        # All CSS styles
│   └── scripts/
│       └── animation.js    # GSAP animation logic
├── build.js                # Build script (generates index.html)
├── package.json            # NPM configuration
├── index.html              # Generated output file
└── landing.html            # Original single-file version (backup)
```

## ✨ Features

- **Separated Concerns**: Content, styles, and scripts are in separate files
- **Markdown Configuration**: Easy-to-edit content and settings
- **Build System**: Combines all assets into a single HTML file
- **Responsive Design**: Scales beautifully across all devices
- **Accessibility**: ARIA labels, keyboard navigation, reduced motion support
- **Performance**: Single file output, optimized for fast loading

## 🚀 Quick Start

### Development

1. **Edit Content**: Modify files in `content/` directory
   - `config.md`: Site settings, colors, fonts, URLs
   - `content.md`: Text content and structure

2. **Edit Styles**: Modify `src/styles/main.css`

3. **Edit Animation**: Modify `src/scripts/animation.js`

4. **Build**: Generate the final HTML file
   ```bash
   npm run build
   ```

5. **Preview**: Serve locally
   ```bash
   npm run serve
   # Opens at http://localhost:8000
   ```

### Watch Mode (Auto-rebuild)

Install dependencies and run watch mode:
```bash
npm install
npm run watch
```

This will automatically rebuild `index.html` whenever you change any source files.

## 📝 Content Management

### Changing Text Content

Edit `content/content.md`:
```markdown
## Main Heading (H1)
**Text**: YOUR NEW TITLE
...

## Tagline (P)  
**Text**: your new tagline
...
```

### Changing Colors/Settings

Edit `content/config.md`:
```markdown
## Colors
- **Background Start**: #your-color
- **Text Color**: #your-color
...
```

### Changing Animation Settings

Edit animation parameters in `content/config.md`:
```markdown
## Animation Settings
- **Title Animation Duration**: 2.0s
- **Spiral Loops**: 2.0
...
```

## 🎨 Customization

### Adding New Colors

1. Add color variables to `content/config.md`
2. Update CSS variables in `src/styles/main.css`
3. Rebuild: `npm run build`

### Modifying Animation

The animation system is class-based for easy extension:
- `RNACartographyAnimation` class in `src/scripts/animation.js`
- Modify `createSpiralPath()` for different path shapes
- Adjust timing in `animateTextElement()`

### Responsive Breakpoints

Edit breakpoints in `src/styles/main.css`:
```css
@media (max-width: 768px) {
  /* Mobile styles */
}
```

## 🏗️ Build Process

The build script (`build.js`):
1. Parses Markdown configuration files
2. Loads CSS and JavaScript assets
3. Generates a single HTML file with embedded assets
4. Maintains the original single-file deployment model

## 📱 Deployment

1. Run `npm run build` to generate `index.html`
2. Deploy the `index.html` file to your web server
3. The file is completely self-contained (except for CDN fonts/GSAP)

## 🔧 Technical Details

- **Framework**: Vanilla JS with GSAP 3
- **Styling**: CSS Grid/Flexbox
- **Fonts**: Supercargo (local) / Anton (Google Fonts fallback)
- **Animation**: SVG paths with MotionPathPlugin
- **Build**: Node.js script
- **Size**: ~10KB HTML + ~25KB GSAP CDN

## 🚀 Performance

- Single HTTP request (except CDN assets)
- Embedded CSS and JS for minimal latency
- Responsive images via CSS `clamp()`
- Optimized for PageSpeed scores

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels for screen readers
- High contrast ratios (7:1+)
- Keyboard navigation support
- Reduced motion media query support
- Focus indicators

## 🔄 Migration from Single File

Your original `landing.html` is preserved. The new system generates the same output but with better maintainability:

- **Before**: Edit one large HTML file
- **After**: Edit separate Markdown/CSS/JS files, then build

## 📦 Dependencies

**Runtime** (CDN):
- GSAP 3.12.2
- MotionPathPlugin
- Google Fonts (Anton)

**Development** (Optional):
- chokidar-cli (for watch mode)
- Node.js (for build script)
