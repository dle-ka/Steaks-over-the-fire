# EMBER — Steaks on Fire · Open Grill

A steakhouse landing page built with pure HTML, CSS, and vanilla JavaScript.
Designed as a portfolio piece to showcase front-end skills: layout, animation,
interaction design, and clean vanilla JS without any frameworks.

---

## 🇬🇧 English

### Overview

EMBER is a one-page restaurant website with a dark, cinematic aesthetic.
It focuses on smooth scroll animations, responsive layout, and small interactive
details that make the page feel alive — parallax, reveal-on-scroll, hover
effects, a slider, and form validation.

### What's on the page

- **Preloader** — animated flame with sparks and pulsing glow
- **Header** — sticky navigation that changes on scroll, mobile burger menu
- **Hero** — full-screen section with parallax background and large typography
- **About** — restaurant manifesto with framed image
- **Signature menu** — six steak cards with hover lift and image zoom
- **Process** — "The Path of the Steak" in four alternating steps
- **Gallery** — 3×3 image grid with shimmer effect on hover
- **Reviews** — horizontal scroll-snap slider with arrows and dots
- **Booking form** — client-side validation, phone mask, date guard, success message
- **Contacts** — address, phone, email, socials, and an embedded map
- **Footer** — logo and copyright

### Interactions & details

- Reveal-on-scroll animations via `IntersectionObserver`
- Custom cursor glow that follows the mouse
- Smooth anchor scrolling with header offset
- Fully responsive: desktop, tablet, mobile

### Tech Stack

- **HTML5** — semantic markup
- **CSS3** — custom properties, Grid, Flexbox, `clamp()`, keyframe animations
- **Vanilla JavaScript** — no libraries, no dependencies
- **Google Fonts** — Playfair Display + Manrope

### Project Structure
ember-steakhouse/
├── index.html # Markup and content
├── style.css # All styles and responsive rules
├── script.js # Preloader, parallax, slider, form validation
└── README.md


### Getting Started

```bash
git clone https://github.com/dle-ka/Steaks-over-the-fire.git
Then open index.html in any modern browser. No installation, no build step.

What I practiced
Building a full landing page from scratch without frameworks

Writing clean, readable CSS with custom properties

Using IntersectionObserver for scroll-based animations

Implementing a slider with scroll-snap and dynamic dots

Form validation with a phone mask and custom error messages

Responsive design across desktop, tablet, and mobile
