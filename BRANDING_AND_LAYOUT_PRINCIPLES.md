# All Fire Services – Comprehensive Branding, Design, and Layout Source of Truth

This document serves as the **comprehensive source of truth** for the styling, branding, typography, layout, and exact UI components used across the entire application (specifically the Home and About pages). 

**How to use this document:** You can explicitly reference this file by saying, *"Copy the style and design of the [X Component] from the `BRANDING_AND_LAYOUT_PRINCIPLES.md` and apply it to my new page."*

---

## 1. Brand Philosophy & Design Rules
- **Premium & Professional:** High-end aesthetic with dynamic contrasts and polished transitions.
- **Authoritative & Experienced:** Conveying "decades of real-world firefighting experience."
- **Modern & Dynamic:** Utilizing subtle scroll reveals, glassmorphism, overlapping gradients, and smooth hover micro-animations.

---

## 2. Color Palette & Typography

### Colors
- **Primary Dark Background:** `#111111`
- **Primary Light Background:** `#ffffff`
- **Secondary Light Background:** `#F9FAFB` (Used in FAQ background)
- **Primary Orange (Buttons & Accents):** `#fb5614` to `#fc0403`
- **Secondary Yellow/Gold (Kickers/Eyebrows):** `#FEAF04`
- **Signature Gradient (Text & Accents):** `linear-gradient(to right, #ff2a00, #ffb700)`

### Typography (Inter & Display)
- **Huge Hero Titles (H1):** `clamp(2rem, 5vw, 5.5rem)` or `clamp(4.25rem, 9vw, 8.5rem)`, `fontWeight: 900`, `textTransform: 'uppercase'`, `lineHeight: 1.1`.
- **Section Titles (H2):** `clamp(2.5rem, 4.2vw, 4rem)` or `clamp(2.5rem, 4.8vw, 5.2rem)`, `fontWeight: 800`, `letterSpacing: '-0.06em'`, `lineHeight: 0.94`.
- **Eyebrow / Kicker Text:**
  ```tsx
  <div className="header-eyebrow-text" style={{ color: '#FEAF04', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
    YOUR KICKER HERE
  </div>
  ```
- **Standard Body Text:**
  ```tsx
  <p className="body-text text-gray-600 leading-relaxed text-[0.9rem]">...</p>
  ```
  or for dark backgrounds: `color: 'rgba(255,255,255,0.9)'`.

---

## 3. Home Page (`app/page.tsx`) Component Blueprints

### 3.1. Home Hero Video Section
**Description:** A massive visual hero with an autoplaying background video, dark gradient overlays, and dynamic gradient text.
**Key Code:**
```tsx
<div className="hero-and-cards-wrapper" style={{ position: 'relative', width: '100%', zIndex: 10 }}>
  {/* Video Background */}
  <video className="shared-bg-image" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} autoPlay loop muted playsInline poster="/fallback.jpg">
    <source src="/hero-video.mp4" type="video/mp4" />
  </video>
  
  {/* Dark Overlay */}
  <div className="dark-overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.4)', zIndex: 1 }} />
  
  {/* Bottom Fade to White */}
  <div className="fade-overlay" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '150px', background: 'linear-gradient(to bottom, transparent, #ffffff)', zIndex: 2 }} />
  
  <div className="hero-container" style={{ position: 'relative', zIndex: 3 }}>
    <div className="padding-global">
      <div className="container-large">
        <div className="padding-section-large text-center">
           {/* Eyebrow */}
           <div className="header-eyebrow-text" style={{ color: '#FEAF04', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
             Welcome to All Fire Services
           </div>
           
           {/* Huge H1 Title */}
           <h1 style={{ fontSize: 'clamp(4.25rem, 9vw, 8.5rem)', color: '#ffffff', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.1, margin: 0 }}>
             <span style={{ display: 'block', whiteSpace: 'nowrap' }}>FIRE PROTECTION</span>
             <span style={{ display: 'inline-block', whiteSpace: 'nowrap', background: 'linear-gradient(to right, #ff2a00, #ffb700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
               SYDNEY
             </span>
           </h1>
        </div>
      </div>
    </div>
  </div>
</div>
```

