# 🧾 CHANGELOG

### 📓 Changelog for PortfolioV2
### 🏷️ [1.5.0] – 2026-06-17 — Blog CMS, Authentication & Platform Modernization

### ✨ Added / Enhanced

* Blog CMS foundation with post management dashboard (#94, #199, #200)
* Supabase PostgreSQL integration with Prisma ORM (#95, #96, #112)
* GitHub and Google OAuth authentication (#113, #149, #152)
* Role-based access control and protected administrator routes (#151, #156)
* Rich text blog editing with Tiptap support (#215)
* CMS-powered Testimonials system with moderation workflow (#159–169)
* Testimonial invitation and email notification system (#154, #155, #196–209)
* User avatar upload support via Supabase Storage (#165–170)
* Dynamic GitHub profile integration and author card enhancements (#126–128)
* New project showcases, demos, preview images, and updated portfolio content (#106, #120, #124, #215)
* Enhanced layouts and visual consistency across Home, Skills, Projects, Blog, and Testimonials sections (#182–189)

### 🔒 Security

* JWT session management with refresh token support (#176)
* Secure production cookie configuration (#176)
* Improved role validation and authorization middleware (#151, #156)

### 🐛 Fixed

* Projects page GitHub API synchronization issues (#115, #116)
* Footer styling issues in dark mode (#129, #130)
* Navbar favicon SSR errors during theme switching (#131, #132)
* GitHub avatar loading and profile image fallback handling (#136, #145)
* Administrator role assignment and access control issues (#173, #174)
* Supabase storage bucket configuration problems (#175, #178)
* Administrator panel redirect loops and session handling issues (#203, #204)
* Testimonial invitation, expiration, and redirection bugs (#207–209, #216, #217)
* Production caching issues affecting testimonial updates (#211)

### ⚙️ Developer Experience

* GitHub Actions workflow support for monorepo deployments (#219–222)
* Improved documentation, guides, and CMS administration resources (#117, #119, #214)
* Resend mail service integration for transactional emails (#154, #181)

### 📝 Documentation

* Added User Management Control Guide (#214)
* Added Bootstrap Documentation Guide (#119)
* Added Mermaid Graph Editor Guide (#117)
* Expanded project and platform documentation drafts (#123)

### 🚀 Highlights
This release transforms PortfolioV2 into a CMS-driven platform with integrated authentication, content management, testimonial moderation, blog publishing capabilities, and a scalable Supabase + Prisma backend architecture.


### 📓 Changelog for PortfolioV2
### 🏷️ [1.0.1] – 2026-03-25 — Personal Platform improvements and bug fixes

### 🐛 Fixed
- Mobile documentation navbar link broken (#83)
- Typing terminal scroll issue on mobile (#85)
- "On break" badge broken in mobile tabs (#86)
- Disarranged landing page icons on mobile (#87)
- Typo in footer Vercel link (#90)

### ✨ Added / Enhanced
- Custom favicon (#84)
- Arrow/swipe navigation in Featured Projects on mobile (#88)
- Pagination dots under Featured Projects (#89)
- Autoplay in Featured Projects cards (#97)
- Small progress indicator in pagination (#98)
- Demo button enabled for Featured Projects (#99)
- "Coming Soon" disabled button for undeployed projects (#100)

### 📝 Documentation
- New blog on converting a repo to monorepo (#92)
- Updated app development documentation for v1.0.1 (#93)

---

### 🚀 [1.0.0] – 2026-03-22 — Personal Platform Launch
### ✨ What's Included

### Added
- Full release of the personal portfolio platform as a system-focused engineering hub
- New platform sections:
 - How I Think
 - Project Case Studies
 - Experimental Lab
 - Current Learning
- System Design Showcase for architecture patterns and technical thinking
- Skeleton loading states for projects and system design pages
- Integration with live documentation platform
- Vercel Analytics for usage insights

### Improved
- Complete UI/UX overhaul with a unified design system
- Consistent and reusable card components across all sections
- Enhanced color palette and visual hierarchy
- Improved responsiveness across mobile and desktop
- Refactored layout and navigation structure
- Smoother animations and staggered motion effects
- Enhanced hover interactions and micro-interactions
- Improved tech stack filtering and categorization
- Footer and About page content restructuring

### Fixed
- Resolved documentation footer link issues
- Fixed responsiveness inconsistencies on specific screen sizes

### 📌 Notes
- Official transition from a static portfolio into a dynamic personal platform
- Establishes a foundation for continuous iteration beyond v1.0.0
- Marks a milestone toward building a system design–driven developer identity

---

# CHANGELOG

### 🚀 [0.8.0] – 2026-03-18 - Projects, GitHub Integration & UI Expansion
### ✨ What's Included

### Added

Projects page with GitHub repository synchronization

Repository insights per project:

*Last updated timestamp

*Latest commit reference

*Stars and forks counter

*Direct “View Repository” access

Tech stack reader for each project card

Contact page with bento-style layout

UI icons integration in Docusaurus documentation

### Improved

Reusable card system adapted from system design to project cards

Hover interaction now pauses card animations

System design page with staggered tech stack animations

Consistency across UI components and layouts

Animation smoothness and interaction responsiveness

### Notes

Major step toward a fully dynamic and data-driven portfolio platform

Strengthens GitHub as a single source of truth for project data

Continued progress toward v1.0.0 release with expected release of the web app Personal Platform

---

### 🚧 [0.7.0] – 2026-03-11 - Documentation & Interaction Update

### ✨ What's Included

### Added

Demo documentation page with animated platform demonstrations

GIF recordings for platform features:

*Feature card automation

*Platform navigation

*System design section

*Documentation navigation

*Automated feature card rotation on the homepage

*Hover-based animation pause for feature cards

### Improved

*Documentation sidebar navigation structure

*Documentation content organization and flow

*Homepage interactive behavior

*Visual feedback when interacting with feature cards

*Featured project card interactions

### Notes

Transition toward a public-facing portfolio platform showcase

Preparatory milestone for the upcoming v1.0.0 release

---

### 🚧 [0.5.0] – 2026-03-09 – Documentation Release

### Added

*Initial project documentation

*Portfolio project structure overview

*Setup and usage instructions

*Development direction for the repository

### Notes

Foundation release focused on documentation

Preparation for upcoming portfolio implementation
