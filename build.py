#!/usr/bin/env python3

"""
Build script for RNA Cartography landing page
Combines markdown content with CSS and JS assets into a single HTML file
"""

import os
import re
from pathlib import Path

class SiteBuilder:
    def __init__(self):
        self.base_dir = Path(__file__).parent
        self.config = self.load_markdown_config()
        self.content = self.load_markdown_content()
        self.css = self.load_css()
        self.js = self.load_js()

    def load_markdown_config(self):
        config_path = self.base_dir / 'content' / 'config.md'
        with open(config_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Parse markdown to extract configuration
        config = {}
        lines = content.split('\n')
        
        for line in lines:
            if '**' in line and ':' in line:
                match = re.search(r'\*\*(.*?)\*\*:\s*(.*)', line)
                if match:
                    key = match.group(1).lower().replace(' ', '_')
                    value = match.group(2)
                    config[key] = value
        
        return config

    def load_markdown_content(self):
        content_path = self.base_dir / 'content' / 'content.md'
        with open(content_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Parse content structure
        content_data = {}
        sections = content.split('## ')
        
        for section in sections:
            if section.strip():
                lines = section.strip().split('\n')
                title = lines[0].lower().replace(' ', '_').replace('(', '').replace(')', '')
                content_data[title] = {}
                
                for line in lines[1:]:
                    if '**' in line and ':' in line:
                        match = re.search(r'\*\*(.*?)\*\*:\s*(.*)', line)
                        if match:
                            key = match.group(1).lower().replace(' ', '_')
                            value = match.group(2)
                            content_data[title][key] = value
        
        return content_data

    def load_css(self):
        css_path = self.base_dir / 'src' / 'styles' / 'main.css'
        with open(css_path, 'r', encoding='utf-8') as f:
            return f.read()

    def load_js(self):
        js_path = self.base_dir / 'src' / 'scripts' / 'animation.js'
        with open(js_path, 'r', encoding='utf-8') as f:
            return f.read()

    def generate_html(self):
        # Extract content with fallbacks
        main_title = self.content.get('main_heading_h1', {}).get('text', 'RNA CARTOGRAPHY')
        tagline = self.content.get('tagline_p', {}).get('text', 'charting the mRNA life cycle in native context')
        cta_text = self.content.get('call_to_action_button', {}).get('text', 'stay tuned')
        cta_link = self.config.get('cta_button_link', 'https://openemage.org')
        title = self.config.get('title', 'RNA Cartography')
        font_url = self.config.get('google_fonts_url', 'https://fonts.googleapis.com/css2?family=Anton&display=swap')

        # Template the JavaScript with configuration values
        templated_js = re.sub(
            r"window\.location\.href = ['\"][^'\"]*['\"];",
            f"window.location.href = '{cta_link}';",
            self.js
        )

        return f"""<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <!-- Import the fallback font "Anton". If "Supercargo" is installed on the visitor's
         system it will be used automatically via the font‑family declaration below. -->
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link href="{font_url}" rel="stylesheet" />
    <style>
{self.css}
    </style>
  </head>
  <body>
    <main>
      <div class="content-wrapper">
        <h1 id="title">{main_title}</h1>
        <p id="tagline">{tagline}</p>
      </div>
      <button id="cta" aria-label="Stay tuned">{cta_text}</button>
    </main>

    <!-- Simple CSS animation - no external libraries needed -->
    <script defer>
{templated_js}
    </script>
  </body>
</html>"""

    def build(self):
        html = self.generate_html()
        output_path = self.base_dir / 'index.html'
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(html)
        
        print('✅ Built index.html successfully!')
        print(f'📝 Output: {output_path}')
        print(f'📊 Size: {len(html) / 1024:.1f} KB')

if __name__ == '__main__':
    builder = SiteBuilder()
    builder.build()
