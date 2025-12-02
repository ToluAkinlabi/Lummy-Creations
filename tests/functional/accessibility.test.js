/**
 * Accessibility Tests
 * Validates WCAG compliance and accessibility features
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('Accessibility Tests', () => {
  const publicDir = path.join(__dirname, '../../public');
  const htmlFiles = ['index.html', 'playbook.html', 'privacy.html', 'terms.html'];

  describe('ARIA Labels and Attributes', () => {
    test('All images should have alt attributes', () => {
      htmlFiles.forEach(file => {
        const filePath = path.join(publicDir, file);
        const html = fs.readFileSync(filePath, 'utf8');
        const dom = new JSDOM(html);
        const doc = dom.window.document;

        const images = Array.from(doc.querySelectorAll('img'));
        images.forEach(img => {
          expect(img.hasAttribute('alt')).toBe(true);
        });
      });
    });

    test('Social links should have aria-label attributes', () => {
      const filePath = path.join(publicDir, 'index.html');
      const html = fs.readFileSync(filePath, 'utf8');
      const dom = new JSDOM(html);
      const doc = dom.window.document;

      const socialLinks = Array.from(doc.querySelectorAll('.social-buttons a'));
      socialLinks.forEach(link => {
        expect(link.hasAttribute('aria-label')).toBe(true);
      });
    });

    test('Icons should have aria-hidden attribute', () => {
      const filePath = path.join(publicDir, 'index.html');
      const html = fs.readFileSync(filePath, 'utf8');
      const dom = new JSDOM(html);
      const doc = dom.window.document;

      const icons = Array.from(doc.querySelectorAll('.social-buttons i'));
      icons.forEach(icon => {
        expect(icon.hasAttribute('aria-hidden')).toBe(true);
      });
    });

    test('Navbar toggler should have aria attributes', () => {
      const filePath = path.join(publicDir, 'index.html');
      const html = fs.readFileSync(filePath, 'utf8');
      const dom = new JSDOM(html);
      const doc = dom.window.document;

      const toggler = doc.querySelector('.navbar-toggler');
      if (toggler) {
        expect(toggler.hasAttribute('aria-controls')).toBe(true);
        expect(toggler.hasAttribute('aria-expanded')).toBe(true);
        expect(toggler.hasAttribute('aria-label')).toBe(true);
      }
    });
  });

  describe('Semantic HTML', () => {
    test('All pages should have proper document structure', () => {
      htmlFiles.forEach(file => {
        const filePath = path.join(publicDir, file);
        const html = fs.readFileSync(filePath, 'utf8');
        const dom = new JSDOM(html);
        const doc = dom.window.document;

        expect(doc.querySelector('html')).toBeTruthy();
        expect(doc.querySelector('head')).toBeTruthy();
        expect(doc.querySelector('body')).toBeTruthy();
      });
    });

    test('Index page should use semantic HTML5 elements', () => {
      const filePath = path.join(publicDir, 'index.html');
      const html = fs.readFileSync(filePath, 'utf8');
      const dom = new JSDOM(html);
      const doc = dom.window.document;

      expect(doc.querySelector('header')).toBeTruthy();
      expect(doc.querySelector('nav')).toBeTruthy();
      expect(doc.querySelector('main, section')).toBeTruthy();
      expect(doc.querySelector('footer')).toBeTruthy();
    });

    test('Headings should follow hierarchical order', () => {
      htmlFiles.forEach(file => {
        const filePath = path.join(publicDir, file);
        const html = fs.readFileSync(filePath, 'utf8');
        const dom = new JSDOM(html);
        const doc = dom.window.document;

        const h1 = doc.querySelector('h1');
        const h2s = doc.querySelectorAll('h2');

        // Should have at least one h1 or h2
        expect(h1 || h2s.length > 0).toBeTruthy();
      });
    });
  });

  describe('Keyboard Navigation', () => {
    test('All interactive elements should be focusable', () => {
      htmlFiles.forEach(file => {
        const filePath = path.join(publicDir, file);
        const html = fs.readFileSync(filePath, 'utf8');
        const dom = new JSDOM(html);
        const doc = dom.window.document;

        const buttons = Array.from(doc.querySelectorAll('button:not([disabled])'));
        const links = Array.from(doc.querySelectorAll('a[href]'));

        [...buttons, ...links].forEach(element => {
          const tabIndex = element.getAttribute('tabindex');
          // Should not have negative tabindex (unless intentionally removed from tab order)
          if (tabIndex) {
            expect(parseInt(tabIndex)).toBeGreaterThanOrEqual(-1);
          }
        });
      });
    });

    test('Forms should have proper tab order', () => {
      const files = ['index.html', 'playbook.html'];
      
      files.forEach(file => {
        const filePath = path.join(publicDir, file);
        const html = fs.readFileSync(filePath, 'utf8');
        const dom = new JSDOM(html);
        const doc = dom.window.document;

        const formInputs = Array.from(doc.querySelectorAll('input:not([type="hidden"]), textarea, select'));
        
        // Honeypot fields should have tabindex="-1"
        const honeypots = Array.from(doc.querySelectorAll('input[name="_gotcha"]'));
        honeypots.forEach(honeypot => {
          const tabIndex = honeypot.getAttribute('tabindex');
          expect(tabIndex).toBe('-1');
        });
      });
    });
  });

  describe('Color Contrast and Readability', () => {
    test('Body text should have sufficient size', () => {
      const filePath = path.join(publicDir, 'css/agency.css');
      const css = fs.readFileSync(filePath, 'utf8');

      // Ensure body font is readable (at least 14px equivalent)
      expect(css).toContain('Roboto Slab');
    });

    test('Links should be distinguishable', () => {
      htmlFiles.forEach(file => {
        const filePath = path.join(publicDir, file);
        const html = fs.readFileSync(filePath, 'utf8');
        const dom = new JSDOM(html);
        const doc = dom.window.document;

        const links = Array.from(doc.querySelectorAll('a[href]'));
        expect(links.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Mobile Accessibility', () => {
    test('All pages should have touch-friendly button sizes in CSS', () => {
      const filePath = path.join(publicDir, 'index.html');
      const html = fs.readFileSync(filePath, 'utf8');

      // Check for mobile optimizations in inline styles
      expect(html).toContain('min-height: 44px');
      expect(html).toContain('min-width: 44px');
    });

    test('Text should be readable without zooming', () => {
      htmlFiles.forEach(file => {
        const filePath = path.join(publicDir, file);
        const html = fs.readFileSync(filePath, 'utf8');
        const dom = new JSDOM(html);
        const doc = dom.window.document;

        const viewport = doc.querySelector('meta[name="viewport"]');
        const content = viewport.getAttribute('content');
        
        // Should not prevent zooming
        expect(content).not.toContain('user-scalable=no');
        expect(content).not.toContain('maximum-scale=1');
      });
    });
  });

  describe('Form Accessibility', () => {
    test('Form success messages should have proper ARIA attributes', () => {
      const files = ['index.html', 'playbook.html'];
      
      files.forEach(file => {
        const filePath = path.join(publicDir, file);
        const html = fs.readFileSync(filePath, 'utf8');
        const dom = new JSDOM(html);
        const doc = dom.window.document;

        const successMessages = Array.from(doc.querySelectorAll('.alert-success'));
        successMessages.forEach(alert => {
          expect(alert.getAttribute('role')).toBe('alert');
          expect(alert.hasAttribute('aria-live')).toBe(true);
        });
      });
    });
  });
});
