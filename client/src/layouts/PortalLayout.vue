<script setup lang="ts">
import { ref, nextTick } from "vue";
import { Menu, X, Globe, MessageCircle, Send, Bot, Minimize2, LogIn } from "lucide-vue-next";

const locale = ref<"bm" | "en">("bm");
const mobileMenuOpen = ref(false);

// ── Chatbot ──
const chatOpen = ref(false);
const chatInput = ref("");
const chatMessages = ref<{ role: "bot" | "user"; text: string }[]>([
  { role: "bot", text: "Selamat datang! Saya pembantu maya eMP. Bagaimana saya boleh membantu anda hari ini?" },
]);

const quickReplies = [
  { bm: "Bagaimana memfailkan kes?", en: "How to file a case?" },
  { bm: "Semak status kes saya", en: "Check my case status" },
  { bm: "Jadual mahkamah hari ini", en: "Today's court schedule" },
  { bm: "Hubungi pejabat", en: "Contact the office" },
];

const botReplies: Record<string, { bm: string; en: string }> = {
  "Bagaimana memfailkan kes?": {
    bm: "Untuk memfailkan kes, sila layari halaman e-Filing kami. Anda perlu mendaftar akaun terlebih dahulu, kemudian mengisi borang pemfailan secara dalam talian dan memuat naik dokumen sokongan.",
    en: "To file a case, please visit our e-Filing page. You need to register an account first, then fill in the filing form online and upload supporting documents.",
  },
  "Semak status kes saya": {
    bm: "Anda boleh menyemak status kes melalui halaman Carian Kes. Masukkan nombor kes atau nama pihak untuk melihat maklumat terkini.",
    en: "You can check your case status through the Case Search page. Enter the case number or party name to see the latest information.",
  },
  "Jadual mahkamah hari ini": {
    bm: "Jadual mahkamah hari ini boleh dilihat di halaman Jadual Mahkamah. Anda boleh menapis mengikut bilik mahkamah atau jenis prosiding.",
    en: "Today's court schedule can be viewed on the Court Schedule page. You can filter by court room or proceeding type.",
  },
  "Hubungi pejabat": {
    bm: "Mahkamah Perusahaan Malaysia boleh dihubungi di:\n📍 Aras 5, Blok D4, Kompleks D, Putrajaya\n📞 03-8886 5000\n📧 emp@mohr.gov.my\n\nWaktu operasi: Isnin - Jumaat, 8:00 PG - 5:00 PTG",
    en: "The Industrial Court of Malaysia can be reached at:\n📍 Level 5, Block D4, Complex D, Putrajaya\n📞 03-8886 5000\n📧 emp@mohr.gov.my\n\nOffice hours: Monday - Friday, 8:00 AM - 5:00 PM",
  },
};

function sendChat() {
  const msg = chatInput.value.trim();
  if (!msg) return;
  chatMessages.value.push({ role: "user", text: msg });
  chatInput.value = "";

  // Find matching reply or default
  const match = botReplies[msg];
  setTimeout(() => {
    chatMessages.value.push({
      role: "bot",
      text: match
        ? match[locale.value]
        : locale.value === "bm"
          ? "Terima kasih atas soalan anda. Untuk maklumat lanjut, sila hubungi pejabat kami atau layari halaman Soalan Lazim."
          : "Thank you for your question. For more information, please contact our office or visit the FAQ page.",
    });
    nextTick(() => {
      const el = document.getElementById("chat-scroll");
      if (el) el.scrollTop = el.scrollHeight;
    });
  }, 800);
}

function sendQuickReply(q: { bm: string; en: string }) {
  chatInput.value = q[locale.value];
  sendChat();
}

const navItems = [
  { label: { bm: "Utama", en: "Home" }, to: "/portal" },
  { label: { bm: "Carian Kes", en: "Case Search" }, to: "/portal/carian" },
  { label: { bm: "Jadual Mahkamah", en: "Court Schedule" }, to: "/portal/jadual" },
  { label: { bm: "Award", en: "Awards" }, to: "/portal/award" },
  { label: { bm: "e-Filing", en: "e-Filing" }, to: "/portal/efiling" },
  { label: { bm: "Soalan Lazim", en: "FAQ" }, to: "/portal/faq" },
  { label: { bm: "Hubungi", en: "Contact" }, to: "/portal/hubungi" },
];

