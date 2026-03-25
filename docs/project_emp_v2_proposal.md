---
name: eMP v2.0 Project Proposal (Dokumen 1)
description: Full project proposal for e-Mahkamah Perusahaan v2.0 - 13 modules, architecture, tech stack, security, UI prototypes for Malaysian Industrial Court digital platform
type: project
---

# eMP v2.0 - Cadangan Pembangunan Projek

## Ringkasan Eksekutif

eMP v2.0 is a full rebuild of the e-Mahkamah Perusahaan (e-Industrial Court Malaysia) platform — a digital judiciary platform unifying public users, internal staff, disputing parties, and system admins into one modern, secure, scalable ecosystem.

**Why:** Replace fragmented legacy systems (eIC, eICx, e-Filing, public portal) with a unified platform covering end-to-end court processes: case registration, document management, mentions, scheduling, proceedings, award issuance, smart search, and management reporting.

**How to apply:** All frontend prototyping must follow the 13-module structure below with consistent UX patterns, bilingual support (BM/BI), and role-based access.

---

## 4 Objektif Utama

1. **Pemusatan akses & identiti** — Single entry point, MyDigital ID integration, role-based landing, MFA
2. **Pengukuhan operasi teras** — 13 clear domain modules
3. **Peningkatan keselamatan** — SSDLC, RBAC, audit trail, encryption, SPA
4. **Asas teknologi fleksibel** — API-ready, scalable, future-proof

---

## 13 Modul eMP v2.0

### Modul 1: Portal eMP
- **Fungsi:** Landing page rasmi MPM. Carian kes, jadual, award, pengumuman, pautan perkhidmatan digital. Dwi bahasa.
- **Pengguna:** Pengguna awam, pihak bertikai, peguam, panel member, warga MPM
- **Keupayaan:** Carian awam bersepadu, paparan statistik & pengumuman, integrasi CMS, dwi bahasa BM/BI, WAI accessibility, caching kandungan awam
- **Konfigurasi:** Banner & pengumuman, kategori kandungan, menu navigasi, tag SEO/metadata, revision history
- **Keselamatan:** WAF, rate limiting, TLS, anti-bot/captcha, CMS role-based access

### Modul 2: Pengurusan Akses Berpusat
- **Fungsi:** Gerbang tunggal log masuk. SSO, role-based access, MyDigital ID integration.
- **Pengguna:** Pengguna dalaman, pengguna luaran, pentadbir, integrasi sistem
- **Keupayaan:** Single entry point, federasi identiti, SSO/session management, delegation, password policy, self-service unlock/reset
- **Konfigurasi:** Polisi kata laluan, polisi MFA, session timeout, role mapping, login banner/alert
- **Keselamatan:** RBAC/ABAC, MFA, device & session governance, audit trail login, account lockout/anomaly detection
- **Aliran:** Pilih kategori akses → pengesahan identiti (MyDigital ID / akaun dalaman) → MFA → muat peranan → papan pemuka

### Modul 3: Pengurusan Notis
- **Fungsi:** Halaman kerja utama — carian, tugasan, peringatan, senarai kes baharu, item tindakan mengikut access right.
- **Pengguna:** Pendaftar, Penolong Pendaftar, PA, penghantar notis, pegawai operasi
- **Keupayaan:** To-do list berasaskan peranan, peringatan SLA, queue kes baharu, notice engine, search & sort, dashboard harian
- **Konfigurasi:** Template notis, tarikh cut-off, trigger peringatan, kategori tugas, escalation rules
- **Keselamatan:** Least privilege, audit setiap tindakan, masking data tertentu, notis digital bertanda masa

