<script setup lang="ts">
import { ref } from "vue";
import PortalLayout from "@/layouts/PortalLayout.vue";
import { ChevronDown, HelpCircle } from "lucide-vue-next";

const openIndex = ref<number | null>(null);

function toggle(i: number) {
  openIndex.value = openIndex.value === i ? null : i;
}

const faqs = [
  {
    q: { bm: "Apa itu Mahkamah Perusahaan?", en: "What is the Industrial Court?" },
    a: {
      bm: "Mahkamah Perusahaan Malaysia ialah sebuah tribunal yang ditubuhkan di bawah Akta Perhubungan Perusahaan 1967 untuk menyelesaikan pertikaian perusahaan antara majikan dan pekerja atau kesatuan sekerja.",
      en: "The Industrial Court of Malaysia is a tribunal established under the Industrial Relations Act 1967 to resolve industrial disputes between employers and employees or trade unions.",
    },
  },
  {
    q: { bm: "Bagaimana cara memfailkan kes di Mahkamah Perusahaan?", en: "How do I file a case at the Industrial Court?" },
    a: {
      bm: "Kes boleh difailkan secara dalam talian melalui sistem e-Filing di portal ini. Anda perlu mendaftar akaun, mengisi borang permohonan, memuat naik dokumen sokongan, dan membayar fi pemfailan yang ditetapkan.",
      en: "Cases can be filed online through the e-Filing system on this portal. You need to register an account, fill in the application form, upload supporting documents, and pay the prescribed filing fee.",
    },
  },
  {
    q: { bm: "Berapa lama proses penyelesaian kes?", en: "How long does the case resolution process take?" },
    a: {
      bm: "Tempoh penyelesaian kes bergantung pada kerumitan kes. Secara purata, kes diselesaikan dalam tempoh 18 hingga 24 bulan dari tarikh rujukan. Kes yang melibatkan persetujuan bersama mungkin diselesaikan lebih cepat.",
      en: "The case resolution period depends on the complexity of the case. On average, cases are resolved within 18 to 24 months from the date of reference. Cases involving mutual consent may be resolved more quickly.",
    },
  },
  {
    q: { bm: "Apakah jenis kes yang dikendalikan oleh Mahkamah Perusahaan?", en: "What types of cases does the Industrial Court handle?" },
    a: {
      bm: "Mahkamah Perusahaan mengendalikan kes pembuangan kerja tidak adil, pertikaian perdagangan, tafsiran dan pematuhan perjanjian kolektif, serta pertikaian berkaitan amalan buruh tidak adil.",
      en: "The Industrial Court handles cases of unfair dismissal, trade disputes, interpretation and compliance with collective agreements, and disputes related to unfair labour practices.",
    },
  },
  {
    q: { bm: "Adakah saya perlu diwakili peguam?", en: "Do I need to be represented by a lawyer?" },
    a: {
      bm: "Tidak semestinya. Pihak-pihak boleh mewakili diri sendiri atau diwakili oleh wakil kesatuan sekerja, pegawai majikan, atau peguam. Walau bagaimanapun, adalah disyorkan untuk mendapatkan nasihat undang-undang.",
      en: "Not necessarily. Parties may represent themselves or be represented by a trade union representative, employer's officer, or lawyer. However, it is recommended to seek legal advice.",
    },
  },
  {
    q: { bm: "Bagaimana proses sebutan di Mahkamah Perusahaan?", en: "How does the mention process work at the Industrial Court?" },
    a: {
      bm: "Sebutan adalah prosiding awal di mana Pengerusi Mahkamah akan menentukan isu-isu kes, menetapkan tarikh perbicaraan, dan menggalakkan penyelesaian secara rundingan. Pihak-pihak wajib hadir pada tarikh sebutan yang ditetapkan.",
      en: "A mention is a preliminary proceeding where the Court Chairman will determine case issues, set trial dates, and encourage settlement through negotiation. Parties must attend on the scheduled mention date.",
    },
  },
  {
    q: { bm: "Apakah itu Award Mahkamah Perusahaan?", en: "What is an Industrial Court Award?" },
    a: {
      bm: "Award ialah keputusan rasmi yang dikeluarkan oleh Mahkamah Perusahaan selepas perbicaraan. Award ini mengikat kedua-dua pihak dan boleh merangkumi perintah pengembalian semula kerja, pampasan kewangan, atau arahan lain yang difikirkan sesuai.",
      en: "An Award is an official decision issued by the Industrial Court after trial. The Award is binding on both parties and may include orders for reinstatement, financial compensation, or other directions deemed appropriate.",
    },
  },
  {
    q: { bm: "Bagaimana cara mendapatkan salinan Award?", en: "How do I obtain a copy of an Award?" },
    a: {
      bm: "Salinan Award boleh dicari dan dimuat turun melalui bahagian Carian Award di portal ini. Anda juga boleh memohon salinan rasmi di kaunter Mahkamah Perusahaan dengan membayar fi yang ditetapkan.",
      en: "Award copies can be searched and downloaded through the Award Search section on this portal. You may also apply for an official copy at the Industrial Court counter by paying the prescribed fee.",
    },
  },
];
</script>

<template>
  <PortalLayout v-slot="{ locale }">
    <section class="relative bg-[#1a237e] py-12">
      <div class="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&h=300&fit=crop" alt="" class="h-full w-full object-cover opacity-10" />
      </div>
      <div class="relative mx-auto max-w-7xl px-4">
        <div class="flex items-center gap-3">
          <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur">
            <HelpCircle class="h-6 w-6" />
          </div>
          <div>
            <h1 class="text-2xl font-bold text-white sm:text-3xl">{{ locale === 'bm' ? 'Soalan Lazim' : 'Frequently Asked Questions' }}</h1>
            <p class="mt-0.5 text-sm text-blue-200">{{ locale === 'bm' ? 'Jawapan kepada soalan yang kerap ditanya' : 'Answers to frequently asked questions' }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-4xl px-4 py-12">
      <div class="space-y-3">
        <div
          v-for="(faq, i) in faqs"
          :key="i"
          class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
        >
          <button
            class="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-slate-50"
            @click="toggle(i)"
          >
            <span class="pr-4 font-medium text-slate-900">{{ faq.q[locale] }}</span>
            <ChevronDown
              class="h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200"
              :class="openIndex === i ? 'rotate-180' : ''"
            />
          </button>
          <div v-if="openIndex === i" class="border-t border-slate-100 px-6 py-4">
            <p class="leading-relaxed text-slate-600">{{ faq.a[locale] }}</p>
          </div>
        </div>
      </div>

      <div class="mt-10 rounded-xl border border-blue-100 bg-blue-50 p-6 text-center">
        <p class="font-medium text-slate-900">
          {{ locale === 'bm' ? 'Masih ada soalan?' : 'Still have questions?' }}
        </p>
        <p class="mt-1 text-sm text-slate-600">
          {{ locale === 'bm' ? 'Hubungi kami untuk mendapatkan bantuan lanjut.' : 'Contact us for further assistance.' }}
        </p>
        <router-link
          to="/portal/hubungi"
          class="mt-4 inline-block rounded-lg bg-[#1a237e] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#283593]"
        >
          {{ locale === 'bm' ? 'Hubungi Kami' : 'Contact Us' }}
        </router-link>
      </div>
    </section>
  </PortalLayout>
</template>
