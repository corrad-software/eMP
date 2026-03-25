<script setup lang="ts">
import { reactive } from "vue";
import PortalLayout from "@/layouts/PortalLayout.vue";
import { MapPin, Phone, Mail, Clock } from "lucide-vue-next";

const form = reactive({
  nama: "",
  emel: "",
  subjek: "",
  mesej: "",
});

function handleSubmit() {
  // Mock submit — placeholder for future integration
  alert("Terima kasih. Maklum balas anda telah dihantar.");
  form.nama = "";
  form.emel = "";
  form.subjek = "";
  form.mesej = "";
}
</script>

<template>
  <PortalLayout v-slot="{ locale }">
    <section class="relative bg-[#1a237e] py-12">
      <div class="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=300&fit=crop" alt="" class="h-full w-full object-cover opacity-10" />
      </div>
      <div class="relative mx-auto max-w-7xl px-4">
        <div class="flex items-center gap-3">
          <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur">
            <Phone class="h-6 w-6" />
          </div>
          <div>
            <h1 class="text-2xl font-bold text-white sm:text-3xl">{{ locale === 'bm' ? 'Hubungi Kami' : 'Contact Us' }}</h1>
            <p class="mt-0.5 text-sm text-blue-200">{{ locale === 'bm' ? 'Kami sedia membantu anda' : 'We are ready to help you' }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-4 py-12">
      <div class="grid gap-8 lg:grid-cols-2">
        <!-- Contact Info -->
        <div class="space-y-6">
          <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 class="text-lg font-bold text-slate-900">
              {{ locale === 'bm' ? 'Maklumat Perhubungan' : 'Contact Information' }}
            </h3>
            <div class="mt-4 space-y-4">
              <div class="flex items-start gap-3">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <MapPin class="h-5 w-5" />
                </div>
                <div>
                  <p class="font-medium text-slate-900">{{ locale === 'bm' ? 'Alamat' : 'Address' }}</p>
                  <p class="mt-0.5 text-sm text-slate-500">
                    Mahkamah Perusahaan Malaysia<br />
                    Aras 5, Blok D4, Kompleks D<br />
                    Pusat Pentadbiran Kerajaan Persekutuan<br />
                    62530 Putrajaya
                  </p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Phone class="h-5 w-5" />
                </div>
                <div>
                  <p class="font-medium text-slate-900">{{ locale === 'bm' ? 'Telefon' : 'Phone' }}</p>
                  <p class="mt-0.5 text-sm text-slate-500">03-8886 5000</p>
                  <p class="text-sm text-slate-500">03-8886 5001 ({{ locale === 'bm' ? 'Faks' : 'Fax' }})</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Mail class="h-5 w-5" />
                </div>
                <div>
                  <p class="font-medium text-slate-900">{{ locale === 'bm' ? 'Emel' : 'Email' }}</p>
                  <p class="mt-0.5 text-sm text-slate-500">mp@mohr.gov.my</p>
                </div>
              </div>
            </div>
          </div>

          <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <Clock class="h-5 w-5" />
              </div>
              <h3 class="text-lg font-bold text-slate-900">
                {{ locale === 'bm' ? 'Waktu Operasi' : 'Operating Hours' }}
              </h3>
            </div>
            <div class="mt-4 space-y-2 text-sm">
              <div class="flex justify-between rounded-lg bg-slate-50 px-4 py-2.5">
                <span class="text-slate-600">{{ locale === 'bm' ? 'Isnin - Khamis' : 'Monday - Thursday' }}</span>
                <span class="font-medium text-slate-900">8:00 AM - 5:00 PM</span>
              </div>
              <div class="flex justify-between rounded-lg bg-slate-50 px-4 py-2.5">
                <span class="text-slate-600">{{ locale === 'bm' ? 'Jumaat' : 'Friday' }}</span>
                <span class="font-medium text-slate-900">8:00 AM - 5:00 PM</span>
              </div>
              <div class="flex justify-between rounded-lg bg-slate-50 px-4 py-2.5">
                <span class="text-slate-600">{{ locale === 'bm' ? 'Sabtu, Ahad & Cuti Umum' : 'Saturday, Sunday & Public Holidays' }}</span>
                <span class="font-medium text-rose-600">{{ locale === 'bm' ? 'Tutup' : 'Closed' }}</span>
              </div>
            </div>
          </div>

          <!-- Map -->
          <div class="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.4!2d101.6935!3d2.9264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cdb5a0e0a0f7c9%3A0x7f7f7f7f7f7f7f7f!2sPusat%20Pentadbiran%20Kerajaan%20Persekutuan%2C%20Putrajaya!5e0!3m2!1sms!2smy!4v1700000000000!5m2!1sms!2smy"
              width="100%"
              height="220"
              style="border:0;"
              allowfullscreen
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              class="w-full"
            />
          </div>
        </div>

        <!-- Feedback Form -->
        <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 class="text-lg font-bold text-slate-900">
            {{ locale === 'bm' ? 'Borang Maklum Balas' : 'Feedback Form' }}
          </h3>
          <p class="mt-1 text-sm text-slate-500">
            {{ locale === 'bm' ? 'Sila isi borang di bawah untuk sebarang pertanyaan atau maklum balas.' : 'Please fill in the form below for any enquiries or feedback.' }}
          </p>
          <form class="mt-6 space-y-4" @submit.prevent="handleSubmit">
            <div>
              <label class="mb-1.5 block text-sm font-medium text-slate-700">
                {{ locale === 'bm' ? 'Nama' : 'Name' }} <span class="text-rose-500">*</span>
              </label>
              <input
                v-model="form.nama"
                type="text"
                required
                class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 transition focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                :placeholder="locale === 'bm' ? 'Nama penuh' : 'Full name'"
              />
            </div>
            <div>
              <label class="mb-1.5 block text-sm font-medium text-slate-700">
                {{ locale === 'bm' ? 'Emel' : 'Email' }} <span class="text-rose-500">*</span>
              </label>
              <input
                v-model="form.emel"
                type="email"
                required
                class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 transition focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                :placeholder="locale === 'bm' ? 'Alamat emel' : 'Email address'"
              />
            </div>
            <div>
              <label class="mb-1.5 block text-sm font-medium text-slate-700">
                {{ locale === 'bm' ? 'Subjek' : 'Subject' }} <span class="text-rose-500">*</span>
              </label>
              <input
                v-model="form.subjek"
                type="text"
                required
                class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 transition focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                :placeholder="locale === 'bm' ? 'Tajuk pertanyaan' : 'Subject of enquiry'"
              />
            </div>
            <div>
              <label class="mb-1.5 block text-sm font-medium text-slate-700">
                {{ locale === 'bm' ? 'Mesej' : 'Message' }} <span class="text-rose-500">*</span>
              </label>
              <textarea
                v-model="form.mesej"
                rows="5"
                required
                class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 transition focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                :placeholder="locale === 'bm' ? 'Tulis mesej anda di sini...' : 'Write your message here...'"
              />
            </div>
            <button
              type="submit"
              class="w-full rounded-lg bg-[#1a237e] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#283593]"
            >
              {{ locale === 'bm' ? 'Hantar' : 'Submit' }}
            </button>
          </form>
        </div>
      </div>
    </section>
  </PortalLayout>
</template>