function t(obj: { bm: string; en: string }) {
  return obj[locale.value];
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <!-- Top bar -->
    <div class="bg-[#1a237e] text-white">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs">
        <span>{{ locale === 'bm' ? 'Portal Rasmi Mahkamah Perusahaan Malaysia' : 'Official Portal of the Industrial Court of Malaysia' }}</span>
        <button class="flex items-center gap-1 rounded px-2 py-0.5 hover:bg-white/10" @click="locale = locale === 'bm' ? 'en' : 'bm'">
          <Globe class="h-3 w-3" />
          {{ locale === 'bm' ? 'EN' : 'BM' }}
        </button>
      </div>
    </div>

    <!-- Header -->
    <header class="border-b border-slate-200 bg-white shadow-sm">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div class="flex items-center gap-4">
          <!-- Jata Negara placeholder -->
          <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 text-amber-800">
            <svg class="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <h1 class="text-lg font-bold text-[#1a237e]">
              {{ locale === 'bm' ? 'Mahkamah Perusahaan Malaysia' : 'Industrial Court of Malaysia' }}
            </h1>
            <p class="text-xs text-slate-500">
              {{ locale === 'bm' ? 'Kementerian Sumber Manusia' : 'Ministry of Human Resources' }}
            </p>
          </div>
        </div>

        <!-- Desktop nav -->
        <nav class="hidden items-center gap-1 md:flex">
          <router-link
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
            active-class="bg-blue-50 text-blue-700"
          >
            {{ t(item.label) }}
          </router-link>
          <span class="mx-1 h-5 w-px bg-slate-200" />
          <router-link
            to="/portal/log-masuk"
            class="inline-flex items-center gap-1.5 rounded-lg bg-[#1a237e] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#283593]"
          >
            <LogIn class="h-4 w-4" />
            {{ locale === 'bm' ? 'Log Masuk / Daftar' : 'Login / Register' }}
          </router-link>
        </nav>

        <!-- Mobile menu button -->
        <button class="rounded-md p-2 text-slate-600 md:hidden" @click="mobileMenuOpen = !mobileMenuOpen">
          <Menu v-if="!mobileMenuOpen" class="h-6 w-6" />
          <X v-else class="h-6 w-6" />
        </button>
      </div>

      <!-- Mobile nav -->
      <div v-if="mobileMenuOpen" class="border-t border-slate-100 bg-white px-4 py-3 md:hidden">
        <router-link
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="block rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-700"
          @click="mobileMenuOpen = false"
        >
          {{ t(item.label) }}
        </router-link>
        <div class="mt-2 border-t border-slate-100 pt-2">
          <router-link
            to="/portal/log-masuk"
            class="flex items-center justify-center gap-1.5 rounded-lg bg-[#1a237e] px-4 py-2.5 text-sm font-semibold text-white"
            @click="mobileMenuOpen = false"
          >
            <LogIn class="h-4 w-4" />
            {{ locale === 'bm' ? 'Log Masuk / Daftar' : 'Login / Register' }}
          </router-link>
        </div>
      </div>
    </header>

    <!-- Main content -->
    <main>
      <slot :locale="locale" :t="t" />
    </main>

    <!-- Footer -->
    <footer class="border-t border-slate-200 bg-[#1a237e] text-white">
      <div class="mx-auto max-w-7xl px-4 py-8">
        <div class="grid gap-8 sm:grid-cols-3">
          <div>
            <h3 class="text-sm font-semibold uppercase tracking-wide text-blue-200">
              {{ locale === 'bm' ? 'Hubungi Kami' : 'Contact Us' }}
            </h3>
            <div class="mt-3 space-y-1 text-sm text-blue-100">
              <p>{{ locale === 'bm' ? 'Mahkamah Perusahaan Malaysia' : 'Industrial Court of Malaysia' }}</p>
              <p>Aras 5, Blok D4, Kompleks D</p>
              <p>Pusat Pentadbiran Kerajaan Persekutuan</p>
              <p>62530 Putrajaya</p>
            </div>
          </div>
          <div>
            <h3 class="text-sm font-semibold uppercase tracking-wide text-blue-200">
              {{ locale === 'bm' ? 'Pautan Pantas' : 'Quick Links' }}
            </h3>
            <div class="mt-3 space-y-1 text-sm">
              <router-link to="/portal/carian" class="block text-blue-100 hover:text-white">{{ locale === 'bm' ? 'Carian Kes' : 'Case Search' }}</router-link>
              <router-link to="/portal/jadual" class="block text-blue-100 hover:text-white">{{ locale === 'bm' ? 'Jadual Mahkamah' : 'Court Schedule' }}</router-link>
              <router-link to="/portal/award" class="block text-blue-100 hover:text-white">{{ locale === 'bm' ? 'Carian Award' : 'Award Search' }}</router-link>
            </div>
          </div>
          <div>
            <h3 class="text-sm font-semibold uppercase tracking-wide text-blue-200">
              {{ locale === 'bm' ? 'Dasar' : 'Policies' }}
            </h3>
            <div class="mt-3 space-y-1 text-sm">
              <p class="text-blue-100">{{ locale === 'bm' ? 'Dasar Privasi' : 'Privacy Policy' }}</p>
              <p class="text-blue-100">{{ locale === 'bm' ? 'Dasar Keselamatan' : 'Security Policy' }}</p>
              <p class="text-blue-100">{{ locale === 'bm' ? 'Penafian' : 'Disclaimer' }}</p>
            </div>
          </div>
        </div>
        <div class="mt-6 border-t border-blue-800 pt-4 text-center text-xs text-blue-200">
          &copy; {{ new Date().getFullYear() }} {{ locale === 'bm' ? 'Mahkamah Perusahaan Malaysia. Hak Cipta Terpelihara.' : 'Industrial Court of Malaysia. All Rights Reserved.' }}
        </div>
      </div>
    </footer>

    <!-- ═══════ Chatbot FAB + Panel ═══════ -->

    <!-- Floating button -->
    <button
      v-if="!chatOpen"
      class="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#1a237e] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95 animate-bounce-slow"
      @click="chatOpen = true"
    >
      <MessageCircle class="h-6 w-6" />
      <span class="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-white">1</span>
    </button>

    <!-- Chat panel -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="translate-y-4 opacity-0 scale-95"
      enter-to-class="translate-y-0 opacity-100 scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="translate-y-0 opacity-100 scale-100"
      leave-to-class="translate-y-4 opacity-0 scale-95"
    >
      <div
        v-if="chatOpen"
        class="fixed bottom-6 right-6 z-50 flex h-[480px] w-[360px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
      >
        <!-- Header -->
        <div class="flex items-center gap-3 bg-[#1a237e] px-4 py-3 text-white">
          <div class="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
            <Bot class="h-5 w-5" />
          </div>
          <div class="flex-1">
            <p class="text-sm font-semibold">{{ locale === 'bm' ? 'Pembantu Maya eMP' : 'eMP Virtual Assistant' }}</p>
            <p class="flex items-center gap-1 text-[11px] text-blue-200">
              <span class="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {{ locale === 'bm' ? 'Dalam talian' : 'Online' }}
            </p>
          </div>
          <button class="rounded-lg p-1.5 hover:bg-white/10" @click="chatOpen = false">
            <Minimize2 class="h-4 w-4" />
          </button>
        </div>

        <!-- Messages -->
        <div id="chat-scroll" class="flex-1 space-y-3 overflow-y-auto p-4">
          <div
            v-for="(msg, i) in chatMessages"
            :key="i"
            class="flex gap-2"
            :class="msg.role === 'user' ? 'flex-row-reverse' : ''"
          >
            <div
              v-if="msg.role === 'bot'"
              class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1a237e] text-white"
            >
              <Bot class="h-3.5 w-3.5" />
            </div>
            <div
              class="max-w-[75%] whitespace-pre-line rounded-2xl px-3.5 py-2 text-sm leading-relaxed"
              :class="msg.role === 'user'
                ? 'rounded-tr-sm bg-[#1a237e] text-white'
                : 'rounded-tl-sm bg-slate-100 text-slate-800'"
            >
              {{ msg.text }}
            </div>
          </div>

          <!-- Quick replies (show only at start) -->
          <div v-if="chatMessages.length <= 1" class="space-y-1.5 pt-1">
            <p class="text-[11px] font-medium text-slate-400">{{ locale === 'bm' ? 'Soalan pantas:' : 'Quick questions:' }}</p>
            <button
              v-for="q in quickReplies"
              :key="q.bm"
              class="block w-full rounded-lg border border-slate-200 px-3 py-2 text-left text-xs text-slate-600 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
              @click="sendQuickReply(q)"
            >
              {{ q[locale] }}
            </button>
          </div>
        </div>

        <!-- Input -->
        <div class="border-t border-slate-200 p-3">
          <div class="flex gap-2">
            <input
              v-model="chatInput"
              type="text"
              :placeholder="locale === 'bm' ? 'Taip mesej anda...' : 'Type your message...'"
              class="flex-1 rounded-full border border-slate-300 px-4 py-2 text-sm placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
              @keydown.enter="sendChat"
            />
            <button
              class="flex h-9 w-9 items-center justify-center rounded-full bg-[#1a237e] text-white transition-colors hover:bg-[#283593]"
              @click="sendChat"
            >
              <Send class="h-4 w-4" />
            </button>
          </div>
          <p class="mt-1.5 text-center text-[10px] text-slate-300">{{ locale === 'bm' ? 'Dikuasakan oleh AI · Bukan nasihat undang-undang' : 'Powered by AI · Not legal advice' }}</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
.animate-bounce-slow {
  animation: bounce-slow 2s ease-in-out infinite;
}
.animate-bounce-slow:hover {
  animation: none;
}
</style>
