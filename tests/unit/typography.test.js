/**
 * Typography Consistency Tests
 * Validates that all pages use consistent font families across the site
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('Typography Consistency Tests', () => {
  const publicDir = path.join(__dirname, '../../public');
  const htmlFiles = ['index.html', 'playbook.html', 'privacy.html', 'terms.html'];
  const cssFiles = ['css/agency.css', 'css/agency.min.css'];

  describe('Font Family Standards', () => {
    const EXPECTED_FONTS = {
      headers: 'Montserrat',
      body: 'Roboto Slab',
    };

    test('All HTML files should load correct font families', () => {
      htmlFiles.forEach(file => {
        const filePath = path.join(publicDir, file);
        const html = fs.readFileSync(filePath, 'utf8');
        const dom = new JSDOM(html);
        const doc = dom.window.document;

        // Check for Montserrat import
        const fontLinks = Array.from(doc.querySelectorAll('link[href*="fonts.googleapis.com"]'));
        const hasMontserrat = fontLinks.some(link => 
          link.href.includes('Montserrat') || link.href.includes('montserrat')
        );
        
        // Check for Roboto Slab import
        const hasRobotoSlab = fontLinks.some(link => 
          link.href.includes('Roboto+Slab') || link.href.includes('roboto+slab')
        );

        expect(hasMontserrat).toBe(true);
        expect(hasRobotoSlab).toBe(true);
      });
    });

    test('CSS files should define correct body font', () => {
      cssFiles.forEach(file => {
        const filePath = path.join(publicDir, file);
        const css = fs.readFileSync(filePath, 'utf8');
        
        expect(css).toMatch(/body\s*{[^}]*font-family:\s*'Roboto Slab'/);
      });
    });

    test('CSS files should define correct heading fonts', () => {
      cssFiles.forEach(file => {
        const filePath = path.join(publicDir, file);
        const css = fs.readFileSync(filePath, 'utf8');
        
        expect(css).toMatch(/h1,\s*h2,\s*h3,\s*h4,\s*h5,\s*h6\s*{[^}]*font-family:\s*'Montserrat'/);
      });
    });

    test('Navbar brand should use Montserrat', () => {
      htmlFiles.forEach(file => {
        const filePath = path.join(publicDir, file);
        const html = fs.readFileSync(filePath, 'utf8');
        const dom = new JSDOM(html);
        const doc = dom.window.document;

        const navbarBrand = doc.querySelector('.navbar-brand');
        if (navbarBrand) {
          const inlineStyle = navbarBrand.getAttribute('style') || '';
          // Check if it explicitly includes 'Montserrat' in the inline style
          const hasMontserrat = inlineStyle.includes('Montserrat');
          
          expect(hasMontserrat).toBe(true);
        }
      });
    });
  });

  describe('Font Consistency Across Pages', () => {
    test('No Droid Serif references should exist', () => {
      cssFiles.forEach(file => {
        const filePath = path.join(publicDir, file);
        const css = fs.readFileSync(filePath, 'utf8');
        
        expect(css).not.toMatch(/Droid Serif/);
      });
    });

    test('No Kaushan Script references should exist', () => {
      cssFiles.forEach(file => {
        const filePath = path.join(publicDir, file);
        const css = fs.readFileSync(filePath, 'utf8');
        
        expect(css).not.toMatch(/Kaushan Script/);
      });
    });

    test('Navbar brand font-weight should be consistent', () => {
      htmlFiles.forEach(file => {
        const filePath = path.join(publicDir, file);
        const html = fs.readFileSync(filePath, 'utf8');
        const dom = new JSDOM(html);
        const doc = dom.window.document;

        const navbarBrand = doc.querySelector('.navbar-brand');
        if (navbarBrand) {
          const style = navbarBrand.getAttribute('style') || '';
          expect(style).toMatch(/font-weight:\s*700/);
        }
      });
    });

    test('Navbar brand letter-spacing should be consistent', () => {
      htmlFiles.forEach(file => {
        const filePath = path.join(publicDir, file);
        const html = fs.readFileSync(filePath, 'utf8');
        const dom = new JSDOM(html);
        const doc = dom.window.document;

        const navbarBrand = doc.querySelector('.navbar-brand');
        if (navbarBrand) {
          const style = navbarBrand.getAttribute('style') || '';
          expect(style).toMatch(/letter-spacing:\s*0\.5px/);
        }
      });
    });
  });
});
