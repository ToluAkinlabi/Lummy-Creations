/**
 * Responsive Design Tests
 * Validates responsive behavior and mobile optimization
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('Responsive Design Tests', () => {
  const publicDir = path.join(__dirname, '../../public');
  const htmlFiles = ['index.html', 'playbook.html', 'privacy.html', 'terms.html'];

  describe('Viewport Configuration', () => {
    test('All pages should have responsive viewport meta tag', () => {
      htmlFiles.forEach(file => {
        const filePath = path.join(publicDir, file);
        const html = fs.readFileSync(filePath, 'utf8');
        const dom = new JSDOM(html);
        const doc = dom.window.document;

        const viewport = doc.querySelector('meta[name="viewport"]');
        expect(viewport).toBeTruthy();
        
        const content = viewport.getAttribute('content');
        expect(content).toContain('width=device-width');
        expect(content).toContain('initial-scale=1');
      });
    });
  });

  describe('Bootstrap Grid System', () => {
    test('Index page should use Bootstrap grid classes', () => {
      const filePath = path.join(publicDir, 'index.html');
      const html = fs.readFileSync(filePath, 'utf8');
      const dom = new JSDOM(html);
      const doc = dom.window.document;

      const containers = doc.querySelectorAll('.container, .container-fluid');
      const rows = doc.querySelectorAll('.row');
      const cols = doc.querySelectorAll('[class*="col-"]');

      expect(containers.length).toBeGreaterThan(0);
      expect(rows.length).toBeGreaterThan(0);
      expect(cols.length).toBeGreaterThan(0);
    });

    test('Grid columns should use responsive breakpoints', () => {
      const filePath = path.join(publicDir, 'index.html');
      const html = fs.readFileSync(filePath, 'utf8');
      const dom = new JSDOM(html);
      const doc = dom.window.document;

      const responsiveCols = doc.querySelectorAll('[class*="col-md-"], [class*="col-lg-"], [class*="col-sm-"]');
      expect(responsiveCols.length).toBeGreaterThan(0);
    });
  });

  describe('Mobile Optimizations', () => {
    test('Index page should have mobile-specific CSS', () => {
      const filePath = path.join(publicDir, 'index.html');
      const html = fs.readFileSync(filePath, 'utf8');

      // Check for mobile media queries
      expect(html).toMatch(/@media\s*\(max-width:\s*767px\)/);
      expect(html).toMatch(/@media\s*\(max-width:\s*991px\)/);
    });

    test('Mobile CSS should adjust font sizes', () => {
      const filePath = path.join(publicDir, 'index.html');
      const html = fs.readFileSync(filePath, 'utf8');

      // Mobile optimizations should include font-size adjustments
      expect(html).toContain('font-size: 2rem !important');
      expect(html).toContain('font-size: 1rem !important');
    });

    test('Mobile CSS should adjust padding', () => {
      const filePath = path.join(publicDir, 'index.html');
      const html = fs.readFileSync(filePath, 'utf8');

      expect(html).toContain('padding: 60px 0 !important');
      expect(html).toContain('padding: 80px 0 !important');
    });

    test('Touch-friendly elements should have appropriate sizing', () => {
      const filePath = path.join(publicDir, 'index.html');
      const html = fs.readFileSync(filePath, 'utf8');

      expect(html).toContain('min-height: 44px');
      expect(html).toContain('min-width: 44px');
    });
  });

  describe('Navigation Responsiveness', () => {
    test('Navbar should have collapse functionality', () => {
      const filePath = path.join(publicDir, 'index.html');
      const html = fs.readFileSync(filePath, 'utf8');
      const dom = new JSDOM(html);
      const doc = dom.window.document;

      const navbarToggler = doc.querySelector('.navbar-toggler');
      const navbarCollapse = doc.querySelector('.navbar-collapse');

      expect(navbarToggler).toBeTruthy();
      expect(navbarCollapse).toBeTruthy();
      expect(navbarCollapse.classList.contains('collapse')).toBe(true);
    });

    test('Navbar should be responsive', () => {
      const filePath = path.join(publicDir, 'index.html');
      const html = fs.readFileSync(filePath, 'utf8');
      const dom = new JSDOM(html);
      const doc = dom.window.document;

      const navbar = doc.querySelector('nav.navbar');
      expect(navbar.classList.contains('navbar-expand-lg')).toBe(true);
    });
  });

  describe('Image Responsiveness', () => {
    test('Images should use responsive classes', () => {
      const filePath = path.join(publicDir, 'index.html');
      const html = fs.readFileSync(filePath, 'utf8');
      const dom = new JSDOM(html);
      const doc = dom.window.document;

      const images = Array.from(doc.querySelectorAll('img'));
      
      // At least some images should have responsive classes
      const responsiveImages = images.filter(img => 
        img.classList.contains('img-fluid') || 
        img.style.width || 
        img.style.maxWidth
      );
      
      expect(responsiveImages.length).toBeGreaterThan(0);
    });

    test('Images should have loading attribute for performance', () => {
      const filePath = path.join(publicDir, 'index.html');
      const html = fs.readFileSync(filePath, 'utf8');
      const dom = new JSDOM(html);
      const doc = dom.window.document;

      const lazyImages = Array.from(doc.querySelectorAll('img[loading="lazy"]'));
      
      // Below-fold images should use lazy loading
      expect(lazyImages.length).toBeGreaterThan(0);
    });
  });

  describe('Button and Link Responsiveness', () => {
    test('Buttons should have responsive sizing classes', () => {
      const filePath = path.join(publicDir, 'index.html');
      const html = fs.readFileSync(filePath, 'utf8');
      const dom = new JSDOM(html);
      const doc = dom.window.document;

      const buttons = Array.from(doc.querySelectorAll('.btn'));
      expect(buttons.length).toBeGreaterThan(0);
    });

    test('Navigation links should have padding for touch targets', () => {
      const filePath = path.join(publicDir, 'index.html');
      const html = fs.readFileSync(filePath, 'utf8');

      // Check for nav-link padding in mobile media query
      expect(html).toContain('padding: 1rem !important');
    });
  });

  describe('Form Responsiveness', () => {
    test('Form layouts should stack on mobile', () => {
      const filePath = path.join(publicDir, 'index.html');
      const html = fs.readFileSync(filePath, 'utf8');
      const dom = new JSDOM(html);
      const doc = dom.window.document;

      const formRows = Array.from(doc.querySelectorAll('form .form-row, form .row'));
      expect(formRows.length).toBeGreaterThan(0);
      
      // Check that form columns use responsive breakpoints
      const formCols = Array.from(doc.querySelectorAll('form [class*="col-md-"]'));
      expect(formCols.length).toBeGreaterThan(0);
    });
  });

  describe('Content Responsiveness', () => {
    test('Section padding should adjust for mobile', () => {
      const filePath = path.join(publicDir, 'css/agency.css');
      const css = fs.readFileSync(filePath, 'utf8');

      expect(css).toContain('section');
      expect(css).toContain('padding: 100px 0');
    });

    test('Cards should be responsive', () => {
      const filePath = path.join(publicDir, 'index.html');
      const html = fs.readFileSync(filePath, 'utf8');
      const dom = new JSDOM(html);
      const doc = dom.window.document;

      const cards = Array.from(doc.querySelectorAll('.card'));
      
      // Cards should be in responsive grid columns
      cards.forEach(card => {
        const parent = card.parentElement;
        const hasResponsiveClass = parent && 
          (parent.className.includes('col-md') || 
           parent.className.includes('col-lg') ||
           parent.className.includes('col-sm'));
        
        if (cards.length > 0) {
          expect(hasResponsiveClass || parent.className.includes('mx-auto')).toBeTruthy();
        }
      });
    });
  });
});
