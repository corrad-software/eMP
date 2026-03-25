import type { Component } from "vue";
import {
  BarChart3,
  BookOpen,
  Bot,
  Cable,
  Calendar,
  ClipboardList,
  Cog,
  Database,
  Eye,
  FileInput,
  FileSearch,
  FileText,
  Gauge,
  Gavel,
  Globe,
  Image,
  LayoutGrid,
  Link2,
  ListChecks,
  Mail,
  Menu,
  MessageSquare,
  Monitor,
  Scale,
  Settings,
  Shield,
} from "lucide-vue-next";

export type MenuNode = {
  id: string;
  label: string;
  to: string;
  children?: MenuNode[];
};

export type MenuItemDef = MenuNode & {
  icon: Component;
};

export type MenuGroupDef = {
  id: string;
  label: string;
  items: MenuItemDef[];
};

export type AdminMenuPrefs = {
  groupOrder: string[];
  itemOrder: Record<string, string[]>;
  childOrder: Record<string, string[]>;
  grandchildOrder: Record<string, string[]>;
  hidden: string[];
  hiddenChildren: string[];
  hiddenGrandchildren: string[];
  hiddenGroups: string[];
};

export const DEFAULT_MENU: MenuGroupDef[] = [
  {
    id: "dashboard",
    label: "",
    items: [
      { id: "main-dashboard", label: "Dashboard", to: "/admin", icon: Gauge },
    ],
  },
  {
    id: "portal",
    label: "Portal & Kandungan",
    items: [
      { id: "portal-site", label: "Lihat Portal", to: "/portal", icon: Globe },
      { id: "dashboard", label: "Dashboard", to: "/admin/portal/dashboard", icon: Gauge },
      {
        id: "posts",
        label: "Posts",
        to: "/admin/posts",
        icon: FileText,
        children: [
          { id: "posts-all", label: "All Posts", to: "/admin/posts" },
          { id: "posts-new", label: "Add New", to: "/admin/posts/new" },
          { id: "posts-categories", label: "Categories", to: "/admin/categories" },
        ],
      },
      {
        id: "pages",
        label: "Pages",
        to: "/admin/pages",
        icon: FileText,
        children: [
          { id: "pages-all", label: "All Pages", to: "/admin/pages" },
          { id: "pages-new", label: "Add New", to: "/admin/pages/new" },
        ],
      },
      {
        id: "media",
        label: "Media",
        to: "/admin/media",
        icon: Image,
        children: [{ id: "media-library", label: "Library", to: "/admin/media" }],
      },
      { id: "storefront-menu", label: "Menus", to: "/admin/webfront-menu", icon: Link2 },
      { id: "webfront-settings", label: "Settings", to: "/admin/webfront-settings", icon: Settings },
    ],
  },
  {
    id: "pengurusan-kes",
    label: "Pengurusan Kes",
    items: [
      {
        id: "pendaftaran-kes",
        label: "Pendaftaran Kes",
        to: "/admin/kes/daftar",
        icon: ClipboardList,
        children: [
          { id: "kes-daftar-senarai", label: "Senarai Pendaftaran", to: "/admin/kes/daftar" },
          { id: "kes-daftar-baru", label: "Daftar Baru", to: "/admin/kes/daftar/baru" },
        ],
      },
      {
        id: "pengurusan-kes-item",
        label: "Pengurusan Kes",
        to: "/admin/kes",
        icon: Gavel,
        children: [
          { id: "kes-senarai", label: "Semua Kes", to: "/admin/kes" },
        ],
      },
      {
        id: "perjanjian-kolektif",
        label: "Perjanjian Kolektif",
        to: "/admin/kes/ca",
        icon: Scale,
        children: [
          { id: "ca-senarai", label: "Semua CA", to: "/admin/kes/ca" },
          { id: "ca-baru", label: "Daftar Baru", to: "/admin/kes/ca/baru" },
        ],
      },
      {
        id: "efiling",
        label: "e-Filing & e-Services",
        to: "/admin/efiling",
        icon: FileInput,
        children: [
          { id: "efiling-senarai", label: "Semua Pemfailan", to: "/admin/efiling" },
          { id: "efiling-baru", label: "Pemfailan Baru", to: "/admin/efiling/baru" },
        ],
      },
      {
        id: "esebutan",
        label: "e-Sebutan",
        to: "/admin/esebutan",
        icon: MessageSquare,
      },
    ],
  },
  {
    id: "operasi-mahkamah",
    label: "Operasi Mahkamah",
    items: [
      {
        id: "notis",
        label: "Pengurusan Notis",
        to: "/admin/notis",
        icon: ListChecks,
        children: [
          { id: "notis-dashboard", label: "Dashboard Kerja", to: "/admin/notis" },
          { id: "notis-tetapan", label: "Tetapan Notis", to: "/admin/notis/tetapan" },
        ],
      },
      {
        id: "jadual",
        label: "Jadual Mahkamah",
        to: "/admin/jadual",
        icon: Calendar,
      },
      {
        id: "carian-pintar",
        label: "Carian Pintar",
        to: "/admin/carian",
        icon: FileSearch,
      },
      {
        id: "signage",
        label: "Paparan Digital",
        to: "/admin/signage",
        icon: Monitor,
      },
    ],
  },
  {
    id: "analitik",
    label: "Analitik",
    items: [
      {
        id: "laporan",
        label: "Dashboard & Laporan",
        to: "/admin/laporan",
        icon: BarChart3,
        children: [
          { id: "laporan-dashboard", label: "Dashboard KPI", to: "/admin/laporan" },
          { id: "laporan-senarai", label: "Senarai Laporan", to: "/admin/laporan/senarai" },
        ],
      },
    ],
  },
  {
    id: "core-platform",
    label: "Core Platform",
    items: [
      {
        id: "identity-access",
        label: "Identity & Access",
        to: "/admin/platform/identity",
        icon: Shield,
        children: [
          { id: "platform-auth", label: "Authentication", to: "/admin/platform/identity/users",
            children: [
              { id: "platform-users-all", label: "All Users", to: "/admin/platform/identity/users" },
              { id: "platform-users-new", label: "Add User", to: "/admin/platform/identity/users/new" },
            ],
          },
          { id: "platform-rbac", label: "RBAC", to: "/admin/platform/identity/roles" },
          { id: "platform-tokens", label: "Token Management", to: "/admin/platform/identity/tokens" },
        ],
      },
      {
        id: "observability",
        label: "Observability",
        to: "/admin/platform/observability",
        icon: Eye,
        children: [
          { id: "platform-audit-trail", label: "Audit Trail", to: "/admin/platform/observability/audit-trail" },
          { id: "platform-activity-log", label: "Activity Log", to: "/admin/platform/observability/activity-log" },
          { id: "platform-logging", label: "Logging", to: "/admin/platform/observability/logging" },
          { id: "platform-error-tracking", label: "Error Tracking", to: "/admin/platform/observability/errors" },
          { id: "platform-monitoring", label: "Monitoring", to: "/admin/platform/observability/monitoring" },
        ],
      },
      {
        id: "queue",
        label: "Queue",
        to: "/admin/platform/queue",
        icon: ListChecks,
        children: [
          { id: "platform-queue-dashboard", label: "Dashboard", to: "/admin/platform/queue" },
          { id: "platform-queue-failed", label: "Failed Jobs", to: "/admin/platform/queue/failed" },
          { id: "platform-queue-scheduled", label: "Scheduled Jobs", to: "/admin/platform/queue/scheduled" },
        ],
      },
      {
        id: "messaging",
        label: "Messaging",
        to: "/admin/platform/messaging",
        icon: Mail,
        children: [
          { id: "platform-event-bus", label: "Event Bus", to: "/admin/platform/messaging/event-bus" },
          { id: "platform-notifications", label: "Notifications", to: "/admin/platform/messaging/notifications" },
        ],
      },
      {
        id: "system-management",
        label: "System Management",
        to: "/admin/platform/system",
        icon: Cog,
        children: [
          { id: "platform-scheduler", label: "Scheduler", to: "/admin/platform/system/scheduler" },
          { id: "platform-config", label: "Configuration", to: "/admin/platform/system/configuration" },
          { id: "platform-feature-flags", label: "Feature Flags", to: "/admin/platform/system/feature-flags" },
          { id: "platform-file-media", label: "File / Media", to: "/admin/platform/storage/media" },
        ],
      },
      {
        id: "api-gateway",
        label: "API Gateway",
        to: "/admin/platform/gateway",
        icon: Cable,
        children: [
          { id: "platform-gateway-routes", label: "Routes", to: "/admin/platform/gateway/routes" },
          { id: "platform-gateway-upstreams", label: "Upstreams", to: "/admin/platform/gateway/upstreams" },
          { id: "platform-gateway-consumers", label: "Consumers", to: "/admin/platform/gateway/consumers" },
          { id: "platform-gateway-plugins", label: "Plugins", to: "/admin/platform/gateway/plugins" },
          { id: "platform-gateway-ssl", label: "SSL Certificates", to: "/admin/platform/gateway/ssl" },
          { id: "platform-webhooks", label: "Webhooks", to: "/admin/platform/gateway/webhooks" },
        ],
      },
      {
        id: "ai-integration",
        label: "AI Integration",
        to: "/admin/platform/ai",
        icon: Bot,
        children: [
          { id: "platform-ai-providers", label: "AI Providers", to: "/admin/platform/ai/providers" },
          { id: "platform-ai-models", label: "AI Models", to: "/admin/platform/ai/models" },
          { id: "platform-ai-prompts", label: "Prompt Templates", to: "/admin/platform/ai/prompts" },
          { id: "platform-ai-usage", label: "AI Usage & Billing", to: "/admin/platform/ai/usage" },
        ],
      },
    ],
  },
  {
    id: "administration",
    label: "Administration",
    items: [
      { id: "menus", label: "Menus", to: "/admin/menus", icon: Menu },
      {
        id: "settings",
        label: "Settings",
        to: "/admin/settings",
        icon: Settings,
        children: [
          { id: "settings-general", label: "General", to: "/admin/settings" },
          { id: "settings-system", label: "System", to: "/admin/settings/system" },
        ],
      },
    ],
  },
  {
    id: "development",
    label: "Development",
    items: [
      { id: "developers-guide", label: "Developers Guide", to: "/admin/development/developers-guide", icon: BookOpen },
      { id: "database-schema", label: "Database Schema", to: "/admin/development/database-schema", icon: Database },
      { id: "api-explorer", label: "API Explorer", to: "/admin/development/api-explorer", icon: Cable },
      {
        id: "kitchen-sink",
        label: "Kitchen Sink",
        to: "/admin/kitchen-sink",
        icon: LayoutGrid,
        children: [
          { id: "kitchen-components", label: "Components", to: "/admin/kitchen-sink" },
          { id: "kitchen-forms", label: "Forms", to: "/admin/kitchen-sink/forms" },
          { id: "kitchen-charts", label: "Charts", to: "/admin/kitchen-sink/charts" },
        ],
      },
    ],
  },
];
