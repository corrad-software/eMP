<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";

export type CalendarEvent = {
  id: number | string;
  title: string;
  date: string; // YYYY-MM-DD
  time?: string;
  color?: string;
  type?: string;
};

const props = defineProps<{
  events?: CalendarEvent[];
  view?: "month" | "week" | "day";
}>();

defineEmits<{ dateClick: [date: string]; eventClick: [event: CalendarEvent] }>();

const today = new Date();
const currentMonth = ref(today.getMonth());
const currentYear = ref(today.getFullYear());
const currentDay = ref(today.getDate());
const currentView = ref<"month" | "week" | "day">(props.view ?? "month");

watch(() => props.view, (v) => { if (v) currentView.value = v; });

const monthNames = ["Januari", "Februari", "Mac", "April", "Mei", "Jun", "Julai", "Ogos", "September", "Oktober", "November", "Disember"];
const dayNames = ["Ahd", "Isn", "Sel", "Rab", "Kha", "Jum", "Sab"];
const dayNamesFull = ["Ahad", "Isnin", "Selasa", "Rabu", "Khamis", "Jumaat", "Sabtu"];

const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

const eventColors: Record<string, string> = {
  mention: "bg-blue-500",
  hearing: "bg-violet-500",
  conference: "bg-amber-500",
  mediation: "bg-emerald-500",
  administrative: "bg-slate-400",
};

// --- Helpers ---

function formatDateStr(y: number, m: number, d: number) {
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function currentDate() {
  return new Date(currentYear.value, currentMonth.value, currentDay.value);
}

function eventsForDate(dateStr: string) {
  return (props.events ?? []).filter((e) => e.date === dateStr);
}

// --- Month view ---

const monthDays = computed(() => {
  const first = new Date(currentYear.value, currentMonth.value, 1);
  const startDay = first.getDay();
  const daysInMonth = new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
  const cells: { date: number; inMonth: boolean; dateStr: string }[] = [];

  const prevDays = new Date(currentYear.value, currentMonth.value, 0).getDate();
  for (let i = startDay - 1; i >= 0; i--) {
    const d = prevDays - i;
    const m = currentMonth.value === 0 ? 12 : currentMonth.value;
    const y = currentMonth.value === 0 ? currentYear.value - 1 : currentYear.value;
    cells.push({ date: d, inMonth: false, dateStr: formatDateStr(y, m, d) });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: d, inMonth: true, dateStr: formatDateStr(currentYear.value, currentMonth.value + 1, d) });
  }

  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    const m = currentMonth.value + 2;
    const y = m > 12 ? currentYear.value + 1 : currentYear.value;
    cells.push({ date: d, inMonth: false, dateStr: formatDateStr(y, m > 12 ? 1 : m, d) });
  }

  return cells;
});

// --- Week view ---

const weekDays = computed(() => {
  const d = currentDate();
  const dayOfWeek = d.getDay(); // 0=Sun
  const sunday = new Date(d);
  sunday.setDate(d.getDate() - dayOfWeek);

  const cells: { date: number; inMonth: boolean; dateStr: string; dayName: string }[] = [];
  for (let i = 0; i < 7; i++) {
    const cur = new Date(sunday);
    cur.setDate(sunday.getDate() + i);
    cells.push({
      date: cur.getDate(),
      inMonth: cur.getMonth() === currentMonth.value,
      dateStr: formatDateStr(cur.getFullYear(), cur.getMonth() + 1, cur.getDate()),
      dayName: dayNames[i],
    });
  }
  return cells;
});

const weekRangeLabel = computed(() => {
  const cells = weekDays.value;
  const first = cells[0];
  const last = cells[6];
  const firstDate = new Date(first.dateStr);
  const lastDate = new Date(last.dateStr);
  const firstMonth = monthNames[firstDate.getMonth()];
  const lastMonth = monthNames[lastDate.getMonth()];
  if (firstMonth === lastMonth) {
    return `${first.date} - ${last.date} ${firstMonth} ${firstDate.getFullYear()}`;
  }
  return `${first.date} ${firstMonth} - ${last.date} ${lastMonth} ${lastDate.getFullYear()}`;
});

// --- Day view ---

