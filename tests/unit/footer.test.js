/**
 * Footer Consistency Tests
 * Validates footer structure and content across all pages
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('Footer Consistency Tests', () => {
  const publicDir = path.join(__dirname, '../../public');
  const htmlFiles = ['index.html', 'privacy.html', 'terms.html', 'playbook.html'];

  describe('Footer Structure', () => {
    test('All pages should have a footer', () => {
      htmlFiles.forEach(file => {
        const filePath = path.join(publicDir, file);
        const html = fs.readFileSync(filePath, 'utf8');
        const dom = new JSDOM(html);
        const doc = dom.window.document;

        const footer = doc.querySelector('footer');
        expect(footer).toBeTruthy();
      });
    });

    test('All footers should have copyright text', () => {
      htmlFiles.forEach(file => {
        const filePath = path.join(publicDir, file);
        const html = fs.readFileSync(filePath, 'utf8');
        const dom = new JSDOM(html);
        const doc = dom.window.document;

        const footer = doc.querySelector('footer');
        const footerText = footer.textContent;
        
        expect(footerText).toMatch(/Lummy Creations LLC 2025/);
      });
    });

    test('Footer container classes should be consistent', () => {
      const expectations = {
        'privacy.html': 'container',
        'terms.html': 'container',
        'playbook.html': 'container',
        'index.html': 'container'
      };

      Object.keys(expectations).forEach(file => {
        const filePath = path.join(publicDir, file);
        const html = fs.readFileSync(filePath, 'utf8');
        const dom = new JSDOM(html);
        const doc = dom.window.document;

        const footerContainer = doc.querySelector('footer .container, footer .container-fluid');
        expect(footerContainer).toBeTruthy();
      });
    });
  });

  describe('Footer Links', () => {
    test('Privacy and Terms footers should have navigation links', () => {
      ['privacy.html', 'terms.html', 'playbook.html'].forEach(file => {
        const filePath = path.join(publicDir, file);
        const html = fs.readFileSync(filePath, 'utf8');
        const dom = new JSDOM(html);
        const doc = dom.window.document;

        const footer = doc.querySelector('footer');
        const links = Array.from(footer.querySelectorAll('a'));
        const linkTexts = links.map(link => link.textContent.trim());

        expect(linkTexts).toContain('Privacy');
        expect(linkTexts).toContain('Terms');
        expect(linkTexts).toContain('Home');
      });
    });

    test('Index page footer should have social links', () => {
      const filePath = path.join(publicDir, 'index.html');
      const html = fs.readFileSync(filePath, 'utf8');
      const dom = new JSDOM(html);
      const doc = dom.window.document;

      const footer = doc.querySelector('footer');
      const socialLinks = Array.from(footer.querySelectorAll('.social-buttons a'));

      expect(socialLinks.length).toBeGreaterThan(0);
      
      // Check for specific social platforms
      const socialIcons = socialLinks.map(link => {
        const icon = link.querySelector('i');
        return icon ? icon.className : '';
      });

      expect(socialIcons.some(icon => icon.includes('twitter'))).toBe(true);
      expect(socialIcons.some(icon => icon.includes('linkedin'))).toBe(true);
      expect(socialIcons.some(icon => icon.includes('github'))).toBe(true);
    });

    test('All footer links should be valid', () => {
      htmlFiles.forEach(file => {
        const filePath = path.join(publicDir, file);
        const html = fs.readFileSync(filePath, 'utf8');
        const dom = new JSDOM(html);
        const doc = dom.window.document;

        const footer = doc.querySelector('footer');
        const links = Array.from(footer.querySelectorAll('a[href]'));

        links.forEach(link => {
          const href = link.getAttribute('href');
          expect(href).toBeTruthy();
          expect(href).not.toBe('#');
          expect(href).not.toBe('');
        });
      });
    });
  });

  describe('Footer Styling Consistency', () => {
    test('Privacy and Terms footers should have same background color', () => {
      ['privacy.html', 'terms.html'].forEach(file => {
        const filePath = path.join(publicDir, file);
        const html = fs.readFileSync(filePath, 'utf8');
        const dom = new JSDOM(html);
        const doc = dom.window.document;

        const footer = doc.querySelector('footer');
        const style = footer.getAttribute('style') || '';
        
        expect(style).toMatch(/background:\s*#212529/);
      });
    });
  });
});
