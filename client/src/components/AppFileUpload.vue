<script setup lang="ts">
import { ref } from "vue";
import { Upload, File as FileIcon, X } from "lucide-vue-next";

defineProps<{
  accept?: string;
  maxSizeMb?: number;
  multiple?: boolean;
}>();

const files = ref<{ name: string; size: string }[]>([]);
const isDragOver = ref(false);

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
}

function handleFiles(fileList: FileList | null) {
  if (!fileList) return;
  for (let i = 0; i < fileList.length; i++) {
    files.value.push({ name: fileList[i].name, size: formatSize(fileList[i].size) });
  }
}

function removeFile(index: number) {
  files.value.splice(index, 1);
}
</script>

<template>
  <div class="space-y-3">
    <div
      class="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center transition-colors"
      :class="isDragOver ? 'border-blue-400 bg-blue-50' : 'border-slate-300 bg-slate-50 hover:border-slate-400'"
      @dragover.prevent="isDragOver = true"
      @dragleave="isDragOver = false"
      @drop.prevent="isDragOver = false; handleFiles(($event as DragEvent).dataTransfer?.files ?? null)"
    >
      <Upload class="h-8 w-8 text-slate-400" />
      <p class="mt-2 text-sm font-medium text-slate-700">Seret & lepas fail di sini</p>
      <p class="mt-1 text-xs text-slate-500">atau</p>
      <label class="mt-2 cursor-pointer rounded-lg bg-white px-4 py-2 text-sm font-medium text-blue-600 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50">
        Pilih Fail
        <input type="file" class="hidden" :accept="accept" :multiple="multiple" @change="handleFiles(($event.target as HTMLInputElement).files)" />
      </label>
      <p v-if="maxSizeMb" class="mt-2 text-xs text-slate-400">Saiz maksimum: {{ maxSizeMb }} MB</p>
    </div>

    <ul v-if="files.length" class="space-y-2">
      <li v-for="(file, i) in files" :key="i" class="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2">
        <FileIcon class="h-4 w-4 shrink-0 text-slate-400" />
        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-medium text-slate-700">{{ file.name }}</p>
          <p class="text-xs text-slate-400">{{ file.size }}</p>
        </div>
        <button class="shrink-0 text-slate-400 hover:text-rose-500" @click="removeFile(i)">
          <X class="h-4 w-4" />
        </button>
      </li>
    </ul>
  </div>
</template>
