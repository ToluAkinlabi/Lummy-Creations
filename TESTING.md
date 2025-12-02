# Quick Test Guide

## Running Tests

### All Tests
```bash
npm test
```

### Specific Test Suites
```bash
# Unit tests only
npm run test:unit

# Functional tests only
npm run test:functional

# Individual test file
npx jest tests/unit/typography.test.js
npx jest tests/unit/navigation.test.js
npx jest tests/unit/footer.test.js
npx jest tests/unit/meta.test.js
npx jest tests/unit/forms.test.js
npx jest tests/functional/accessibility.test.js
npx jest tests/functional/responsive.test.js
```

### Watch Mode (Auto-rerun on changes)
```bash
npm run test:watch
```

### Coverage Report
```bash
npm run test:coverage
```

## Test Categories

### Typography Tests
- Font consistency (Montserrat/Roboto Slab)
- Navbar brand styling
- No deprecated fonts

### Navigation Tests
- Navbar structure
- Link validation
- External link attributes

### Footer Tests
- Footer presence
- Copyright text
- Social links

### Meta Tests
- SEO tags
- Open Graph
- Favicons
- Structured data

### Forms Tests
- Form structure
- Required/optional fields
- Spam protection
- Accessibility

### Accessibility Tests
- ARIA labels
- Semantic HTML
- Keyboard navigation
- Screen reader support

### Responsive Tests
- Viewport configuration
- Bootstrap grid
- Mobile optimizations
- Touch targets

## Test Results

**Current Status:** ✅ 79/79 tests passing (100%)

See TEST_RESULTS.md for detailed report.