### Modul 4: e-Filing & e-Services
- **Fungsi:** Pemfailan dan perkhidmatan digital untuk pengguna luar — muat naik dokumen secara dalam talian.
- **Pengguna:** Peguam, penuntut, responden, panel member, pengguna luar berdaftar
- **Keupayaan:** Wizard filing, draft auto-save, document upload, validation, status tracking, notification/acknowledgement
- **Konfigurasi:** Jenis kes, medan wajib, jenis lampiran, saiz fail maksimum, template akuan terima
- **Keselamatan:** Upload scanning, encrypted transfer, captcha & throttling, access per case, checksum dokumen
- **Aliran:** Daftar/log masuk → pilih jenis pemfailan → borang berperingkat → muat naik dokumen → semak ringkasan → serah & jejak status

### Modul 5: e-Sebutan (e-Mention)
- **Fungsi:** Sebutan mahkamah atas talian via chatting. Rekod interaksi boleh diaudit. Dwi bahasa.
- **Pengguna:** Pengerusi, Pendaftar, pihak-pihak bertikai, jurubahasa
- **Keupayaan:** Chat session, presence confirmation, time-stamped log, auto summary assisted, document share, decision capture
- **Konfigurasi:** Template keputusan, polisi kehadiran, masa mula/tamat, retention sesi, pautan bahasa
- **Keselamatan:** Authenticated participants, audit trail chat, read-only archive, MFA for chair/admin, controlled file sharing
- **Aliran:** Sesi dicipta dari jadual → peserta sahkan kehadiran → perbualan/arahan direkod → keputusan dirumus → notis susulan dijana

### Modul 6: Jadual Mahkamah
- **Fungsi:** Kalendar pengurusan perbicaraan dan sebutan — hari/minggu/bulan untuk setiap mahkamah.
- **Pengguna:** Pendaftar, Penolong Pendaftar, Pengerusi, PA, pengguna awam terpilih
- **Keupayaan:** Calendar views, conflict detection, resource scheduling, public/private views, filter by court/room/chair, sync with digital signage
- **Konfigurasi:** Bilik mahkamah, jenis slot, working hours, holiday calendar, booking rules
- **Keselamatan:** Role-based edit rights, public view masking, audit perubahan jadual, concurrency control

### Modul 7: Paparan Kandungan Digital Elektronik
- **Fungsi:** Digital signage — monitor depan bilik mahkamah & skrin LED. Dikawal berpusat.
- **Pengguna:** Pentadbir kandungan, pegawai operasi, orang awam di premis
- **Keupayaan:** Template signage, playlist/rotation, real-time schedule sync, device grouping, health monitoring, fallback offline mode
- **Konfigurasi:** Layout skrin, tema warna, kumpulan peranti, refresh interval, ticker messages
- **Keselamatan:** Whitelist device, signed content package, operator role separation, device status log

### Modul 8: Carian Pintar (Award)
- **Fungsi:** Platform carian award digital — semantic search, full-text, tokenization, stemming, vector search.
- **Pengguna:** Pengguna dalaman, penyelidik kes, pengerusi, pendaftar, pegawai rujukan
- **Keupayaan:** Semantic retrieval, full-text + stemming, metadata filters, highlighted snippets, saved search, RAG-ready architecture
- **Konfigurasi:** Tokenization language packs, vector indexing schedule, ranking weights, access scope, snippet length
- **Keselamatan:** Access control by role, sensitive content masking, prompt/query logging, rate control, search audit trail
- **Tech:** PostgreSQL + pgvector untuk full-text + vector retrieval. MySQL tetap source of truth.

### Modul 9: Pendaftaran Kes
- **Fungsi:** Proses pendaftaran kes baharu. Integrasi JPPM. Auto-assignment berdasarkan beban kerja untuk kelulusan YDP.
- **Pengguna:** Pendaftar, Penolong Pendaftar, YDP, pegawai integrasi
- **Keupayaan:** JPPM integration, auto-assignment suggestion, duplicate check, case creation, approval workflow, data validation
- **Konfigurasi:** Agihan rules, load balancing weights, case categories, approval thresholds, reference data mappings
- **Keselamatan:** Maker-checker, audit kelulusan, role segregation, API authentication, data reconciliation log
- **Aliran:** Data JPPM/input manual → semak & lengkapkan metadata → sistem cadang agihan → kelulusan YDP → kes diwujudkan

