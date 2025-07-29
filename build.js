#!/usr/bin/env node

/**
 * Build script for RNA Cartography landing page
 * Combines markdown content with CSS and JS assets into a single HTML file
 */

const fs = require('fs');
const path = require('path');

class SiteBuilder {
  constructor() {
    this.config = this.loadMarkdownConfig();
    this.content = this.loadMarkdownContent();
    this.css = this.loadCSS();
    this.js = this.loadJS();
  }

  loadMarkdownConfig() {
    const configPath = path.join(__dirname, 'content/config.md');
    const content = fs.readFileSync(configPath, 'utf8');
    
    // Parse markdown to extract configuration
    const config = {};
    const lines = content.split('\n');
    
    lines.forEach(line => {
      if (line.includes('**') && line.includes(':')) {
        const match = line.match(/\*\*(.*?)\*\*:\s*(.*)/);
        if (match) {
          const key = match[1].toLowerCase().replace(/\s+/g, '_');
          const value = match[2];
          config[key] = value;
        }
      }
    });
    
    return config;
  }

  loadMarkdownContent() {
    const contentPath = path.join(__dirname, 'content/content.md');
    const content = fs.readFileSync(contentPath, 'utf8');
    
    // Parse content structure
    const contentData = {};
    const sections = content.split('## ');
    
    sections.forEach(section => {
      if (section.trim()) {
        const lines = section.trim().split('\n');
        const title = lines[0].toLowerCase().replace(/\s+/g, '_');
        contentData[title] = {};
        
        lines.slice(1).forEach(line => {
          if (line.includes('**') && line.includes(':')) {
            const match = line.match(/\*\*(.*?)\*\*:\s*(.*)/);
            if (match) {
              const key = match[1].toLowerCase().replace(/\s+/g, '_');
              const value = match[2];
              contentData[title][key] = value;
            }
          }
        });
      }
    });
    
    return contentData;
  }

  loadCSS() {
    const cssPath = path.join(__dirname, 'src/styles/main.css');
    return fs.readFileSync(cssPath, 'utf8');
  }

  loadJS() {
    const jsPath = path.join(__dirname, 'src/scripts/animation.js');
    return fs.readFileSync(jsPath, 'utf8');
  }

  generateHTML() {
    const mainTitle = this.content.main_heading_h1?.text || 'RNA CARTOGRAPHY';
    const tagline = this.content.tagline_p?.text || 'charting the mRNA life cycle in native context';
    const ctaText = this.content.call_to_action_button?.text || 'stay tuned';
    const ctaLink = this.config.cta_button_link || 'https://openemage.org';
    const title = this.config.title || 'RNA Cartography';
    const fontUrl = this.config.google_fonts_url || 'https://fonts.googleapis.com/css2?family=Anton&display=swap';

    // Template the JavaScript with configuration values
    const templatedJS = this.js.replace(
      /window\.location\.href = ['"][^'"]*['"];/,
      `window.location.href = '${ctaLink}';`
    );

    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <!-- Import the fallback font "Anton". If "Supercargo" is installed on the visitor's
         system it will be used automatically via the font‑family declaration below. -->
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link href="${fontUrl}" rel="stylesheet" />
    <style>
${this.css}
    </style>
  </head>
  <body>
    <main>
      <div class="content-wrapper">
        <h1 id="title">${mainTitle}</h1>
        <p id="tagline">${tagline}</p>
      </div>
      <button id="cta" aria-label="Stay tuned">${ctaText}</button>
    </main>

    <!-- Simple CSS animation - no external libraries needed -->
    <script defer>
${templatedJS}
    </script>
  </body>
</html>`;
  }

  build() {
    const html = this.generateHTML();
    const outputPath = path.join(__dirname, 'index.html');
    fs.writeFileSync(outputPath, html, 'utf8');
    console.log('✅ Built index.html successfully!');
    console.log(`📝 Output: ${outputPath}`);
    console.log(`📊 Size: ${(html.length / 1024).toFixed(1)} KB`);
  }
}

// Run the build
const builder = new SiteBuilder();
builder.build();