### 3.2. Clients Marquee Slider
**Description:** Infinite scrolling logos of trusted clients with a white background and faded gradient edges.
**Key Code:**
```tsx
<section className="clients-marquee" style={{ background: '#ffffff', overflow: 'hidden', padding: 'clamp(3rem, 5vw, 5rem) 0', position: 'relative' }}>
  {/* Left & Right Fade Edges */}
  <div style={{ position: 'absolute', inset: 0, width: '9rem', background: 'linear-gradient(90deg, #fff 0%, transparent 100%)', zIndex: 2, left: 0 }} />
  <div style={{ position: 'absolute', inset: 0, width: '9rem', background: 'linear-gradient(270deg, #fff 0%, transparent 100%)', zIndex: 2, right: 0 }} />
  
  {/* Marquee Header */}
  <div className="clients-marquee-header text-center mx-auto mb-8">
    <p style={{ color: '#ff5722', fontSize: '0.76rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Trusted By</p>
    <h2 style={{ color: '#111111', fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', textTransform: 'uppercase' }}>Greater Sydney's Property Managers</h2>
  </div>
  
  {/* Scrolling Track Grid (Animated via CSS) */}
  <div className="clients-marquee-track-wrap flex gap-10 overflow-hidden">
     {/* Mapping of Client Images */}
  </div>
</section>
```

### 3.3. Testimonials Component
**Description:** Uses an alternating timeline animation and card grids. The eyebrow uses standard styling.
**Key Code:**
```tsx
<section className="w-full bg-white text-black py-10 md:py-14" id="testimonials">
  <article className={"max-w-4xl mx-auto text-center mb-8 px-4"} >
    <div className="header-eyebrow-text" style={{ color: '#FEAF04', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
      TESTIMONIALS
    </div>
    <h2 className={"max-w-3xl mx-auto text-2xl sm:text-3xl md:text-5xl font-display font-bold tracking-tight text-[#111111] leading-snug"}>
      Trusted by Greater Sydney's property managers and owners
    </h2>
  </article>
</section>
```

### 3.4. Pre-FAQ Gradient CTA (`PreFaqCTA`)
**Description:** A stunning floating card with a rich red/orange/yellow radial gradient background.
**Key Code:**
```tsx
<section className="pre-faq-cta" style={{ background: '#ffffff', padding: 'clamp(3rem, 7vw, 6rem) 1.25rem 2rem' }}>
  <div className="pre-faq-cta-card" style={{
    background: 'radial-gradient(circle at 48% 10%, rgba(254, 175, 4, 0.38), transparent 28%), radial-gradient(circle at 12% 18%, rgba(252, 4, 3, 0.28), transparent 32%), linear-gradient(135deg, #fc0403 0%, #fb5614 43%, #feaf04 100%)',
    borderRadius: '1.5rem',
    boxShadow: '0 2rem 4.5rem rgba(17, 17, 17, 0.16)',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 auto',
    maxWidth: '71rem',
    padding: 'clamp(2rem, 5vw, 4.5rem)',
    textAlign: 'center'
  }}>
    <h2 style={{ fontSize: 'clamp(2rem, 4.2vw, 4rem)', fontWeight: 780, letterSpacing: '-0.06em', lineHeight: 0.92 }}>
      Ready to raise your fire safety standard?
    </h2>
  </div>
</section>
```

### 3.5. FAQ Accordion Component (`FAQ.tsx`)
**Description:** A sleek, framer-motion powered accordion with modern plus/minus icons, rounded borders, and subtle shadow hovers. Uses `#F9FAFB` background.
**Key Code:**
```tsx
<section className="w-full py-20 md:py-32 bg-[#F9FAFB] border-t border-gray-100">
  <div className="text-center max-w-2xl mx-auto mb-16">
    <div className="header-eyebrow-text" style={{ color: '#FEAF04', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
      FAQ
    </div>
    <h2 className="heading-style-h2 text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
      Frequently Asked Questions
    </h2>
  </div>
  {/* Mapping Questions */}
  <div className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${isOpen ? 'bg-white border-[#FEAF04]/30 shadow-lg shadow-[#FEAF04]/5' : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm'}`}>
    <button className="w-full flex justify-between items-center px-6 py-3.5 text-left focus:outline-none rounded-2xl">
      <span className={`body-text text-[0.95rem] pr-8 transition-colors ${isOpen ? 'text-[#111111] font-bold' : 'text-gray-800 font-medium'}`}>
        Question Text
      </span>
      {/* Plus/Minus Icons from lucide-react go here */}
    </button>
    <AnimatePresence>
      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}>
        <p className="body-text text-gray-600 leading-relaxed text-[0.9rem]">Answer Text</p>
      </motion.div>
    </AnimatePresence>
  </div>
