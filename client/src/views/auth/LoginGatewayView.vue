<script setup lang="ts">
import { ref } from "vue";
import {
  Shield,
  User,
  Users,
  Building,
  ArrowRight,
  Lock,
  Mail,
  Fingerprint,
} from "lucide-vue-next";

const selectedRole = ref<string | null>(null);
const email = ref("");
const password = ref("");
const showLoginForm = ref(false);

const roles = [
  {
    key: "dalaman",
    icon: Building,
    title: "Pengguna Dalaman",
    subtitle: "Kakitangan MPM",
    description: "Log masuk untuk pegawai dan kakitangan Mahkamah Perusahaan.",
    color: "from-[#1e3a5f] to-[#2c5282]",
    border: "border-[#1e3a5f]/20",
    bg: "bg-[#ebf0f7]",
    text: "text-[#1e3a5f]",
  },
  {
    key: "peguam",
    icon: Users,
    title: "Peguam / Pihak Bertikai",
    subtitle: "Peguam & Pihak-Pihak",
    description: "Log masuk untuk peguam berdaftar dan pihak-pihak yang bertikai.",
    color: "from-[#6b21a8] to-[#7c3aed]",
    border: "border-[#7c3aed]/20",
    bg: "bg-[#f3e8ff]",
    text: "text-[#6b21a8]",
  },
  {
    key: "awam",
    icon: User,
    title: "Pengguna Awam",
    subtitle: "Orang Awam",
    description: "Akses portal awam untuk semakan status kes dan maklumat umum.",
    color: "from-[#065f46] to-[#059669]",
    border: "border-[#059669]/20",
    bg: "bg-[#ecfdf5]",
    text: "text-[#065f46]",
  },
];

function selectRole(key: string) {
  selectedRole.value = key;
  showLoginForm.value = true;
}

function goBack() {
  showLoginForm.value = false;
  selectedRole.value = null;
}

function mockLogin() {
  // Mockup only - no API call
}

function mockMyDigitalId() {
  // Mockup only - no API call
}
</script>

