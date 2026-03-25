<script setup lang="ts">
import PortalLayout from "@/layouts/PortalLayout.vue";
import {
  Search,
  FileText,
  Calendar,
  Scale,
  ArrowRight,
  Bell,
  Shield,
  Users,
  Clock,
  CheckCircle2,
  Briefcase,
  TrendingUp,
  Award,
  Gavel,
} from "lucide-vue-next";

const announcements = [
  { id: 1, title: "Notis Penutupan Pejabat Hari Wilayah Persekutuan", date: "2026-02-01", tag: "Notis" },
  { id: 2, title: "Jadual Operasi Mahkamah Perusahaan Sepanjang Bulan Mac 2026", date: "2026-02-28", tag: "Jadual" },
  { id: 3, title: "Permohonan e-Filing Kini Dibuka untuk Kes Trade Dispute", date: "2026-03-10", tag: "e-Filing" },
  { id: 4, title: "Taklimat Sistem eMP v2.0 untuk Peguam Berdaftar", date: "2026-03-20", tag: "Taklimat" },
];

const stats = [
  { label: "Kes Didaftarkan", value: "1,247", icon: Briefcase, color: "text-blue-600 bg-blue-50" },
  { label: "Kes Diselesaikan", value: "892", icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50" },
  { label: "Award Dikeluarkan", value: "634", icon: Award, color: "text-violet-600 bg-violet-50" },
  { label: "Purata Penyelesaian", value: "142 hari", icon: Clock, color: "text-amber-600 bg-amber-50" },
];

const services = [
  { icon: FileText, title: { bm: "e-Filing", en: "e-Filing" }, desc: { bm: "Failkan dokumen dan permohonan kes secara dalam talian", en: "File case documents and applications online" }, to: "/portal/efiling", img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop" },
  { icon: Search, title: { bm: "Carian Kes", en: "Case Search" }, desc: { bm: "Semak status dan maklumat kes mahkamah", en: "Check court case status and information" }, to: "/portal/carian", img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=250&fit=crop" },
  { icon: Calendar, title: { bm: "Jadual Mahkamah", en: "Court Schedule" }, desc: { bm: "Lihat jadual perbicaraan dan sebutan terkini", en: "View latest hearing and mention schedules" }, to: "/portal/jadual", img: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&h=250&fit=crop" },
  { icon: Scale, title: { bm: "Carian Award", en: "Award Search" }, desc: { bm: "Cari dan muat turun award Mahkamah Perusahaan", en: "Search and download Industrial Court awards" }, to: "/portal/award", img: "https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?w=400&h=250&fit=crop" },
];

const features = [
  { icon: Shield, title: { bm: "Selamat & Terjamin", en: "Secure & Reliable" }, desc: { bm: "Dilindungi dengan enkripsi dan pengesahan dua faktor", en: "Protected with encryption and two-factor authentication" } },
  { icon: Users, title: { bm: "Akses Berpusat", en: "Centralized Access" }, desc: { bm: "Satu platform untuk semua perkhidmatan mahkamah", en: "One platform for all court services" } },
  { icon: Clock, title: { bm: "24/7 Dalam Talian", en: "24/7 Online" }, desc: { bm: "Akses perkhidmatan pada bila-bila masa, di mana sahaja", en: "Access services anytime, anywhere" } },
  { icon: TrendingUp, title: { bm: "Proses Lebih Cekap", en: "Efficient Processing" }, desc: { bm: "Proses digital mengurangkan masa dan kos pemfailan", en: "Digital process reduces filing time and cost" } },
];

const latestAwards = [
  { no: "Award No. 234/2026", case: "MPM/4/2-0567/2025", title: "Muthu a/l Rajan lwn. JKL Enterprises Sdn Bhd", date: "15 Dis 2025", type: "Pembuangan Tidak Adil" },
  { no: "Award No. 189/2025", case: "MPM/4/2-0322/2025", title: "Siti Fatimah binti Mohd lwn. PQR Manufacturing", date: "20 Sep 2025", type: "Pembuangan Tidak Adil" },
  { no: "Award No. 102/2025", case: "MPM/4/2-0199/2024", title: "Kesatuan Pekerja Kelapa Sawit lwn. Green Palm Bhd", date: "10 Mac 2025", type: "Pertikaian Perdagangan" },
];
</script>

<template>
  <PortalLayout v-slot="{ locale }">
    <!-- ═══════ HERO with background image ═══════ -->
    <section class="relative overflow-hidden bg-[#1a237e]">
      <!-- Background image overlay -->
      <div class="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&h=600&fit=crop"
          alt=""
          class="h-full w-full object-cover opacity-15"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-[#1a237e] via-[#1a237e]/90 to-[#283593]/80" />
      </div>

      <div class="relative mx-auto max-w-7xl px-4 py-20 sm:py-28">
        <div class="grid items-center gap-12 lg:grid-cols-2">
          <!-- Left: Text -->
          <div>
            <span class="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-300">
              <Gavel class="h-3 w-3" />
              {{ locale === 'bm' ? 'Platform Digital Rasmi' : 'Official Digital Platform' }}
            </span>
            <h1 class="mt-4 text-4xl font-bold leading-tight text-white sm:text-5xl">
              {{ locale === 'bm' ? 'Mahkamah Perusahaan' : 'Industrial Court' }}
              <br />
              <span class="text-amber-400">Malaysia</span>
            </h1>
            <p class="mt-4 max-w-lg text-lg leading-relaxed text-blue-200">
              {{ locale === 'bm'
                ? 'Akses perkhidmatan mahkamah secara digital — pemfailan kes, jadual perbicaraan, carian award dan banyak lagi.'
                : 'Access court services digitally — case filing, hearing schedules, award search and much more.' }}
            </p>
            <div class="mt-8 flex flex-wrap gap-3">
              <router-link
                to="/portal/efiling"
                class="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-amber-600 hover:shadow-xl"
              >
                <FileText class="h-4 w-4" />
                {{ locale === 'bm' ? 'Mula Memfailkan' : 'Start Filing' }}
              </router-link>
              <router-link
                to="/portal/carian"
                class="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-white/20"
              >
                <Search class="h-4 w-4" />
                {{ locale === 'bm' ? 'Cari Kes' : 'Search Cases' }}
              </router-link>
            </div>
          </div>

          <!-- Right: Search card -->
          <div class="hidden lg:block">
            <div class="rounded-2xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-sm">
              <p class="text-sm font-semibold text-white">{{ locale === 'bm' ? 'Carian Pantas' : 'Quick Search' }}</p>
              <div class="mt-3 flex overflow-hidden rounded-lg bg-white shadow-lg">
                <input
                  type="text"
                  :placeholder="locale === 'bm' ? 'Nombor kes, nama pihak, atau kata kunci...' : 'Case number, party name, or keyword...'"
                  class="flex-1 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                />
                <button class="bg-amber-500 px-5 font-medium text-white hover:bg-amber-600">
                  <Search class="h-5 w-5" />
                </button>
              </div>
              <!-- Quick stats mini -->
              <div class="mt-4 grid grid-cols-2 gap-3">
                <div class="rounded-lg bg-white/10 p-3 text-center">
                  <p class="text-2xl font-bold text-white">1,247</p>
                  <p class="text-[11px] text-blue-200">{{ locale === 'bm' ? 'Kes 2026' : 'Cases 2026' }}</p>
                </div>
                <div class="rounded-lg bg-white/10 p-3 text-center">
                  <p class="text-2xl font-bold text-white">892</p>
                  <p class="text-[11px] text-blue-200">{{ locale === 'bm' ? 'Diselesaikan' : 'Resolved' }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Wave divider -->
      <div class="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" class="w-full text-slate-50">
          <path d="M0 60V20C240 0 480 0 720 20C960 40 1200 40 1440 20V60H0Z" fill="currentColor" />
        </svg>
      </div>
    </section>

    <!-- ═══════ STATS COUNTER BAR ═══════ -->
    <section class="bg-slate-50 py-8">
      <div class="mx-auto max-w-7xl px-4">
        <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div v-for="stat in stats" :key="stat.label" class="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg" :class="stat.color">
              <component :is="stat.icon" class="h-6 w-6" />
            </div>
            <div>
              <p class="text-2xl font-bold text-slate-900">{{ stat.value }}</p>
              <p class="text-xs text-slate-500">{{ stat.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════ SERVICES with stock images ═══════ -->
    <section class="py-16">
      <div class="mx-auto max-w-7xl px-4">
        <div class="text-center">
          <h2 class="text-2xl font-bold text-slate-900 sm:text-3xl">
            {{ locale === 'bm' ? 'Perkhidmatan Digital' : 'Digital Services' }}
          </h2>
          <p class="mx-auto mt-2 max-w-xl text-sm text-slate-500">
            {{ locale === 'bm'
              ? 'Akses semua perkhidmatan Mahkamah Perusahaan Malaysia secara dalam talian'
              : 'Access all Industrial Court of Malaysia services online' }}
          </p>
        </div>
        <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <router-link
            v-for="svc in services"
            :key="svc.title.bm"
            :to="svc.to"
            class="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div class="relative h-40 overflow-hidden">
              <img
                :src="svc.img"
                :alt="svc.title[locale]"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div class="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white/90 shadow-sm backdrop-blur">
                <component :is="svc.icon" class="h-5 w-5 text-[#1a237e]" />
              </div>
            </div>
            <div class="p-4">
              <h3 class="font-semibold text-slate-900">{{ svc.title[locale] }}</h3>
              <p class="mt-1 text-sm text-slate-500">{{ svc.desc[locale] }}</p>
              <div class="mt-3 flex items-center gap-1 text-sm font-medium text-[#1a237e] transition-colors group-hover:text-amber-600">
                {{ locale === 'bm' ? 'Selanjutnya' : 'Learn more' }}
                <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- ═══════ WHY eMP FEATURES ═══════ -->
    <section class="bg-[#f8fafc] py-16">
      <div class="mx-auto max-w-7xl px-4">
        <div class="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 class="text-2xl font-bold text-slate-900 sm:text-3xl">
              {{ locale === 'bm' ? 'Mengapa eMP v2.0?' : 'Why eMP v2.0?' }}
            </h2>
            <p class="mt-3 text-sm leading-relaxed text-slate-500">
              {{ locale === 'bm'
                ? 'Platform eMP v2.0 direka bentuk untuk memudahkan urusan mahkamah perusahaan bagi semua pihak — pekerja, majikan, peguam dan pegawai mahkamah.'
                : 'The eMP v2.0 platform is designed to simplify industrial court processes for all parties — workers, employers, lawyers and court officers.' }}
            </p>
            <div class="mt-8 grid gap-4 sm:grid-cols-2">
              <div v-for="feat in features" :key="feat.title.bm" class="flex gap-3">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1a237e]/10 text-[#1a237e]">
                  <component :is="feat.icon" class="h-5 w-5" />
                </div>
                <div>
                  <h4 class="text-sm font-semibold text-slate-900">{{ feat.title[locale] }}</h4>
                  <p class="mt-0.5 text-xs text-slate-500">{{ feat.desc[locale] }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="relative hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=450&fit=crop"
              alt="Court collaboration"
              class="rounded-2xl shadow-xl"
            />
            <div class="absolute -bottom-4 -left-4 rounded-xl bg-white p-4 shadow-lg">
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle2 class="h-5 w-5" />
                </div>
                <div>
                  <p class="text-sm font-bold text-slate-900">95%</p>
                  <p class="text-[11px] text-slate-500">{{ locale === 'bm' ? 'Ketersediaan Sistem' : 'System Uptime' }}</p>
                </div>
              </div>
            </div>
            <div class="absolute -right-4 -top-4 rounded-xl bg-white p-4 shadow-lg">
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <Users class="h-5 w-5" />
                </div>
                <div>
                  <p class="text-sm font-bold text-slate-900">1,000+</p>
                  <p class="text-[11px] text-slate-500">{{ locale === 'bm' ? 'Pengguna Serentak' : 'Concurrent Users' }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════ LATEST AWARDS ═══════ -->
    <section class="py-16">
      <div class="mx-auto max-w-7xl px-4">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-bold text-slate-900">
            {{ locale === 'bm' ? 'Award Terkini' : 'Latest Awards' }}
          </h2>
          <router-link to="/portal/award" class="flex items-center gap-1 text-sm font-medium text-[#1a237e] hover:text-amber-600">
            {{ locale === 'bm' ? 'Lihat semua' : 'View all' }}
            <ArrowRight class="h-4 w-4" />
          </router-link>
        </div>
        <div class="mt-6 grid gap-4 md:grid-cols-3">
          <div
            v-for="aw in latestAwards"
            :key="aw.no"
            class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <span class="rounded-full bg-[#1a237e]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#1a237e]">{{ aw.no }}</span>
            <h3 class="mt-3 font-semibold text-slate-900">{{ aw.title }}</h3>
            <p class="mt-1 text-xs text-slate-400">{{ aw.case }}</p>
            <div class="mt-3 flex items-center justify-between text-xs">
              <span class="rounded-full bg-slate-100 px-2 py-0.5 text-slate-500">{{ aw.type }}</span>
              <span class="text-slate-400">{{ aw.date }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════ ANNOUNCEMENTS ═══════ -->
    <section class="bg-white py-16">
      <div class="mx-auto max-w-7xl px-4">
        <h2 class="text-2xl font-bold text-slate-900">
          {{ locale === 'bm' ? 'Pengumuman' : 'Announcements' }}
        </h2>
        <div class="mt-6 grid gap-4 sm:grid-cols-2">
          <div
            v-for="ann in announcements"
            :key="ann.id"
            class="flex items-start gap-4 rounded-xl border border-slate-200 bg-slate-50/50 p-5 transition-colors hover:bg-slate-50"
          >
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
              <Bell class="h-5 w-5" />
            </div>
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-2">
                <span class="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-700">{{ ann.tag }}</span>
                <span class="text-xs text-slate-400">{{ ann.date }}</span>
              </div>
              <p class="mt-1.5 font-medium text-slate-900">{{ ann.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════ CTA BANNER ═══════ -->
    <section class="relative overflow-hidden bg-[#1a237e] py-16">
      <div class="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=400&fit=crop"
          alt=""
          class="h-full w-full object-cover opacity-10"
        />
      </div>
      <div class="relative mx-auto max-w-7xl px-4 text-center">
        <h2 class="text-2xl font-bold text-white sm:text-3xl">
          {{ locale === 'bm' ? 'Sedia untuk memulakan?' : 'Ready to get started?' }}
        </h2>
        <p class="mx-auto mt-3 max-w-lg text-blue-200">
          {{ locale === 'bm'
            ? 'Daftar akaun dan mula menggunakan perkhidmatan e-Filing Mahkamah Perusahaan Malaysia.'
            : 'Register an account and start using the Industrial Court of Malaysia e-Filing services.' }}
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link
            to="/portal/efiling"
            class="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-amber-600 hover:shadow-xl"
          >
            <FileText class="h-4 w-4" />
            {{ locale === 'bm' ? 'Daftar & Failkan Kes' : 'Register & File Case' }}
          </router-link>
          <router-link
            to="/portal/faq"
            class="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-white/20"
          >
            {{ locale === 'bm' ? 'Soalan Lazim' : 'FAQ' }}
          </router-link>
        </div>
      </div>
    </section>
  </PortalLayout>
</template>
