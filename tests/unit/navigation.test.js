/**
 * Navigation Consistency Tests
 * Validates navigation structure and links across all pages
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('Navigation Consistency Tests', () => {
  const publicDir = path.join(__dirname, '../../public');
  const htmlFiles = ['index.html', 'playbook.html', 'privacy.html', 'terms.html'];

  describe('Navbar Structure', () => {
    test('All pages should have a navbar', () => {
      htmlFiles.forEach(file => {
        const filePath = path.join(publicDir, file);
        const html = fs.readFileSync(filePath, 'utf8');
        const dom = new JSDOM(html);
        const doc = dom.window.document;

        const navbar = doc.querySelector('nav.navbar');
        expect(navbar).toBeTruthy();
      });
    });

    test('All navbars should have "Lumora Consulting" brand', () => {
      htmlFiles.forEach(file => {
        const filePath = path.join(publicDir, file);
        const html = fs.readFileSync(filePath, 'utf8');
        const dom = new JSDOM(html);
        const doc = dom.window.document;

        const navbarBrand = doc.querySelector('.navbar-brand');
        expect(navbarBrand).toBeTruthy();
        expect(navbarBrand.textContent.trim()).toBe('Lumora Consulting');
      });
    });

    test('All navbars should have consistent Bootstrap classes', () => {
      htmlFiles.forEach(file => {
        const filePath = path.join(publicDir, file);
        const html = fs.readFileSync(filePath, 'utf8');
        const dom = new JSDOM(html);
        const doc = dom.window.document;

        const navbar = doc.querySelector('nav');
        expect(navbar.classList.contains('navbar')).toBe(true);
        expect(navbar.classList.contains('navbar-expand-lg')).toBe(true);
        expect(navbar.classList.contains('navbar-dark')).toBe(true);
        expect(navbar.classList.contains('fixed-top')).toBe(true);
      });
    });
  });

  describe('Navigation Links', () => {
    test('Index page should have all main navigation items', () => {
      const filePath = path.join(publicDir, 'index.html');
      const html = fs.readFileSync(filePath, 'utf8');
      const dom = new JSDOM(html);
      const doc = dom.window.document;

      const navLinks = Array.from(doc.querySelectorAll('.navbar-nav .nav-link'));
      const linkTexts = navLinks.map(link => link.textContent.trim());

      expect(linkTexts).toContain('Home');
      expect(linkTexts).toContain('Services');
      expect(linkTexts).toContain('Portfolio');
      expect(linkTexts).toContain('About');
      expect(linkTexts).toContain('Expertise');
      expect(linkTexts).toContain('Contact');
      expect(linkTexts).toContain('Playbook');
      expect(linkTexts).toContain('Schedule A Call');
    });

    test('All external links should have proper attributes', () => {
      htmlFiles.forEach(file => {
        const filePath = path.join(publicDir, file);
        const html = fs.readFileSync(filePath, 'utf8');
        const dom = new JSDOM(html);
        const doc = dom.window.document;

        // Only check anchor tags with href, not link tags for fonts/resources
        const externalLinks = Array.from(doc.querySelectorAll('a[href^="http"]'));
        externalLinks.forEach(link => {
          const href = link.getAttribute('href');
          // External links (not to own domain or schemas.org) should have target="_blank"
          if (!href.includes('lummycreations.com') && !href.includes('schema.org')) {
            expect(link.getAttribute('target')).toBe('_blank');
            expect(link.getAttribute('rel')).toContain('noopener');
          }
        });
      });
    });

    test('Internal navigation links should be valid', () => {
      const filePath = path.join(publicDir, 'index.html');
      const html = fs.readFileSync(filePath, 'utf8');
      const dom = new JSDOM(html);
      const doc = dom.window.document;

      const internalLinks = Array.from(doc.querySelectorAll('a[href^="#"]'));
      const validSections = ['#page-top', '#services', '#portfolio', '#about', '#expertise', '#contact', '#methodology', '#testimonials'];
      
      internalLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href !== '#') {
          const targetId = href.substring(1);
          const targetElement = doc.getElementById(targetId);
          expect(targetElement).toBeTruthy();
        }
      });
    });
  });

  describe('Brand Link Consistency', () => {
    test('Navbar brand should link to correct pages', () => {
      const expectations = {
        'index.html': '#page-top',
        'playbook.html': 'index.html',
        'privacy.html': 'index.html',
        'terms.html': 'index.html'
      };

      Object.keys(expectations).forEach(file => {
        const filePath = path.join(publicDir, file);
        const html = fs.readFileSync(filePath, 'utf8');
        const dom = new JSDOM(html);
        const doc = dom.window.document;

        const navbarBrand = doc.querySelector('.navbar-brand');
        expect(navbarBrand.getAttribute('href')).toBe(expectations[file]);
      });
    });
  });
});
