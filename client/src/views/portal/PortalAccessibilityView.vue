<script setup lang="ts">
import PortalLayout from "@/layouts/PortalLayout.vue";
import { Accessibility, Mail, Phone } from "lucide-vue-next";
</script>

<template>
  <PortalLayout v-slot="{ locale }">
    <section class="bg-gradient-to-br from-[#1a237e] to-[#283593] py-12 text-white">
      <div class="mx-auto max-w-4xl px-4 text-center">
        <Accessibility class="mx-auto h-10 w-10 text-blue-200" />
        <h2 class="mt-3 text-3xl font-bold">{{ locale === 'bm' ? 'Dasar Kebolehcapaian' : 'Accessibility Policy' }}</h2>
        <p class="mt-2 text-blue-200">
          {{ locale === 'bm' ? 'Komitmen kami terhadap kebolehcapaian web untuk semua pengguna' : 'Our commitment to web accessibility for all users' }}
        </p>
      </div>
    </section>

    <section class="mx-auto max-w-4xl px-4 py-12">
      <div class="space-y-8">
        <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 class="text-lg font-bold text-slate-900">
            {{ locale === 'bm' ? 'Penyataan Kebolehcapaian' : 'Accessibility Statement' }}
          </h3>
          <div class="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">
            <p v-if="locale === 'bm'">
              Portal eMP Mahkamah Perusahaan Malaysia komited untuk memastikan kebolehcapaian digital bagi semua pengguna, termasuk orang kurang upaya (OKU). Kami berusaha untuk mematuhi piawaian kebolehcapaian web yang diiktiraf di peringkat antarabangsa.
            </p>
            <p v-else>
              The eMP Portal of the Industrial Court of Malaysia is committed to ensuring digital accessibility for all users, including persons with disabilities (PWD). We strive to comply with internationally recognised web accessibility standards.
            </p>
            <p v-if="locale === 'bm'">
              Laman web ini dibangunkan dengan mematuhi Garis Panduan Kebolehcapaian Kandungan Web (WCAG) 2.1 pada tahap AA, selaras dengan dasar kerajaan Malaysia mengenai kebolehcapaian laman web sektor awam.
            </p>
            <p v-else>
              This website has been developed in compliance with the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA, in line with the Malaysian government's policy on public sector website accessibility.
            </p>
          </div>
        </div>

        <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 class="text-lg font-bold text-slate-900">
            {{ locale === 'bm' ? 'Pematuhan WAI-AA' : 'WAI-AA Compliance' }}
          </h3>
          <div class="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">
            <p v-if="locale === 'bm'">
              Portal ini mematuhi piawaian Web Accessibility Initiative (WAI) pada tahap AA. Ciri-ciri kebolehcapaian yang disediakan termasuk:
            </p>
            <p v-else>
              This portal complies with the Web Accessibility Initiative (WAI) at Level AA. Accessibility features provided include:
            </p>
            <ul class="ml-4 list-disc space-y-2">
              <li v-if="locale === 'bm'">Teks alternatif untuk semua imej dan elemen grafik</li>
              <li v-else>Alternative text for all images and graphic elements</li>
              <li v-if="locale === 'bm'">Navigasi papan kekunci yang lengkap untuk semua fungsi interaktif</li>
              <li v-else>Complete keyboard navigation for all interactive functions</li>
              <li v-if="locale === 'bm'">Kontras warna yang mencukupi antara teks dan latar belakang</li>
              <li v-else>Sufficient colour contrast between text and background</li>
              <li v-if="locale === 'bm'">Struktur heading yang teratur dan bermakna</li>
              <li v-else>Organised and meaningful heading structure</li>
              <li v-if="locale === 'bm'">Label borang yang jelas dan mesej ralat yang bermaklumat</li>
              <li v-else>Clear form labels and informative error messages</li>
              <li v-if="locale === 'bm'">Sokongan untuk pembaca skrin dan teknologi bantuan</li>
              <li v-else>Support for screen readers and assistive technologies</li>
              <li v-if="locale === 'bm'">Reka bentuk responsif yang berfungsi pada pelbagai peranti</li>
              <li v-else>Responsive design that works across various devices</li>
            </ul>
          </div>
        </div>

        <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 class="text-lg font-bold text-slate-900">
            {{ locale === 'bm' ? 'Maklum Balas Kebolehcapaian' : 'Accessibility Feedback' }}
          </h3>
          <div class="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">
            <p v-if="locale === 'bm'">
              Kami sentiasa berusaha untuk meningkatkan kebolehcapaian portal ini. Jika anda menghadapi sebarang masalah kebolehcapaian atau mempunyai cadangan penambahbaikan, sila hubungi kami:
            </p>
            <p v-else>
              We continuously strive to improve the accessibility of this portal. If you encounter any accessibility issues or have suggestions for improvement, please contact us:
            </p>
            <div class="mt-4 space-y-3">
              <div class="flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-3">
                <Mail class="h-5 w-5 text-blue-600" />
                <div>
                  <p class="font-medium text-slate-900">{{ locale === 'bm' ? 'Emel' : 'Email' }}</p>
                  <p class="text-slate-500">aksesibiliti@mohr.gov.my</p>
                </div>
              </div>
              <div class="flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-3">
                <Phone class="h-5 w-5 text-blue-600" />
                <div>
                  <p class="font-medium text-slate-900">{{ locale === 'bm' ? 'Telefon' : 'Phone' }}</p>
                  <p class="text-slate-500">03-8886 5000</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="rounded-xl border border-blue-100 bg-blue-50 p-6 text-center text-sm text-slate-600">
          <p v-if="locale === 'bm'">
            Dasar ini dikemas kini pada <strong>1 Januari 2026</strong> dan akan disemak secara berkala untuk memastikan pematuhan berterusan.
          </p>
          <p v-else>
            This policy was last updated on <strong>1 January 2026</strong> and will be reviewed periodically to ensure continued compliance.
          </p>
        </div>
      </div>
    </section>
  </PortalLayout>
</template>
