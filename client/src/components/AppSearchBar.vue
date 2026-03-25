<script setup lang="ts">
import { ref } from "vue";
import { Search, SlidersHorizontal } from "lucide-vue-next";

defineProps<{
  placeholder?: string;
  filters?: { key: string; label: string; options: { value: string; label: string }[] }[];
}>();

const emit = defineEmits<{
  search: [query: string];
  filterChange: [key: string, value: string];
}>();

const query = ref("");
const showFilters = ref(false);

function handleSearch() {
  emit("search", query.value);
}
</script>

<template>
  <div class="space-y-3">
    <div class="flex gap-2">
      <div class="relative flex-1">
        <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          v-model="query"
          type="text"
          :placeholder="placeholder ?? 'Cari...'"
          class="h-10 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
          @keydown.enter="handleSearch"
        />
      </div>
      <button
        v-if="filters?.length"
        class="flex h-10 items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
        @click="showFilters = !showFilters"
      >
        <SlidersHorizontal class="h-4 w-4" />
        Tapis
      </button>
      <button
        class="h-10 rounded-lg bg-slate-900 px-4 text-sm font-medium text-white hover:bg-slate-800"
        @click="handleSearch"
      >
        Cari
      </button>
    </div>
    <div v-if="showFilters && filters?.length" class="flex flex-wrap gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
      <div v-for="filter in filters" :key="filter.key" class="flex items-center gap-2">
        <label class="text-xs font-medium text-slate-600">{{ filter.label }}</label>
        <select
          class="h-8 rounded-md border border-slate-300 bg-white px-2 text-xs text-slate-700 focus:border-slate-400 focus:outline-none"
          @change="emit('filterChange', filter.key, ($event.target as HTMLSelectElement).value)"
        >
          <option value="">Semua</option>
          <option v-for="opt in filter.options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
        </select>
      </div>
    </div>
  </div>
</template>
