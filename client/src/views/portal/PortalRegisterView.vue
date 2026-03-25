<script setup lang="ts">
import { ref } from "vue";
import PortalLayout from "@/layouts/PortalLayout.vue";
import { UserPlus, Mail, Lock, User, Phone, Building, Briefcase, ArrowRight, Eye, EyeOff, CheckCircle2 } from "lucide-vue-next";

const step = ref(1); // 1=type, 2=form, 3=success
const userType = ref<"individual" | "company" | "lawyer" | "">("");
const showPassword = ref(false);

const form = ref({
  name: "",
  ic: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  companyName: "",
  companyRegNo: "",
  barCouncilNo: "",
  firmName: "",
});

const userTypes = [
  { value: "individual" as const, icon: User, label: { bm: "Individu / Pekerja", en: "Individual / Worker" }, desc: { bm: "Penuntut atau responden dalam kes perusahaan", en: "Claimant or respondent in industrial cases" } },
  { value: "company" as const, icon: Building, label: { bm: "Syarikat / Majikan", en: "Company / Employer" }, desc: { bm: "Wakil syarikat untuk pemfailan dan pengurusan kes", en: "Company representative for case filing and management" } },
  { value: "lawyer" as const, icon: Briefcase, label: { bm: "Peguam", en: "Lawyer" }, desc: { bm: "Peguam berdaftar yang mewakili pihak-pihak bertikai", en: "Registered lawyer representing disputing parties" } },
];
</script>

