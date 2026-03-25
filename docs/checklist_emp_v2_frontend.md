---
name: eMP v2.0 Frontend Mockup Checklist
description: Master checklist for building all 13 eMP v2.0 module UI mockups — tracks completion of foundation, views, components, routing, and menu restructure
type: project
---

# eMP v2.0 Frontend UI Mockup — Master Checklist

> **Type:** UI mockup only. No API calls. All data hardcoded/static.
> **Tech:** Vue 3 + TypeScript + Tailwind CSS, `<script setup lang="ts">`
> **All view paths relative to `client/src/`

---

## Wave 0: Foundation

- [x] **0.1** Add eMP domain types to `types.ts`
- [x] **0.2** Create shared components (`components/`)
- [x] **0.3** Create `layouts/PortalLayout.vue`
- [x] **0.4** Restructure `config/admin-menu.ts`
- [x] **0.5** Add routes to `router/index.ts`
- [x] **0.6** Fix AdminLayout wrapper on all 33 admin views
- [x] **0.7** Fix kitchen sink compliance (card headers, buttons, inputs, badges)
- [x] **0.8** Fix sidebar menu highlight (isActive longest-prefix matching)
- [x] **0.9** Fix route ordering (static before dynamic :id)

---

## Wave 1: Portal + Access + Dashboard + Admin

### Module 1: Portal eMP
- [x] `views/portal/PortalHomeView.vue` — landing, hero, search, services, stats, announcements
- [x] `views/portal/PortalSearchView.vue` — case search + results table
- [x] `views/portal/PortalScheduleView.vue` — court schedule + calendar
- [x] `views/portal/PortalAwardsView.vue` — award search + results

### Module 2: Pengurusan Akses Berpusat
- [x] `views/auth/LoginGatewayView.vue` — SSO gateway, MyDigital ID, role selector
- [x] `views/auth/MfaVerifyView.vue` — OTP entry mockup

### Module 12: Dashboard dan Laporan
- [x] `views/laporan/EmpDashboardView.vue` — KPI dashboard, stat cards, charts
- [x] `views/laporan/ReportsListView.vue` — report templates grid
- [x] `views/laporan/ReportDetailView.vue` — ad-hoc report with filters

### Module 13: Pentadbir Sistem
- [x] `views/admin/MasterDataView.vue` — courts, venues, case types (tabbed)
- [x] `views/admin/TemplateAdminView.vue` — notice/letter templates
- [x] `views/admin/IntegrationSettingsView.vue` — MyDigital ID, JPPM, SMS config
- [x] `views/admin/FeatureTogglesView.vue` — feature flags with toggles
- [x] `views/admin/HousekeepingView.vue` — archival, cleanup, cache

---

## Wave 2: Case Lifecycle

### Module 3: Pengurusan Notis
- [x] `views/notis/NotisWorkDashboardView.vue` — task dashboard, SLA alerts, queue
- [x] `views/notis/NotisSettingsView.vue` — notice engine config

### Module 4: e-Filing & e-Services
- [x] `views/efiling/EfilingListView.vue` — filing list, status filters
- [x] `views/efiling/EfilingWizardView.vue` — 5-step wizard
- [x] `views/efiling/EfilingStatusView.vue` — filing status tracking
- [x] `views/efiling/EfilingReviewView.vue` — internal review interface

### Module 9: Pendaftaran Kes
- [x] `views/kes/KesDaftarListView.vue` — registration queue
- [x] `views/kes/KesDaftarFormView.vue` — registration form, JPPM lookup
- [x] `views/kes/KesDaftarApprovalView.vue` — YDP approval workflow

### Module 10: Pengurusan Kes
- [x] `views/kes/KesListView.vue` — case list, advanced filters
- [x] `views/kes/KesDetailView.vue` — 360° case view with tabs
- [x] `views/kes/KesTimelineView.vue` — full timeline
- [x] `views/kes/KesTaskingView.vue` — task assignment per case

---

## Wave 3: Specialized Modules

### Module 5: e-Sebutan
- [x] `views/sebutan/SebutanListView.vue` — mention sessions list
- [x] `views/sebutan/SebutanSessionView.vue` — chat interface, presence, decisions
- [x] `views/sebutan/SebutanSummaryView.vue` — post-session summary

### Module 6: Jadual Mahkamah
- [x] `views/jadual/JadualCalendarView.vue` — calendar, conflict detection
- [x] `views/jadual/JadualEventEditorView.vue` — event create/edit form

### Module 7: Paparan Kandungan Digital
- [x] `views/signage/SignageDashboardView.vue` — device status grid
- [x] `views/signage/SignagePlaylistView.vue` — playlist editor
- [x] `views/signage/SignagePreviewView.vue` — full-screen preview

### Module 8: Carian Pintar (Award)
- [x] `views/carian/CarianSearchView.vue` — search UI, filters, snippets
- [x] `views/carian/CarianDetailView.vue` — award detail, metadata sidebar

### Module 11: Perjanjian Kolektif
- [x] `views/ca/CaListView.vue` — CA list, status filters
- [x] `views/ca/CaDetailView.vue` — CA detail, timeline, docs
- [x] `views/ca/CaFormView.vue` — CA registration form

