# Lumora Consulting Website - Test Suite

Comprehensive test suite for validating the consistency, functionality, and quality of the Lumora Consulting website.

## Test Structure

### Unit Tests (`tests/unit/`)
Tests for individual components and consistency across pages:

- **typography.test.js**: Validates font consistency (Montserrat for headers, Roboto Slab for body)
- **navigation.test.js**: Checks navigation structure, links, and consistency
- **footer.test.js**: Validates footer content and structure across pages
- **meta.test.js**: Tests SEO meta tags, Open Graph, and structured data
- **forms.test.js**: Validates form structure, validation, and endpoints

### Functional Tests (`tests/functional/`)
Tests for overall functionality and user experience:

- **accessibility.test.js**: WCAG compliance, ARIA labels, semantic HTML
- **responsive.test.js**: Mobile optimization, responsive design, touch targets

## Running Tests

### Install Dependencies
```bash
npm install
```

### Run All Tests
```bash
npm test
```

### Run Specific Test Suites
```bash
# Unit tests only
npm run test:unit

# Functional tests only
npm run test:functional

# Watch mode (re-run on file changes)
npm run test:watch

# Coverage report
npm run test:coverage
```

### Run Individual Test Files
```bash
# Typography tests
npx jest tests/unit/typography.test.js

# Navigation tests
npx jest tests/unit/navigation.test.js

# Accessibility tests
npx jest tests/functional/accessibility.test.js
```

## Test Coverage

### Typography Consistency
- ✅ Font family standards across all pages
- ✅ Montserrat for all headers (h1-h6)
- ✅ Roboto Slab for body text
- ✅ No legacy fonts (Droid Serif, Kaushan Script)
- ✅ Consistent navbar brand styling

### Navigation
- ✅ Navbar structure and Bootstrap classes
- ✅ Brand link consistency
- ✅ Navigation items on index page
- ✅ Internal link validation
- ✅ External link attributes (target="_blank", rel="noopener")

### Footer
- ✅ Footer presence on all pages
- ✅ Copyright text consistency
- ✅ Navigation links (Privacy, Terms, Home)
- ✅ Social media links
- ✅ Container class consistency

### SEO & Meta Tags
- ✅ Essential meta tags (charset, viewport, title)
- ✅ Description and keywords
- ✅ Canonical links
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ Favicons
- ✅ JSON-LD structured data

### Forms
- ✅ Contact form structure and validation
- ✅ Playbook download form
- ✅ Required vs optional fields
- ✅ Honeypot spam protection
- ✅ Form action URLs (Formspree)
- ✅ Input types and attributes
- ✅ Accessibility (labels, aria attributes)

### Accessibility
- ✅ Alt text on all images
- ✅ ARIA labels on interactive elements
- ✅ Semantic HTML5 structure
- ✅ Keyboard navigation support
- ✅ Touch-friendly button sizes (44px minimum)
- ✅ Form accessibility
- ✅ Color contrast considerations

### Responsive Design
- ✅ Viewport configuration
- ✅ Bootstrap grid system
- ✅ Mobile-specific CSS
- ✅ Responsive navigation (navbar collapse)
- ✅ Image responsiveness
- ✅ Touch target sizing
- ✅ Form responsiveness

## Typography Standards Enforced

**Headers**: `'Montserrat', sans-serif` - font-weight: 700
- All h1, h2, h3, h4, h5, h6 elements
- Navbar brand
- Buttons
- Section headings

**Body Text**: `'Roboto Slab', serif`
- Paragraphs
- Body content
- Form labels
- Section subheadings

## Test Results Interpretation

### Passing Tests ✅
All elements are consistent and meet quality standards.

### Failing Tests ❌
Indicates inconsistency or missing elements that need attention.

## Continuous Integration

These tests can be integrated into your CI/CD pipeline:

```yaml
# Example GitHub Actions workflow
- name: Run Tests
  run: npm test

- name: Upload Coverage
  run: npm run test:coverage
```

## Contributing

When adding new pages or features:
1. Update relevant test files
2. Run full test suite
3. Ensure all tests pass
4. Add new tests for new functionality

## Test Maintenance

- Review and update tests when design changes
- Add new test cases for new features
- Keep test data synchronized with actual content
- Update expected values when standards change

## Support

For questions or issues with the test suite:
- Check test output for specific failures
- Review test files for expected values
- Ensure all dependencies are installed
- Verify file paths are correct

---

**Built Beyond Excellence** - Ensuring quality through comprehensive testing.
