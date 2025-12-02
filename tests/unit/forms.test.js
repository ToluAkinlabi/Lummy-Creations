/**
 * Forms Tests
 * Validates form structure, validation, and submission endpoints
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('Forms Tests', () => {
  const publicDir = path.join(__dirname, '../../public');

  describe('Contact Form (Index Page)', () => {
    let dom, doc;

    beforeAll(() => {
      const filePath = path.join(publicDir, 'index.html');
      const html = fs.readFileSync(filePath, 'utf8');
      dom = new JSDOM(html);
      doc = dom.window.document;
    });

    test('Contact form should exist', () => {
      const form = doc.querySelector('form[action*="formspree"]');
      expect(form).toBeTruthy();
    });

    test('Contact form should have correct action URL', () => {
      const form = doc.querySelector('form[action*="formspree"]');
      expect(form.getAttribute('action')).toContain('formspree.io');
      expect(form.getAttribute('method').toUpperCase()).toBe('POST');
    });

    test('Contact form should have all required fields', () => {
      const nameInput = doc.querySelector('input[name="name"]');
      const emailInput = doc.querySelector('input[name="email"]');
      const messageTextarea = doc.querySelector('textarea[name="message"]');

      expect(nameInput).toBeTruthy();
      expect(emailInput).toBeTruthy();
      expect(messageTextarea).toBeTruthy();

      expect(nameInput.hasAttribute('required')).toBe(true);
      expect(emailInput.hasAttribute('required')).toBe(true);
      expect(messageTextarea.hasAttribute('required')).toBe(true);
    });

    test('Contact form should have optional fields', () => {
      const companyInput = doc.querySelector('input[name="company"]');
      const segmentSelect = doc.querySelector('select[name="segment"]');

      expect(companyInput).toBeTruthy();
      expect(segmentSelect).toBeTruthy();
    });

    test('Email input should have correct type', () => {
      const emailInput = doc.querySelector('input[name="email"]');
      expect(emailInput.getAttribute('type')).toBe('email');
    });

    test('Contact form should have honeypot field', () => {
      const honeypot = doc.querySelector('input[name="_gotcha"]');
      expect(honeypot).toBeTruthy();
      
      const style = honeypot.getAttribute('style') || '';
      expect(style).toContain('display:none');
    });

    test('Contact form should have submit button', () => {
      const submitButton = doc.querySelector('button[type="submit"]');
      expect(submitButton).toBeTruthy();
    });

    test('Segment select should have all options', () => {
      const segmentSelect = doc.querySelector('select[name="segment"]');
      const options = Array.from(segmentSelect.querySelectorAll('option'));
      const optionTexts = options.map(opt => opt.textContent);

      expect(optionTexts).toContain('Enterprise');
      expect(optionTexts).toContain('Startup');
      expect(optionTexts).toContain('Founder');
    });
  });

  describe('Playbook Download Form', () => {
    let dom, doc;

    beforeAll(() => {
      const filePath = path.join(publicDir, 'playbook.html');
      const html = fs.readFileSync(filePath, 'utf8');
      dom = new JSDOM(html);
      doc = dom.window.document;
    });

    test('Playbook form should exist', () => {
      const form = doc.querySelector('form[action*="formspree"]');
      expect(form).toBeTruthy();
    });

    test('Playbook form should have correct action URL', () => {
      const form = doc.querySelector('form[action*="formspree"]');
      expect(form.getAttribute('action')).toContain('formspree.io');
      expect(form.getAttribute('method').toUpperCase()).toBe('POST');
    });

    test('Playbook form should have required fields', () => {
      const nameInput = doc.querySelector('input[name="full_name"]');
      const emailInput = doc.querySelector('input[name="email"]');

      expect(nameInput).toBeTruthy();
      expect(emailInput).toBeTruthy();

      expect(nameInput.hasAttribute('required')).toBe(true);
      expect(emailInput.hasAttribute('required')).toBe(true);
    });

    test('Playbook form should have optional fields', () => {
      const companyInput = doc.querySelector('input[name="company"]');
      const roleSelect = doc.querySelector('select[name="role"]');

      expect(companyInput).toBeTruthy();
      expect(roleSelect).toBeTruthy();
    });

    test('Playbook form should have honeypot field', () => {
      const honeypot = doc.querySelector('input[name="_gotcha"]');
      expect(honeypot).toBeTruthy();
    });

    test('Role select should have all options', () => {
      const roleSelect = doc.querySelector('select[name="role"]');
      const options = Array.from(roleSelect.querySelectorAll('option'));
      const optionTexts = options.map(opt => opt.textContent);

      expect(optionTexts).toContain('Founder / CEO');
      expect(optionTexts).toContain('CTO / VP Engineering');
      expect(optionTexts).toContain('Product Manager');
    });
  });

  describe('Form Accessibility', () => {
    test('All form inputs should have associated labels', () => {
      const files = ['index.html', 'playbook.html'];
      
      files.forEach(file => {
        const filePath = path.join(publicDir, file);
        const html = fs.readFileSync(filePath, 'utf8');
        const dom = new JSDOM(html);
        const doc = dom.window.document;

        const inputs = Array.from(doc.querySelectorAll('input[type="text"], input[type="email"], textarea, select'));
        
        inputs.forEach(input => {
          const id = input.getAttribute('id');
          const name = input.getAttribute('name');
          
          // Skip honeypot fields
          if (name === '_gotcha') return;
          
          if (id) {
            const label = doc.querySelector(`label[for="${id}"]`);
            expect(label).toBeTruthy();
          }
        });
      });
    });

    test('Submit buttons should have descriptive text', () => {
      const files = ['index.html', 'playbook.html'];
      
      files.forEach(file => {
        const filePath = path.join(publicDir, file);
        const html = fs.readFileSync(filePath, 'utf8');
        const dom = new JSDOM(html);
        const doc = dom.window.document;

        const submitButtons = Array.from(doc.querySelectorAll('button[type="submit"]'));
        
        submitButtons.forEach(button => {
          expect(button.textContent.trim().length).toBeGreaterThan(0);
        });
      });
    });
  });
});
