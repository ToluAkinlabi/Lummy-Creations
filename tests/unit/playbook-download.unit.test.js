const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('Playbook form download unit', () => {
  let dom;
  let document;
  beforeAll(() => {
    const html = fs.readFileSync(path.join(__dirname, '../../public/playbook.html'), 'utf8');
    dom = new JSDOM(html, { url: 'http://localhost/playbook.html' });
    document = dom.window.document;
  });

  test('form has data-download-url attribute', () => {
    const form = document.querySelector('#playbook-form');
    expect(form).toBeTruthy();
    expect(form.getAttribute('data-download-url')).toBe('./playbook/Lumora AI Security & Product Acceleration Playbook (2025 Enterprise Edition).pdf');
  });

  test('script exists and binds submit handler', () => {
    // Simple presence check; binding itself is jQuery-based, validated in functional test
    const scripts = [...document.querySelectorAll('script')].map(s => s.textContent || '');
    const hasSubmitLogic = scripts.some(txt => txt.includes("$('#playbook-form').on('submit'"));
    expect(hasSubmitLogic).toBe(true);
  });
});