const dayHours = computed(() => {
  const slots: { hour: number; label: string }[] = [];
  for (let h = 8; h <= 18; h++) {
    slots.push({ hour: h, label: `${String(h).padStart(2, "0")}:00` });
  }
  return slots;
});

const currentDayStr = computed(() => {
  return formatDateStr(currentYear.value, currentMonth.value + 1, currentDay.value);
});

const dayLabel = computed(() => {
  const d = currentDate();
  const dayName = dayNamesFull[d.getDay()];
  return `${dayName}, ${currentDay.value} ${monthNames[currentMonth.value]} ${currentYear.value}`;
});

function eventsForHour(hour: number) {
  const dateStr = currentDayStr.value;
  const hourStr = String(hour).padStart(2, "0");
  return (props.events ?? []).filter((e) => {
    if (e.date !== dateStr) return false;
    if (!e.time) return hour === 8; // events with no time go to first slot
    return e.time.startsWith(hourStr + ":");
  });
}

// --- Header label ---

const headerLabel = computed(() => {
  if (currentView.value === "month") return `${monthNames[currentMonth.value]} ${currentYear.value}`;
  if (currentView.value === "week") return weekRangeLabel.value;
  return dayLabel.value;
});

// --- Navigation ---

function prev() {
  if (currentView.value === "month") {
    if (currentMonth.value === 0) { currentMonth.value = 11; currentYear.value--; }
    else currentMonth.value--;
  } else if (currentView.value === "week") {
    const d = currentDate();
    d.setDate(d.getDate() - 7);
    currentYear.value = d.getFullYear();
    currentMonth.value = d.getMonth();
    currentDay.value = d.getDate();
  } else {
    const d = currentDate();
    d.setDate(d.getDate() - 1);
    currentYear.value = d.getFullYear();
    currentMonth.value = d.getMonth();
    currentDay.value = d.getDate();
  }
}

function next() {
  if (currentView.value === "month") {
    if (currentMonth.value === 11) { currentMonth.value = 0; currentYear.value++; }
    else currentMonth.value++;
  } else if (currentView.value === "week") {
    const d = currentDate();
    d.setDate(d.getDate() + 7);
    currentYear.value = d.getFullYear();
    currentMonth.value = d.getMonth();
    currentDay.value = d.getDate();
  } else {
    const d = currentDate();
    d.setDate(d.getDate() + 1);
    currentYear.value = d.getFullYear();
    currentMonth.value = d.getMonth();
    currentDay.value = d.getDate();
  }
}
</script>

