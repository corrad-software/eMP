<script setup lang="ts">
import { ref } from "vue";
import PortalLayout from "@/layouts/PortalLayout.vue";
import { Mail, Lock, Fingerprint, ArrowRight, Eye, EyeOff } from "lucide-vue-next";

const email = ref("");
const password = ref("");
const showPassword = ref(false);
</script>

<template>
  <PortalLayout v-slot="{ locale }">
    <section class="py-12">
      <div class="mx-auto max-w-md px-4">
        <!-- Card -->
        <div class="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
          <!-- Header -->
          <div class="text-center">
            <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-[#1a237e]/10 text-[#1a237e]">
              <Lock class="h-7 w-7" />
            </div>
            <h1 class="mt-4 text-xl font-bold text-slate-900">
              {{ locale === 'bm' ? 'Log Masuk' : 'Sign In' }}
            </h1>
            <p class="mt-1 text-sm text-slate-500">
              {{ locale === 'bm' ? 'Akses perkhidmatan e-Filing dan pengurusan kes' : 'Access e-Filing and case management services' }}
            </p>
          </div>

          <!-- MyDigital ID -->
          <button class="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50">
            <Fingerprint class="h-5 w-5 text-[#1a237e]" />
            {{ locale === 'bm' ? 'Log Masuk dengan MyDigital ID' : 'Sign In with MyDigital ID' }}
          </button>

          <!-- Divider -->
          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-slate-200" /></div>
            <div class="relative flex justify-center">
              <span class="bg-white px-3 text-xs text-slate-400">{{ locale === 'bm' ? 'atau gunakan emel' : 'or use email' }}</span>
            </div>
          </div>

          <!-- Form -->
          <div class="space-y-4">
            <div class="space-y-1.5">
              <label class="text-sm font-medium text-slate-700">{{ locale === 'bm' ? 'Alamat E-mel' : 'Email Address' }}</label>
              <div class="relative">
                <Mail class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  v-model="email"
                  type="email"
                  placeholder="nama@contoh.com"
                  class="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-sm shadow-sm transition-colors focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                />
              </div>
            </div>
            <div class="space-y-1.5">
              <div class="flex items-center justify-between">
                <label class="text-sm font-medium text-slate-700">{{ locale === 'bm' ? 'Kata Laluan' : 'Password' }}</label>
                <button class="text-xs font-medium text-[#1a237e] hover:underline">
                  {{ locale === 'bm' ? 'Lupa kata laluan?' : 'Forgot password?' }}
                </button>
              </div>
              <div class="relative">
                <Lock class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="••••••••"
                  class="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-10 text-sm shadow-sm transition-colors focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                />
                <button class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" @click="showPassword = !showPassword">
                  <EyeOff v-if="showPassword" class="h-4 w-4" />
                  <Eye v-else class="h-4 w-4" />
                </button>
              </div>
            </div>

            <button class="flex w-full items-center justify-center gap-2 rounded-lg bg-[#1a237e] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#283593]">
              {{ locale === 'bm' ? 'Log Masuk' : 'Sign In' }}
              <ArrowRight class="h-4 w-4" />
            </button>
          </div>

          <!-- Register link -->
          <p class="mt-6 text-center text-sm text-slate-500">
            {{ locale === 'bm' ? 'Belum mempunyai akaun?' : "Don't have an account?" }}
            <router-link to="/portal/daftar" class="font-semibold text-[#1a237e] hover:underline">
              {{ locale === 'bm' ? 'Daftar Sekarang' : 'Register Now' }}
            </router-link>
          </p>
        </div>
      </div>
    </section>
  </PortalLayout>
</template>
