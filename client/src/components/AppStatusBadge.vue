<script setup lang="ts">
const props = defineProps<{
  status: string;
  statusMap?: Record<string, { label: string; color: string }>;
}>();

const defaultMap: Record<string, { label: string; color: string }> = {
  draft: { label: "Draf", color: "bg-slate-200 text-slate-700" },
  pending: { label: "Menunggu", color: "bg-amber-100 text-amber-700" },
  registered: { label: "Berdaftar", color: "bg-blue-100 text-blue-700" },
  "in-progress": { label: "Dalam Proses", color: "bg-sky-100 text-sky-700" },
  hearing: { label: "Perbicaraan", color: "bg-violet-100 text-violet-700" },
  decided: { label: "Diputuskan", color: "bg-emerald-100 text-emerald-700" },
  closed: { label: "Ditutup", color: "bg-slate-200 text-slate-600" },
  archived: { label: "Diarkib", color: "bg-slate-100 text-slate-500" },
  submitted: { label: "Dihantar", color: "bg-blue-100 text-blue-700" },
  "under-review": { label: "Dalam Semakan", color: "bg-amber-100 text-amber-700" },
  accepted: { label: "Diterima", color: "bg-emerald-100 text-emerald-700" },
  rejected: { label: "Ditolak", color: "bg-red-100 text-red-700" },
  returned: { label: "Dikembalikan", color: "bg-orange-100 text-orange-700" },
  "action-required": { label: "Tindakan Diperlukan", color: "bg-amber-100 text-amber-700" },
  scheduled: { label: "Dijadualkan", color: "bg-blue-100 text-blue-700" },
  completed: { label: "Selesai", color: "bg-emerald-100 text-emerald-700" },
  postponed: { label: "Ditangguh", color: "bg-orange-100 text-orange-700" },
  cancelled: { label: "Dibatalkan", color: "bg-red-100 text-red-700" },
  online: { label: "Dalam Talian", color: "bg-emerald-100 text-emerald-700" },
  offline: { label: "Luar Talian", color: "bg-slate-200 text-slate-600" },
  maintenance: { label: "Penyelenggaraan", color: "bg-amber-100 text-amber-700" },
  published: { label: "Diterbitkan", color: "bg-emerald-100 text-emerald-700" },
};

const resolved = (props.statusMap ?? defaultMap)[props.status] ?? { label: props.status, color: "bg-slate-200 text-slate-600" };
</script>

<template>
  <span class="rounded-full px-3 py-1 text-xs font-medium" :class="resolved.color">
    {{ resolved.label }}
  </span>
</template>