<template>
  <div class="rounded-xl border border-slate-200 bg-white">
    <!-- Header -->
    <div class="flex items-center justify-between border-b border-slate-200 px-5 py-3">
      <div class="flex items-center gap-2">
        <button class="rounded-md p-1.5 hover:bg-slate-100" @click="prev">
          <ChevronLeft class="h-5 w-5 text-slate-600" />
        </button>
        <h3 class="text-sm font-semibold text-slate-900">{{ headerLabel }}</h3>
        <button class="rounded-md p-1.5 hover:bg-slate-100" @click="next">
          <ChevronRight class="h-5 w-5 text-slate-600" />
        </button>
      </div>

      <!-- View toggle -->
      <div class="inline-flex rounded-lg bg-slate-200/60 p-1 text-sm">
        <button
          :class="currentView === 'month' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'"
          class="rounded-md px-3 py-1 font-medium transition-all"
          @click="currentView = 'month'"
        >
          Bulan
        </button>
        <button
          :class="currentView === 'week' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'"
          class="rounded-md px-3 py-1 font-medium transition-all"
          @click="currentView = 'week'"
        >
          Minggu
        </button>
        <button
          :class="currentView === 'day' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'"
          class="rounded-md px-3 py-1 font-medium transition-all"
          @click="currentView = 'day'"
        >
          Hari
        </button>
      </div>
    </div>

    <!-- ========== MONTH VIEW ========== -->
    <template v-if="currentView === 'month'">
      <!-- Day names -->
      <div class="grid grid-cols-7 border-b border-slate-100">
        <div v-for="name in dayNames" :key="name" class="px-2 py-2 text-center text-xs font-semibold uppercase tracking-wide text-slate-400">
          {{ name }}
        </div>
      </div>

      <!-- Calendar grid -->
      <div class="grid grid-cols-7">
        <div
          v-for="(cell, i) in monthDays"
          :key="i"
          class="min-h-[80px] border-b border-r border-slate-100 p-1.5 last:border-r-0 [&:nth-child(7n)]:border-r-0 cursor-pointer hover:bg-slate-50"
          :class="!cell.inMonth ? 'bg-slate-50/50' : ''"
          @click="$emit('dateClick', cell.dateStr)"
        >
          <span
            class="inline-flex h-6 w-6 items-center justify-center rounded-full text-xs"
            :class="[
              cell.dateStr === todayStr ? 'bg-slate-900 font-bold text-white' : '',
              !cell.inMonth ? 'text-slate-300' : 'text-slate-700',
            ]"
          >
            {{ cell.date }}
          </span>
          <div class="mt-0.5 space-y-0.5">
            <div
              v-for="event in eventsForDate(cell.dateStr).slice(0, 2)"
              :key="event.id"
              class="truncate rounded px-1 py-0.5 text-[10px] font-medium text-white"
              :class="eventColors[event.type ?? ''] ?? event.color ?? 'bg-blue-500'"
              @click.stop="$emit('eventClick', event)"
            >
              {{ event.time ? `${event.time} ` : '' }}{{ event.title }}
            </div>
            <div v-if="eventsForDate(cell.dateStr).length > 2" class="px-1 text-[10px] text-slate-400">
              +{{ eventsForDate(cell.dateStr).length - 2 }} lagi
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- ========== WEEK VIEW ========== -->
    <template v-else-if="currentView === 'week'">
      <!-- Day names with dates -->
      <div class="grid grid-cols-7 border-b border-slate-100">
        <div v-for="cell in weekDays" :key="cell.dateStr" class="px-2 py-2 text-center">
          <div class="text-xs font-semibold uppercase tracking-wide text-slate-400">{{ cell.dayName }}</div>
          <span
            class="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full text-sm"
            :class="cell.dateStr === todayStr ? 'bg-slate-900 font-bold text-white' : 'text-slate-600'"
          >
            {{ cell.date }}
          </span>
        </div>
      </div>

      <!-- Week cells -->
      <div class="grid grid-cols-7">
        <div
          v-for="cell in weekDays"
          :key="cell.dateStr"
          class="min-h-[120px] border-r border-slate-100 p-2 last:border-r-0 cursor-pointer hover:bg-slate-50"
          :class="cell.dateStr === todayStr ? 'bg-blue-50/40' : ''"
          @click="$emit('dateClick', cell.dateStr)"
        >
          <div class="space-y-1">
            <div
              v-for="event in eventsForDate(cell.dateStr)"
              :key="event.id"
              class="rounded px-2 py-1.5 text-xs font-medium text-white cursor-pointer"
              :class="eventColors[event.type ?? ''] ?? event.color ?? 'bg-blue-500'"
              @click.stop="$emit('eventClick', event)"
            >
              <div v-if="event.time" class="text-[10px] opacity-80">{{ event.time }}</div>
              <div class="truncate">{{ event.title }}</div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- ========== DAY VIEW ========== -->
    <template v-else>
      <div class="divide-y divide-slate-100">
        <div
          v-for="slot in dayHours"
          :key="slot.hour"
          class="flex min-h-[56px] cursor-pointer hover:bg-slate-50"
          @click="$emit('dateClick', currentDayStr)"
        >
          <!-- Time label -->
          <div class="w-20 flex-shrink-0 border-r border-slate-100 px-3 py-2 text-right text-xs font-medium text-slate-400">
            {{ slot.label }}
          </div>

          <!-- Events in this slot -->
          <div class="flex-1 p-2 space-y-1">
            <div
              v-for="event in eventsForHour(slot.hour)"
              :key="event.id"
              class="rounded px-3 py-2 text-sm font-medium text-white cursor-pointer"
              :class="eventColors[event.type ?? ''] ?? event.color ?? 'bg-blue-500'"
              @click.stop="$emit('eventClick', event)"
            >
              <span v-if="event.time" class="mr-2 text-xs opacity-80">{{ event.time }}</span>
              {{ event.title }}
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