---

## Verification
- [x] `npm run build` passes with no errors
- [x] All 13 modules navigable via sidebar menu
- [x] Responsive layout
- [x] Portal pages render with PortalLayout
- [x] Admin pages render with AdminLayout
- [x] Kitchen sink card pattern applied consistently

---

## GAPS vs Proposal Spec

### Module 1: Portal eMP
- [ ] Perjanjian Kolektif public listing (proposal mentions CA info on portal)
- [ ] FAQ / Soalan Lazim page
- [ ] Pautan Berguna (useful links) section
- [ ] Contact form / Maklum Balas
- [ ] Accessibility statement page
- [ ] Bilangan pelawat / visitor counter

### Module 3: Pengurusan Notis
- [ ] Notice print/generation view (generate notice as PDF)
- [ ] Escalation workflow log (auto-escalation history)
- [ ] Bulk notice send view

### Module 4: e-Filing
- [ ] Public-facing e-Filing (external user view without admin sidebar — uses PortalLayout)
- [ ] Acknowledgement receipt / print view (Akuan Terima)
- [ ] Draft management (list of saved drafts with resume)

### Module 5: e-Sebutan
- [ ] Session history / archive view (past sessions browse)
- [ ] Document sharing within session (proposal: "document share")

### Module 6: Jadual Mahkamah
- [ ] Week view and Day view toggles (only month exists)
- [ ] Room/resource availability matrix view
- [ ] Holiday calendar management

### Module 8: Carian Pintar
- [ ] Portal-side public award search (currently only /admin/carian)
- [ ] Search suggestions / autocomplete
- [ ] Export search results

### Module 10: Pengurusan Kes
- [ ] Award drafting / penulisan award view
- [ ] Minit prosiding (proceedings minutes) editor
- [ ] In-browser document viewer (PDF preview)
- [ ] Case transfer / reassignment view

### Module 12: Dashboard
- [ ] Scheduled report management (create/edit schedules)
- [ ] Dashboard date range selector
- [ ] More chart types: pie chart, line chart, heatmap

### Module 13: Pentadbir Sistem
- [ ] Notification template editor with variable placeholders preview
- [ ] System health / server monitoring dashboard
- [ ] Backup status & restore management view
- [ ] API key management (generation, revocation)

---

## Cross-Module Gaps

- [ ] **Breadcrumb navigation** — proposal requires clear navigation context on every screen
- [ ] **Notification center** — bell icon dropdown in header showing recent alerts/notifications
- [ ] **User profile page** — dedicated profile view (not just user edit form)
- [ ] **Help / Knowledge Base** — proposal mentions digital knowledge base for users
- [ ] **Activity log (per user)** — "my recent activity" / "jejak aktiviti saya"
- [ ] **Print-friendly views** — proposal mentions print capability for notices, awards, reports
- [ ] **Dwi bahasa on admin side** — portal has BM/BI toggle, admin views are BM-only (proposal says all modules bilingual)

---

## Enhancement Recommendations

### UX Components to Add
- [ ] `AppBreadcrumb.vue` — breadcrumb trail, apply on all detail/form/sub-pages
- [ ] `AppLoadingSkeleton.vue` — loading placeholder for cards/tables/forms
- [ ] `AppNotificationDropdown.vue` — header notification bell with dropdown list
- [ ] `AppUserProfileCard.vue` — compact user info card for profile/sidebar
- [ ] `AppPrintView.vue` — wrapper component with print-optimized CSS

### Data & Content
- [ ] Increase mock data density (10-15 rows per table, not 5-6)
- [ ] Add "last updated" timestamps on dashboard cards
- [ ] Add totals/summaries on all list views ("Jumlah: 342 kes")
- [ ] Add date range filters on all chart/analytics views

### Visual Polish
- [ ] Hover animations on cards (subtle translateY -1px + shadow)
- [ ] Status dot indicators on sidebar menu items (urgent count badges)
- [ ] Avatar/initials component for user displays (chairman, parties, actors)
- [ ] Progress bar on case lifecycle (percentage completion indicator)
- [ ] Micro-interactions: success checkmark animation on form submit

### Module-Specific Enhancements
- [ ] **Portal**: Hero banner slideshow, latest awards carousel, event countdown
- [ ] **e-Sebutan**: Typing indicator, unread count badge, countdown to session end
- [ ] **Jadual**: Week/day view toggle buttons, drag-to-create on calendar
- [ ] **Carian**: Search history panel, query suggestions, relevance explanation tooltip
- [ ] **Kes Detail**: Side-by-side case comparison, bulk actions dropdown on list
- [ ] **Dashboard**: Export as PDF button, customizable widget layout, auto-refresh toggle
- [ ] **Signage Preview**: Multiple layout templates (2-column, ticker-only, full-schedule)

---

## Summary

| Category | Count | Status |
|---|---|---|
| Foundation items | 9 | All done |
| Module views (38 files) | 38 | All done |
| Shared components | 12 | All done |
| New layout | 1 | Done |
| Gaps identified | ~25 | Pending |
| Enhancements proposed | ~25 | Pending |
| **Total files created** | **~51** | **Complete** |