</section>
```

### 3.6. Global Footer Component (`Footer.tsx`)
**Description:** A professional, responsive 4-column footer layout that is center-aligned on mobile and perfectly left-aligned on desktop.
**Key Code:**
```tsx
<footer className="bg-white text-gray-900 pt-8 pb-6 w-full mt-auto border-t border-gray-200">
  <div className="max-w-[1200px] mx-auto w-full px-4 md:px-6">
    {/* 4-Column Grid: Left aligned on desktop, centered on mobile */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-center md:text-left items-start">
      {/* Column Example */}
      <div className="flex flex-col items-center md:items-start gap-4">
        <div className="text-xl md:text-2xl font-bold text-gray-900">NAVIGATE</div>
        <ul className="flex flex-col gap-2 text-sm text-gray-600 items-center md:items-start">
          <li><Link href="/">Link 1</Link></li>
        </ul>
        {/* Social Icons row */}
        <div className="flex justify-center md:justify-start items-center gap-4 mt-3">
          {/* Social Icons */}
        </div>
      </div>
    </div>
  </div>
</footer>
```

---

## 4. About Page (`app/about/page.tsx`) Component Blueprints

### 4.1. About Page Hero Section
**Description:** A tall hero with a static image background, a dark multi-stop fade from the top, a horizontal color multiply overlay, and a seamless white fade at the bottom.
**Key Code:**
```tsx
<header style={{ position: 'relative', marginTop: '-12rem', paddingTop: '12rem', marginBottom: '-2px' }}>
  {/* 1. Background Image */}
  <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
    <Image src="/your-image.jpg" alt="Hero Background" fill style={{ objectFit: 'cover' }} />
  </div>
  {/* 2. Complex Overlays for perfect fading into the next white section */}
  <div className="about-dark-overlay" style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to bottom, rgba(10,10,10,0.88) 0%, rgba(20,5,5,0.82) 30%, transparent 92%)' }}></div>
  <div className="about-fade-overlay" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '55%', zIndex: 2, background: 'linear-gradient(to bottom, transparent, #ffffff)' }}></div>
  
  {/* Content Layout */}
  <div className="flex flex-col md:flex-row text-center md:text-left relative z-10">
    <div className="mx-auto md:mx-0 header-eyebrow-text" style={{ color: '#FEAF04' }}>About All Fire Services</div>
    <h1 style={{ fontSize: 'clamp(2rem, 5vw, 5.5rem)', color: '#ffffff', fontWeight: 900 }}>
       <span style={{ display: 'block' }}>ABOUT ALLFIRE</span>
       <span style={{ display: 'inline-block', background: 'linear-gradient(to right, #ff2a00, #ffb700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
         SERVICES SYDNEY
       </span>
    </h1>
  </div>
</header>
```

### 4.2. Standard Alternating Grid (Image + Text)
**Description:** A 2-column flex/grid layout that alternates between image and text per block. Uses large rounded corners (`1.5rem`) on images.
**Key Code:**
```tsx
<div className="flex flex-col md:flex-row gap-12 items-stretch" style={{ marginBottom: '14rem' }}>
  {/* Text Content Block */}
  <div className="flex-1 flex flex-col justify-center text-center md:text-left">
    <p className="mx-auto md:mx-0 uppercase text-[#feaf04] font-bold">SECTION KICKER</p>
    <h2 className="mx-auto md:mx-0" style={{ fontSize: 'clamp(2.5rem, 4.8vw, 5.2rem)', fontWeight: 800, color: '#111111' }}>
      Standard <span style={{ color: '#ff2a00' }}>Highlight</span>
    </h2>
    <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)]">Description here...</p>
  </div>
  {/* Image Content Block */}
  <div className="flex-1 relative w-full min-h-[300px] max-h-[440px] rounded-[1.5rem] overflow-hidden m-auto shadow-2xl">
    <Image src="/image.jpg" alt="Description" fill style={{ objectFit: 'cover' }} />
  </div>