### Modul 10: Pengurusan Kes
- **Fungsi:** Modul teras — keseluruhan proses kes sehingga selesai. Prosiding, tindakan, dokumen, keputusan, minit, status.
- **Pengguna:** YDP, Pengerusi, Pendaftar, AR, PA, jurubahasa, pentadbir
- **Keupayaan:** Case 360 view, timeline, tasking, document linking, decision tracking, lifecycle management
- **Konfigurasi:** Status kes, case templates, SLA milestones, task categories, retention settings
- **Keselamatan:** Fine-grained access, immutable timeline, document access rules, audit setiap transaksi, approval controls
- **Aliran:** Kes didaftarkan → timeline & tugas diwujudkan → dokumen/minit/arahan dikemaskini → jadual & sebutan diselaraskan → keputusan/award direkod → kes ditutup

### Modul 11: Perjanjian Kolektif
- **Fungsi:** Pengurusan perjanjian kolektif — pendaftaran, semakan, tindakan, keputusan, arkib.
- **Pengguna:** Unit Perjanjian Kolektif, Pendaftar, pegawai sokongan, pentadbir terhad
- **Keupayaan:** Workflow khusus CA, metadata agreement, document validation, status board, archive & retrieval, case linkage
- **Konfigurasi:** Jenis perjanjian, template dokumen, semakan checklist, approval route, retention rules
- **Keselamatan:** Restricted access, approval log, document versioning, read-only archive

### Modul 12: Dashboard dan Laporan
- **Fungsi:** Laporan dan analitik — statistik kes, KPI, eksport fleksibel.
- **Pengguna:** Pengurusan MPM, YDP, pengerusi, pendaftar, pegawai analitik
- **Keupayaan:** KPI dashboard, ad-hoc filter, drill-down, export PDF/Excel, scheduled report, performance monitoring
- **Konfigurasi:** Definisi KPI, schedule report, access scopes, visualization options, threshold alerts
- **Keselamatan:** Row-level security, masking data sensitif, report download audit, controlled sharing

### Modul 13: Pentadbir Sistem
- **Fungsi:** Operasi dalaman — pengguna, peranan, parameter, templat, integrasi, audit, tetapan teknikal.
- **Pengguna:** Pentadbir sistem, pasukan aplikasi, operasi teknikal
- **Keupayaan:** User & role admin, master data, template admin, integration settings, feature toggles, audit & housekeeping
- **Konfigurasi:** Role catalog, master lookup, API keys, job schedules, notification templates
- **Keselamatan:** Mandatory MFA, break-glass account control, dual-control for critical changes, config audit trail, secrets management

---

## Persona Pengguna & Matriks Akses

| Persona | Portal Awam | Carian Award | Pendaftaran Kes | Pengurusan Kes | Admin |
|---|---|---|---|---|---|
| Pengguna Awam | Lihat | Tiada | Tiada | Tiada | Tiada |
| Pihak Bertikai / Peguam | Terhad | Tiada | Terhad (e-Filing) | Terhad (kes sendiri) | Tiada |
| Pendaftar / AR | Penuh dalaman | Terhad | Penuh | Penuh | Tiada |
| Pengerusi / YDP | Penuh dalaman | Penuh | Semakan/kelulusan | Penuh | Tiada |
| Pentadbir Sistem | Penuh dalaman | Terhad | Terhad | Terhad | Penuh |

---

## Prinsip UX / Design System

1. **Identiti rekod & konteks proses sentiasa jelas** — header konteks pada setiap skrin
2. **Tindakan utama dekat maklumat relevan** — kurangkan masa pencarian
3. **Mesej sistem ringkas & membimbing** — bukan bersifat teknikal
4. **Dwi bahasa** (BM/BI) seluruh modul
5. **WAI accessibility** compliance
6. **Responsive** — desktop, laptop, tablet, telefon pintar
7. **Komponen standard:** header konteks, bar carian, panel penapis, butang tindakan utama, jadual responsif, chips status, timeline, kotak notis

