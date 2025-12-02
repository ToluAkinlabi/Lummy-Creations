/**
 * Meta Tags and SEO Tests
 * Validates meta tags, SEO elements, and page structure
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('Meta Tags and SEO Tests', () => {
  const publicDir = path.join(__dirname, '../../public');
  const htmlFiles = ['index.html', 'playbook.html', 'privacy.html', 'terms.html'];

  describe('Essential Meta Tags', () => {
    test('All pages should have charset meta tag', () => {
      htmlFiles.forEach(file => {
        const filePath = path.join(publicDir, file);
        const html = fs.readFileSync(filePath, 'utf8');
        const dom = new JSDOM(html);
        const doc = dom.window.document;

        const charset = doc.querySelector('meta[charset]');
        expect(charset).toBeTruthy();
        expect(charset.getAttribute('charset').toLowerCase()).toBe('utf-8');
      });
    });

    test('All pages should have viewport meta tag', () => {
      htmlFiles.forEach(file => {
        const filePath = path.join(publicDir, file);
        const html = fs.readFileSync(filePath, 'utf8');
        const dom = new JSDOM(html);
        const doc = dom.window.document;

        const viewport = doc.querySelector('meta[name="viewport"]');
        expect(viewport).toBeTruthy();
        expect(viewport.getAttribute('content')).toContain('width=device-width');
      });
    });

    test('All pages should have a title', () => {
      htmlFiles.forEach(file => {
        const filePath = path.join(publicDir, file);
        const html = fs.readFileSync(filePath, 'utf8');
        const dom = new JSDOM(html);
        const doc = dom.window.document;

        const title = doc.querySelector('title');
        expect(title).toBeTruthy();
        expect(title.textContent).toContain('Lumora Consulting');
      });
    });
  });

  describe('SEO Meta Tags', () => {
    test('Index page should have description meta tag', () => {
      const filePath = path.join(publicDir, 'index.html');
      const html = fs.readFileSync(filePath, 'utf8');
      const dom = new JSDOM(html);
      const doc = dom.window.document;

      const description = doc.querySelector('meta[name="description"]');
      expect(description).toBeTruthy();
      expect(description.getAttribute('content').length).toBeGreaterThan(50);
    });

    test('Index page should have keywords meta tag', () => {
      const filePath = path.join(publicDir, 'index.html');
      const html = fs.readFileSync(filePath, 'utf8');
      const dom = new JSDOM(html);
      const doc = dom.window.document;

      const keywords = doc.querySelector('meta[name="keywords"]');
      expect(keywords).toBeTruthy();
      expect(keywords.getAttribute('content')).toContain('AI');
    });

    test('Index page should have canonical link', () => {
      const filePath = path.join(publicDir, 'index.html');
      const html = fs.readFileSync(filePath, 'utf8');
      const dom = new JSDOM(html);
      const doc = dom.window.document;

      const canonical = doc.querySelector('link[rel="canonical"]');
      expect(canonical).toBeTruthy();
      expect(canonical.getAttribute('href')).toContain('lummycreations.com');
    });
  });

  describe('Open Graph Tags', () => {
    test('Index page should have Open Graph tags', () => {
      const filePath = path.join(publicDir, 'index.html');
      const html = fs.readFileSync(filePath, 'utf8');
      const dom = new JSDOM(html);
      const doc = dom.window.document;

      const ogTitle = doc.querySelector('meta[property="og:title"]');
      const ogDescription = doc.querySelector('meta[property="og:description"]');
      const ogType = doc.querySelector('meta[property="og:type"]');
      const ogUrl = doc.querySelector('meta[property="og:url"]');
      const ogImage = doc.querySelector('meta[property="og:image"]');

      expect(ogTitle).toBeTruthy();
      expect(ogDescription).toBeTruthy();
      expect(ogType).toBeTruthy();
      expect(ogUrl).toBeTruthy();
      expect(ogImage).toBeTruthy();
    });

    test('Playbook page should have Open Graph tags', () => {
      const filePath = path.join(publicDir, 'playbook.html');
      const html = fs.readFileSync(filePath, 'utf8');
      const dom = new JSDOM(html);
      const doc = dom.window.document;

      const ogTitle = doc.querySelector('meta[property="og:title"]');
      const ogDescription = doc.querySelector('meta[property="og:description"]');

      expect(ogTitle).toBeTruthy();
      expect(ogDescription).toBeTruthy();
    });
  });

  describe('Twitter Card Tags', () => {
    test('Index page should have Twitter Card tags', () => {
      const filePath = path.join(publicDir, 'index.html');
      const html = fs.readFileSync(filePath, 'utf8');
      const dom = new JSDOM(html);
      const doc = dom.window.document;

      const twitterCard = doc.querySelector('meta[name="twitter:card"]');
      const twitterTitle = doc.querySelector('meta[name="twitter:title"]');
      const twitterDescription = doc.querySelector('meta[name="twitter:description"]');

      expect(twitterCard).toBeTruthy();
      expect(twitterTitle).toBeTruthy();
      expect(twitterDescription).toBeTruthy();
    });
  });

  describe('Favicon and Icons', () => {
    test('All pages should have favicon links', () => {
      htmlFiles.forEach(file => {
        const filePath = path.join(publicDir, file);
        const html = fs.readFileSync(filePath, 'utf8');
        const dom = new JSDOM(html);
        const doc = dom.window.document;

        const favicons = doc.querySelectorAll('link[rel*="icon"]');
        expect(favicons.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Structured Data', () => {
    test('Index page should have JSON-LD structured data', () => {
      const filePath = path.join(publicDir, 'index.html');
      const html = fs.readFileSync(filePath, 'utf8');
      const dom = new JSDOM(html);
      const doc = dom.window.document;

      const jsonLd = doc.querySelector('script[type="application/ld+json"]');
      expect(jsonLd).toBeTruthy();

      const data = JSON.parse(jsonLd.textContent);
      expect(data['@context']).toBe('https://schema.org');
      expect(data['@type']).toBe('Organization');
      expect(data.name).toBe('Lumora Consulting');
    });
  });
});