<template>
  <div class="flex min-h-screen flex-col bg-gradient-to-br from-[#f0f4f8] via-[#e8eef5] to-[#dce4ed]">
    <!-- Top accent bar -->
    <div class="h-1.5 bg-gradient-to-r from-[#1e3a5f] via-[#c5a44e] to-[#1e3a5f]"></div>

    <div class="flex flex-1 flex-col items-center justify-center px-4 py-8">
      <div class="w-full max-w-[520px]">
        <!-- Branding Header -->
        <div class="mb-8 flex flex-col items-center">
          <!-- Jata Negara placeholder -->
          <div class="mb-3 flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#c5a44e]/30 bg-white shadow-md">
            <Shield class="h-10 w-10 text-[#c5a44e]" />
          </div>
          <h1 class="text-center text-xl font-bold tracking-tight text-[#1e3a5f]">
            Mahkamah Perusahaan Malaysia
          </h1>
          <p class="text-center text-xs font-medium uppercase tracking-widest text-[#64748b]">
            Industrial Court of Malaysia
          </p>
          <div class="mt-2 h-px w-16 bg-[#c5a44e]"></div>
          <p class="mt-2 text-center text-sm font-semibold text-[#334155]">
            eMP - Sistem Pengurusan Kes Elektronik
          </p>
        </div>

        <!-- Role Selection (initial view) -->
        <div v-if="!showLoginForm">
          <p class="mb-4 text-center text-[13px] text-[#64748b]">Sila pilih jenis pengguna untuk log masuk:</p>

          <div class="space-y-3">
            <button
              v-for="role in roles"
              :key="role.key"
              class="group flex w-full items-center gap-4 rounded-xl border bg-white px-5 py-4 text-left shadow-sm transition-all hover:shadow-md"
              :class="[role.border, selectedRole === role.key ? 'ring-2 ring-[#1e3a5f]/30' : '']"
              @click="selectRole(role.key)"
            >
              <div
                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br shadow-sm"
                :class="role.color"
              >
                <component :is="role.icon" class="h-5 w-5 text-white" />
              </div>
              <div class="flex-1">
                <h3 class="text-sm font-semibold text-[#1e3a5f]">{{ role.title }}</h3>
                <p class="text-[12px] text-[#64748b]">{{ role.description }}</p>
              </div>
              <ArrowRight class="h-4 w-4 shrink-0 text-[#94a3b8] transition-transform group-hover:translate-x-0.5 group-hover:text-[#1e3a5f]" />
            </button>
          </div>

          <!-- Divider -->
          <div class="my-6 flex items-center gap-3">
            <div class="h-px flex-1 bg-[#d1d5db]"></div>
            <span class="text-[11px] font-medium uppercase tracking-wider text-[#94a3b8]">atau</span>
            <div class="h-px flex-1 bg-[#d1d5db]"></div>
          </div>

          <!-- MyDigital ID Button -->
          <button
            type="button"
            class="flex w-full items-center justify-center gap-2.5 rounded-xl border-2 border-[#1e3a5f] bg-white px-4 py-3 text-sm font-semibold text-[#1e3a5f] shadow-sm transition-all hover:bg-[#1e3a5f] hover:text-white"
            @click="mockMyDigitalId"
          >
            <Fingerprint class="h-5 w-5" />
            Log Masuk dengan MyDigital ID
          </button>
        </div>

        <!-- Login Form (after role selection) -->
        <div v-else>
          <!-- Selected role badge -->
          <div class="mb-5 flex items-center justify-center">
            <span
              class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold"
              :class="[
                roles.find(r => r.key === selectedRole)?.bg,
                roles.find(r => r.key === selectedRole)?.text,
              ]"
            >
              <component :is="roles.find(r => r.key === selectedRole)?.icon" class="h-3.5 w-3.5" />
              {{ roles.find(r => r.key === selectedRole)?.title }}
            </span>
          </div>

          <div class="rounded-xl border border-[#e2e8f0] bg-white px-8 pb-8 pt-7 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
            <h2 class="mb-1 text-center text-lg font-semibold text-[#1e3a5f]">Log Masuk</h2>
            <p class="mb-6 text-center text-[13px] text-[#64748b]">
              Masukkan maklumat log masuk anda
            </p>

            <!-- MyDigital ID option -->
            <button
              type="button"
              class="mb-5 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-[#1e3a5f]/20 bg-[#f8fafc] px-4 py-2.5 text-[13px] font-semibold text-[#1e3a5f] transition-all hover:border-[#1e3a5f]/40 hover:bg-[#ebf0f7]"
              @click="mockMyDigitalId"
            >
              <Fingerprint class="h-4 w-4" />
              Log Masuk dengan MyDigital ID
            </button>

            <!-- Divider -->
            <div class="mb-5 flex items-center gap-3">
              <div class="h-px flex-1 bg-[#e2e8f0]"></div>
              <span class="text-[11px] font-medium uppercase tracking-wider text-[#94a3b8]">atau</span>
              <div class="h-px flex-1 bg-[#e2e8f0]"></div>
            </div>

            <!-- Email/Password Form -->
            <form class="space-y-4" @submit.prevent="mockLogin">
              <div class="space-y-1.5">
                <label class="text-[13px] font-medium text-[#334155]">E-mel</label>
                <div class="relative">
                  <Mail class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
                  <input
                    v-model="email"
                    type="email"
                    class="w-full rounded-lg border border-[#d1d5db] bg-white py-2.5 pl-10 pr-3 text-sm text-[#1e293b] transition-all placeholder:text-[#94a3b8] focus:border-[#1e3a5f] focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20"
                    placeholder="nama@contoh.gov.my"
                  />
                </div>
              </div>

              <div class="space-y-1.5">
                <label class="text-[13px] font-medium text-[#334155]">Kata Laluan</label>
                <div class="relative">
                  <Lock class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
                  <input
                    v-model="password"
                    type="password"
                    class="w-full rounded-lg border border-[#d1d5db] bg-white py-2.5 pl-10 pr-3 text-sm text-[#1e293b] transition-all placeholder:text-[#94a3b8] focus:border-[#1e3a5f] focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20"
                    placeholder="Masukkan kata laluan"
                  />
                </div>
              </div>

              <!-- Forgot password -->
              <div class="flex justify-end">
                <button
                  type="button"
                  class="text-[12px] font-medium text-[#1e3a5f] underline underline-offset-2 transition-colors hover:text-[#2c5282]"
                >
                  Lupa Kata Laluan?
                </button>
              </div>

              <!-- Submit -->
              <button
                type="submit"
                class="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#1e3a5f] to-[#2c5282] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:from-[#163250] hover:to-[#234876]"
              >
                Log Masuk
                <ArrowRight class="h-4 w-4" />
              </button>
            </form>
          </div>

          <!-- Back button -->
          <button
            type="button"
            class="mt-4 flex w-full items-center justify-center gap-1.5 text-[13px] font-medium text-[#64748b] transition-colors hover:text-[#1e3a5f]"
            @click="goBack"
          >
            <ArrowRight class="h-3.5 w-3.5 rotate-180" />
            Kembali ke pilihan pengguna
          </button>
        </div>

        <!-- Footer -->
        <div class="mt-8 text-center">
          <p class="text-[11px] text-[#94a3b8]">
            &copy; {{ new Date().getFullYear() }} Mahkamah Perusahaan Malaysia. Hak cipta terpelihara.
          </p>
          <p class="mt-1 text-[10px] text-[#b0b8c4]">eMP v2.0</p>
        </div>
      </div>
    </div>
  </div>
</template>