<template>
  <PortalLayout v-slot="{ locale }">
    <section class="py-12">
      <div class="mx-auto max-w-lg px-4">
        <!-- Step 1: User type -->
        <div v-if="step === 1" class="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
          <div class="text-center">
            <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-[#1a237e]/10 text-[#1a237e]">
              <UserPlus class="h-7 w-7" />
            </div>
            <h1 class="mt-4 text-xl font-bold text-slate-900">
              {{ locale === 'bm' ? 'Daftar Akaun' : 'Register Account' }}
            </h1>
            <p class="mt-1 text-sm text-slate-500">
              {{ locale === 'bm' ? 'Pilih jenis akaun anda' : 'Choose your account type' }}
            </p>
          </div>

          <div class="mt-6 space-y-3">
            <button
              v-for="ut in userTypes"
              :key="ut.value"
              class="flex w-full items-center gap-4 rounded-lg border p-4 text-left transition-all"
              :class="userType === ut.value ? 'border-[#1a237e] bg-[#1a237e]/5 ring-1 ring-[#1a237e]' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'"
              @click="userType = ut.value"
            >
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" :class="userType === ut.value ? 'bg-[#1a237e] text-white' : 'bg-slate-100 text-slate-500'">
                <component :is="ut.icon" class="h-5 w-5" />
              </div>
              <div>
                <p class="text-sm font-semibold text-slate-900">{{ ut.label[locale] }}</p>
                <p class="text-xs text-slate-500">{{ ut.desc[locale] }}</p>
              </div>
            </button>
          </div>

          <button
            :disabled="!userType"
            class="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#1a237e] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#283593] disabled:cursor-not-allowed disabled:opacity-40"
            @click="step = 2"
          >
            {{ locale === 'bm' ? 'Seterusnya' : 'Continue' }}
            <ArrowRight class="h-4 w-4" />
          </button>

          <p class="mt-4 text-center text-sm text-slate-500">
            {{ locale === 'bm' ? 'Sudah mempunyai akaun?' : 'Already have an account?' }}
            <router-link to="/portal/log-masuk" class="font-semibold text-[#1a237e] hover:underline">
              {{ locale === 'bm' ? 'Log Masuk' : 'Sign In' }}
            </router-link>
          </p>
        </div>

        <!-- Step 2: Registration form -->
        <div v-else-if="step === 2" class="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
          <div class="text-center">
            <h1 class="text-xl font-bold text-slate-900">
              {{ locale === 'bm' ? 'Maklumat Pendaftaran' : 'Registration Details' }}
            </h1>
            <p class="mt-1 text-sm text-slate-500">
              {{ userType === 'individual' ? (locale === 'bm' ? 'Akaun Individu / Pekerja' : 'Individual / Worker Account')
                : userType === 'company' ? (locale === 'bm' ? 'Akaun Syarikat / Majikan' : 'Company / Employer Account')
                : (locale === 'bm' ? 'Akaun Peguam' : 'Lawyer Account') }}
            </p>
          </div>

          <div class="mt-6 space-y-4">
            <div class="space-y-1.5">
              <label class="text-sm font-medium text-slate-700">{{ locale === 'bm' ? 'Nama Penuh' : 'Full Name' }}</label>
              <div class="relative">
                <User class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input v-model="form.name" type="text" :placeholder="locale === 'bm' ? 'Nama seperti dalam kad pengenalan' : 'Name as per IC'" class="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-sm shadow-sm transition-colors focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200" />
              </div>
            </div>

            <div class="space-y-1.5">
              <label class="text-sm font-medium text-slate-700">{{ locale === 'bm' ? 'No. Kad Pengenalan' : 'IC Number' }}</label>
              <input v-model="form.ic" type="text" placeholder="000000-00-0000" class="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm shadow-sm transition-colors focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200" />
            </div>

            <!-- Company fields -->
            <template v-if="userType === 'company'">
              <div class="space-y-1.5">
                <label class="text-sm font-medium text-slate-700">{{ locale === 'bm' ? 'Nama Syarikat' : 'Company Name' }}</label>
                <div class="relative">
                  <Building class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input v-model="form.companyName" type="text" class="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-sm shadow-sm transition-colors focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200" />
                </div>
              </div>
              <div class="space-y-1.5">
                <label class="text-sm font-medium text-slate-700">{{ locale === 'bm' ? 'No. Pendaftaran Syarikat' : 'Company Reg. No.' }}</label>
                <input v-model="form.companyRegNo" type="text" class="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm shadow-sm transition-colors focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200" />
              </div>
            </template>

            <!-- Lawyer fields -->
            <template v-if="userType === 'lawyer'">
              <div class="space-y-1.5">
                <label class="text-sm font-medium text-slate-700">{{ locale === 'bm' ? 'No. Bar Council' : 'Bar Council No.' }}</label>
                <div class="relative">
                  <Briefcase class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input v-model="form.barCouncilNo" type="text" class="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-sm shadow-sm transition-colors focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200" />
                </div>
              </div>
              <div class="space-y-1.5">
                <label class="text-sm font-medium text-slate-700">{{ locale === 'bm' ? 'Nama Firma' : 'Firm Name' }}</label>
                <input v-model="form.firmName" type="text" class="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm shadow-sm transition-colors focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200" />
              </div>
            </template>

            <div class="grid gap-4 sm:grid-cols-2">
              <div class="space-y-1.5">
                <label class="text-sm font-medium text-slate-700">{{ locale === 'bm' ? 'E-mel' : 'Email' }}</label>
                <div class="relative">
                  <Mail class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input v-model="form.email" type="email" class="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-sm shadow-sm transition-colors focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200" />
                </div>
              </div>
              <div class="space-y-1.5">
                <label class="text-sm font-medium text-slate-700">{{ locale === 'bm' ? 'No. Telefon' : 'Phone' }}</label>
                <div class="relative">
                  <Phone class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input v-model="form.phone" type="tel" placeholder="012-0000000" class="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-sm shadow-sm transition-colors focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200" />
                </div>
              </div>
            </div>

            <div class="space-y-1.5">
              <label class="text-sm font-medium text-slate-700">{{ locale === 'bm' ? 'Kata Laluan' : 'Password' }}</label>
              <div class="relative">
                <Lock class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input v-model="form.password" :type="showPassword ? 'text' : 'password'" class="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-10 text-sm shadow-sm transition-colors focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200" />
                <button class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" @click="showPassword = !showPassword">
                  <EyeOff v-if="showPassword" class="h-4 w-4" /><Eye v-else class="h-4 w-4" />
                </button>
              </div>
              <p class="text-[11px] text-slate-400">{{ locale === 'bm' ? 'Minimum 8 aksara, huruf besar, nombor dan simbol' : 'Minimum 8 characters, uppercase, number and symbol' }}</p>
            </div>

            <div class="space-y-1.5">
              <label class="text-sm font-medium text-slate-700">{{ locale === 'bm' ? 'Sahkan Kata Laluan' : 'Confirm Password' }}</label>
              <div class="relative">
                <Lock class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input v-model="form.confirmPassword" type="password" class="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-sm shadow-sm transition-colors focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200" />
              </div>
            </div>

            <div class="flex gap-2 pt-2">
              <button class="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm hover:bg-slate-50" @click="step = 1">
                {{ locale === 'bm' ? 'Kembali' : 'Back' }}
              </button>
              <button class="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#1a237e] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#283593]" @click="step = 3">
                {{ locale === 'bm' ? 'Daftar' : 'Register' }}
                <ArrowRight class="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <!-- Step 3: Success -->
        <div v-else class="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg">
          <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 class="h-8 w-8" />
          </div>
          <h1 class="mt-4 text-xl font-bold text-slate-900">
            {{ locale === 'bm' ? 'Pendaftaran Berjaya!' : 'Registration Successful!' }}
          </h1>
          <p class="mt-2 text-sm text-slate-500">
            {{ locale === 'bm'
              ? 'Akaun anda telah berjaya didaftarkan. Sila semak e-mel anda untuk pengesahan.'
              : 'Your account has been successfully registered. Please check your email for verification.' }}
          </p>
          <router-link
            to="/portal/log-masuk"
            class="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#1a237e] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#283593]"
          >
            {{ locale === 'bm' ? 'Log Masuk Sekarang' : 'Sign In Now' }}
            <ArrowRight class="h-4 w-4" />
          </router-link>
        </div>
      </div>
    </section>
  </PortalLayout>
</template>