</div>
{/* Note: To alternate image first, simply use flex-col md:flex-row-reverse */}
```

### 4.3. Floating Mission Box
**Description:** A bordered, boxed container floating with a soft dropshadow. Used to separate critical values from the flow of standard alternating rows.
**Key Code:**
```tsx
<div style={{ 
  backgroundColor: '#ffffff', 
  padding: 'clamp(2.5rem, 4vw, 3.5rem)', 
  borderRadius: '24px', 
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)', 
  border: '1px solid rgba(0, 0, 0, 0.05)' 
}}>
  <div className="flex flex-col md:flex-row gap-12 items-stretch">
     <div className="flex-1 flex flex-col justify-center">
       {/* High-emphasis text */}
       <p className="text-[#111] font-bold border-l-4 border-[#ff2a00] pl-4">
         Critical statement callout.
       </p>
     </div>
  </div>
</div>
```

---

## Conclusion
Whenever a new page is being created (for instance, the Services or Contact pages), you should literally lift these React component structures directly from this document. Replace the content, images, and text, but **leave the classNames, `style={{}}` inline attributes, typography scales, and structures untouched** to ensure perfect visual consistency across the platform.

---

## 5. Our Clients Page (`app/our-clients/page.tsx`) Component Blueprints

### 5.1. Client Logo Grid (`ClientGrid.tsx`)
**Description:** A 2-column responsive layout (left for large intro text, right for a dynamic grid of client logos with various background handling). 
**Key Code:**
```tsx
<div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
  {/* Left Column: Text */}
  <div className="lg:col-span-5 flex flex-col items-center text-center lg:items-start lg:text-left">
    <p style={{ color: '#fb5614', fontWeight: 600 }}>TRUSTED BY</p>
    <h2 style={{ fontSize: 'clamp(2.8rem, 5.8vw, 4.5rem)', fontWeight: 780, letterSpacing: '-0.06em', lineHeight: 0.92 }}>
      Greater Sydney's <span style={{ color: '#fb5614' }}>Property Managers</span>
    </h2>
  </div>
  
  {/* Right Column: Logos */}
  <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-16 items-center justify-items-center">
    {/* Map logos here */}
    <div className="flex items-center justify-center w-full h-16 md:h-20 px-4">
      {/* Logos use standard filter: brightness-0 opacity-90 for SVG/PNG, 
          and grayscale contrast-125 opacity-90 + mixBlendMode: multiply for JPG/images with white backgrounds */}
      <Image src="/logo.png" alt="Client Logo" width={150} height={50} className="filter brightness-0 opacity-90" />
    </div>
  </div>
</div>
```

### 5.2. About Clients Feature Grid (`AboutClients.tsx`)
**Description:** A grid system similar to the About page's Standard Alternating Grid, but uses `styles.newStoryGrid` from `HomeStoryLegacy.module.css` to allow for tighter spacing and specialized alignments.
**Key Code:**
```tsx
<div className={`${styles.newStoryGrid} ${styles.newStoryGridImageFirst}`} style={{ marginBottom: '10rem', alignItems: 'stretch' }}>
  <div className="relative w-full h-full min-h-[300px] max-h-[440px] rounded-[1.5rem] overflow-hidden m-auto shadow-2xl lg:order-2 order-1">
    <Image src="/image.webp" alt="Client Feature" fill style={{ objectFit: 'cover' }} />
  </div>

  <div className={`${styles.newStoryContent} lg:order-1 order-2 flex flex-col justify-center`}>
    <header className={styles.storyHeaderLeft} style={{ marginTop: 0, marginBottom: '1.5rem', width: '100%' }}>
      <p className={styles.kickerLeft} style={{ textTransform: 'uppercase', color: '#feaf04', fontWeight: 800 }}>
        EXPERTISE
      </p>
      <h2 style={{ fontSize: 'clamp(2.5rem, 4.2vw, 4rem)', fontWeight: 800, color: '#111111', lineHeight: 0.94, letterSpacing: '-0.04em' }}>
        Every Building. Every <span className={styles.orangeText}>Industry.</span>
      </h2>
    </header>
    <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55]">
      Description text here...
    </p>
  </div>
</div>
```
