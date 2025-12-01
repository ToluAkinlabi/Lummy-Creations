# Lumora Consulting

**AI Product Accelerator** specializing in AI Engineering, Cyber Security, and Product Management.

## About

Lumora Consulting, a division of Lummy Creations LLC, helps enterprises, startups, and founders transform AI concepts into secure, production-ready products.

## Services

### AI Security & Governance
- AI Risk Audit
- OWASP Alignment
- Enterprise AI Hardening
- AI Governance Frameworks
- LLM Policy Creation
- Secure Architecture Design

### Product Development
- Product Requirements Documents (PRD)
- Workflow Design
- System Architecture
- AI Orchestration Pipeline
- MVP Prototyping
- Technical Roadmapping

### Strategic Advisory
- Investor Deck Creation
- Go-to-Market Strategy
- AI Product Positioning
- Secure AI Products Development
- Enterprise & Startup Consulting

## Featured Project: AICA

**Abnormal AI Communications Assistant** - An incident response platform featuring:
- Advanced guardrails (regex redaction, stack-trace removal)
- Severity-based auto-cadence (SEV1-SEV4)
- Dynamic prompt construction per stage
- Multi-format export templates
- LLM integration via OpenAI

## Deployment

### Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow prompts to link project and deploy

### Custom Domain Setup

After deployment, add your custom domain in the Vercel dashboard:
- Go to Project Settings → Domains
- Add your domain
- Update DNS records as instructed

## Local Development

```bash
# Open index.html in browser or use a local server
python -m http.server 8000
# Navigate to http://localhost:8000/public/
```

## Tech Stack

- HTML5
- CSS3/SCSS
- Bootstrap 4
- jQuery
- Font Awesome
- Formspree (Form handling)
- Calendly (Appointment scheduling)

## Brand Identity

### Color Palette

**Primary Colors:**
- **Gold:** `#fed136` - Primary brand color for CTAs, links, icons, and accents
- **Gold Hover:** `#fec503` / `#fec810` - Interactive states
- **Charcoal:** `#212529` - Navigation, footer, dark sections, high contrast text

**Supporting Colors:**
- **White:** `#ffffff` - Main content backgrounds
- **Light Gray:** `#f8f9fa` - Subtle section backgrounds
- **Theme:** `#fed136` - PWA manifest theme color

### Typography

**Primary Typefaces:**
- **Playfair Display** (Serif Display 400–700) - Hero headings & emphasized key statements (professional, authoritative)
- **Montserrat** (Sans-serif 400/700) - Navigation, section titles, UI labels
- **Droid Serif** (Serif 400/700) - Body paragraphs, longer descriptive copy
- **Roboto Slab** (Slab Serif 300/400/700) - Supporting cards, secondary emphasis blocks

**Font Loading:**
- Google Fonts with `preconnect` optimization
- `font-display: swap` for performance
- Removed casual script accent (Kaushan) to strengthen enterprise positioning

### Design Principles

**Visual Identity:**
- Premium consulting aesthetic
- Professional yet approachable
- Gold = Innovation, premium, AI/tech forward
- Charcoal = Trust, enterprise-grade, serious
- Serif display (Playfair) = Strategic clarity & authority
- Serif body (Droid Serif) = Credibility, readability, established

**Responsive Design:**
- Mobile-first approach
- Touch-friendly elements (44px minimum)
- Optimized typography scaling for mobile, tablet, desktop
- Bootstrap 4 grid system

**Accessibility:**
- ARIA labels on interactive elements
- Semantic HTML structure
- Alt text on all images
- Keyboard navigation support

### Assets Required

**Images:**
- `og-cover.png` (1200x630) - Social media sharing
- `favicon-16.png` (16x16) - Browser tab icon
- `favicon-32.png` (32x32) - Browser tab icon
- `favicon-192.png` (192x192) - Android home screen
- `favicon-512.png` (512x512) - High-res PWA icon
- `apple-touch-icon.png` (180x180) - iOS home screen

**Logo Guidelines:**
- Use gold `#fed136` as primary color
- Pair with charcoal `#212529` for contrast
- Maintain clean, modern aesthetic

## Security Features

- **HSTS** with preload (max-age: 63072000)
- **Content Security Policy (CSP)** - XSS protection
- **X-Frame-Options: DENY** - Clickjacking protection
- **X-Content-Type-Options: nosniff** - MIME sniffing protection
- **Referrer Policy** - Privacy protection
- **Permissions Policy** - Feature access control
- **Honeypot spam protection** on contact form

## Contact

**Email:** lummycreations.lc@gmail.com  
**Phone:** (+1) 301-222-3037  
**Location:** Maryland, USA

---

Copyright © Lummy Creations LLC 2025