Setiap modul mempunyai 5 komponen antaramuka standard:
1. Header konteks & identiti
2. Carian / penapis
3. Panel kerja utama
4. Ruang tindakan & keputusan
5. Jejak status & notifikasi

---

## Tech Stack

| Komponen | Teknologi |
|---|---|
| Backend | PHP 8.3, Laravel 12 LTS |
| Frontend | JavaScript/TypeScript, Vue.js 3 |
| Server rendering | Blade / Livewire / Inertia (mengikut keputusan) |
| DB Transaksi | MySQL Enterprise (prod), MySQL CE (staging) |
| DB Carian Pintar | PostgreSQL + pgvector |
| Cache/Queue | Redis |
| Web Server | Nginx |
| Load Balancer | HAProxy |
| Object Storage | MinIO |
| CI/CD | GitLab CE, CI/CD Runner |
| Code Quality | SonarQube |
| Security | OWASP ZAP, Dependabot, ClamAV, Wazuh |
| OCR | Tesseract OCR |
| Text Extraction | Apache Tika |
| Monitoring | Prometheus + Grafana |
| Container (dev) | Docker/Podman |

---

## NFR Sasaran

| Kategori | Sasaran |
|---|---|
| Availability | >= 95% |
| Performance | Loading paparan utama <= 5 saat |
| Concurrency | >= 1,000 concurrent users (portal) |
| Security | MFA, audit trail, encryption, malware scan, SPA |
| Usability | Responsive, dwi bahasa, WAI accessibility |
| Interoperability | API-ready, REST/SOAP/SFTP |

---

## Integrasi Utama

| Sistem | Tujuan | Corak |
|---|---|---|
| JPPM | Data rujukan / kes baharu | REST/SOAP/API |
| MyDigital ID | Pengesahan identiti / federasi | OIDC/SAML |
| MyGovUC / Mail Relay | Notifikasi emel / OTP | SMTP relay/API |
| Sistem Agensi Lain | Perkongsian data dua hala | REST/Batch/SFTP |

---

## Migrasi Data

| Objek | Sumber | Kaedah |
|---|---|---|
| Pengguna & peranan | eIC/e-Filing | Extract + standardize + map role |
| Data kes & pihak | eIC | ETL + data cleansing + dedup |
| Jadual & prosiding | eIC | Transform + load + reconcile |
| Perjanjian kolektif | eIC | Transform khusus domain |
| Award searchable PDF | Fizikal & digital | Scan/OCR/redact/upload/index |

---

## Jadual Pelaksanaan

| Milestone | Tempoh | Hasil |
|---|---|---|
| M1 - Mobilisasi | Jun 2026 | Kick-off, PPP, tadbir urus |
| M2 - URS/BRS | Ogos-Okt 2026 | Keperluan pengguna dimuktamadkan |
| M3 - SDS/Arkitektur | Nov 2026 - Jan 2027 | Reka bentuk sistem dimuktamadkan |
| M4 - Pembangunan Wave 1-2 | Jan - Ogos 2027 | Modul teras awal |
| M5 - Wave 3-4 + Integrasi | Sep 2027 - Feb 2028 | Modul lanjutan, migrasi, API |
| M6 - UAT/PAT/Latihan | Feb - Apr 2028 | Pengujian & latihan |
| M7 - Go-Live / FAT / SPA | Apr - Mei 2028 | Go-live & pentauliahan |
| M8 - Waranti & PIR | Jun 2028 - Mei 2029 | Hypercare, SLA, fine tuning |

---

## KPI Kejayaan

| Indikator | Sasaran |
|---|---|
| Ketersediaan sistem | >= 95% |
| Loading time | <= 5 saat |
| Concurrent users | >= 1,000 |
| Ketepatan migrasi | >= 99.5% |
| Defect kritikal sebelum UAT | 100% ditutup |
| Adopsi pengguna (3 bulan) | >= 85% |
| Ketepatan carian pintar | Meningkat vs keyword-only |
