<script setup lang="ts">
import { ref, computed } from "vue";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-vue-next";

export type Column = {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
};

const props = defineProps<{
  columns: Column[];
  rows: Record<string, unknown>[];
  searchable?: boolean;
  pageSize?: number;
  clickable?: boolean;
}>();

defineEmits<{ rowClick: [row: Record<string, unknown>] }>();

const searchQuery = ref("");
const sortKey = ref("");
const sortDir = ref<"asc" | "desc">("asc");
const currentPage = ref(1);
const limit = props.pageSize ?? 10;

const filtered = computed(() => {
  let data = [...props.rows];
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    data = data.filter((row) =>
      Object.values(row).some((v) => String(v).toLowerCase().includes(q))
    );
  }
  if (sortKey.value) {
    data.sort((a, b) => {
      const av = String(a[sortKey.value] ?? "");
      const bv = String(b[sortKey.value] ?? "");
      return sortDir.value === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
    });
  }
  return data;
});

const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / limit)));
const paged = computed(() => {
  const start = (currentPage.value - 1) * limit;
  return filtered.value.slice(start, start + limit);
});

function toggleSort(key: string) {
  if (sortKey.value === key) {
    sortDir.value = sortDir.value === "asc" ? "desc" : "asc";
  } else {
    sortKey.value = key;
    sortDir.value = "asc";
  }
}
</script>

<template>
  <div class="space-y-3">
    <div v-if="searchable" class="relative max-w-xs">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Cari..."
        class="h-9 w-full rounded-lg border border-slate-300 bg-white pl-3 pr-3 text-sm placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
        @input="currentPage = 1"
      />
    </div>

    <div class="overflow-x-auto rounded-lg border border-slate-200">
      <table class="min-w-full divide-y divide-slate-200 text-sm">
        <thead class="bg-slate-50">
          <tr>
            <th
              v-for="col in columns"
              :key="col.key"
              class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
              :style="col.width ? { width: col.width } : {}"
            >
              <button
                v-if="col.sortable"
                class="inline-flex items-center gap-1 hover:text-slate-900"
                @click="toggleSort(col.key)"
              >
                {{ col.label }}
                <ChevronUp v-if="sortKey === col.key && sortDir === 'asc'" class="h-3.5 w-3.5" />
                <ChevronDown v-else-if="sortKey === col.key && sortDir === 'desc'" class="h-3.5 w-3.5" />
              </button>
              <span v-else>{{ col.label }}</span>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 bg-white">
          <tr
            v-for="(row, i) in paged"
            :key="i"
            :class="clickable ? 'cursor-pointer hover:bg-slate-50' : ''"
            @click="clickable && $emit('rowClick', row)"
          >
            <td v-for="col in columns" :key="col.key" class="whitespace-nowrap px-4 py-3 text-slate-700">
              <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]">
                {{ row[col.key] ?? '—' }}
              </slot>
            </td>
          </tr>
          <tr v-if="paged.length === 0">
            <td :colspan="columns.length" class="px-4 py-8 text-center text-slate-400">Tiada rekod ditemui</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="totalPages > 1" class="flex items-center justify-between text-sm text-slate-600">
      <span>{{ filtered.length }} rekod &middot; Halaman {{ currentPage }} / {{ totalPages }}</span>
      <div class="flex gap-1">
        <button
          class="rounded-md border border-slate-300 p-1.5 hover:bg-slate-50 disabled:opacity-40"
          :disabled="currentPage <= 1"
          @click="currentPage--"
        >
          <ChevronLeft class="h-4 w-4" />
        </button>
        <button
          class="rounded-md border border-slate-300 p-1.5 hover:bg-slate-50 disabled:opacity-40"
          :disabled="currentPage >= totalPages"
          @click="currentPage++"
        >
          <ChevronRight class="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
</template>
