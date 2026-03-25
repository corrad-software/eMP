import { createRouter, createWebHistory } from "vue-router";
import type { RouteLocationGeneric, RouteRecordRaw } from "vue-router";

import DashboardView from "@/views/DashboardView.vue";
import MainDashboardView from "@/views/MainDashboardView.vue";
import KitchenChartsView from "@/views/KitchenChartsView.vue";
import KitchenFormsView from "@/views/KitchenFormsView.vue";
import LoginView from "@/views/LoginView.vue";
import MediaLibraryView from "@/views/MediaLibraryView.vue";
import KitchenSinkView from "@/views/KitchenSinkView.vue";
import PageEditorView from "@/views/PageEditorView.vue";
import PagesListView from "@/views/PagesListView.vue";
import PostEditorView from "@/views/PostEditorView.vue";
import PostsListView from "@/views/PostsListView.vue";
import CategoriesListView from "@/views/CategoriesListView.vue";
import CategoryEditorView from "@/views/CategoryEditorView.vue";
import DatabaseSchemaView from "@/views/DatabaseSchemaView.vue";
import DevelopersGuideView from "@/views/DevelopersGuideView.vue";
import ApiManagementView from "@/views/ApiManagementView.vue";
import MenusView from "@/views/MenusView.vue";
import StorefrontMenuView from "@/views/StorefrontMenuView.vue";
import WebfrontSettingsView from "@/views/WebfrontSettingsView.vue";
import AuditLogsView from "@/views/AuditLogsView.vue";
import QueueMonitorView from "@/views/QueueMonitorView.vue";
import ComingSoonView from "@/views/ComingSoonView.vue";
import RolesView from "@/views/RolesView.vue";
import SettingsView from "@/views/SettingsView.vue";
import SystemInfoView from "@/views/SystemInfoView.vue";
import UsersView from "@/views/UsersView.vue";
import UserEditView from "@/views/UserEditView.vue";
import StorefrontHomeView from "@/views/StorefrontHomeView.vue";
import StorefrontPageView from "@/views/StorefrontPageView.vue";
import { useAuthStore } from "@/stores/auth";
import { useSiteStore } from "@/stores/site";

const legacyAdminPaths = [
  "/login",
  "/portal/dashboard",
  "/posts",
  "/posts/new",
  "/posts/:id",
  "/categories",
  "/categories/new",
  "/categories/:id",
  "/pages",
  "/pages/new",
  "/pages/:id",
  "/media",
  "/menus",
  "/webfront-menu",
  "/webfront-settings",
  "/storefront-menu",
  "/kitchen-sink",
  "/kitchen-sink/forms",
  "/kitchen-sink/charts",
  "/development/database-schema",
  "/development/api-management",
  "/profile",
  "/settings",
  "/settings/users",
  "/settings/users/new",
  "/settings/users/:id",
  "/settings/roles",
  "/settings/audit-logs",
  "/settings/queue-monitor",
  "/settings/system",
];

// Backward-compat redirects: old /admin/settings/* → new /admin/platform/* paths
const settingsRedirects: RouteRecordRaw[] = [
  { path: "/admin/settings/users", redirect: "/admin/platform/identity/users" },
  { path: "/admin/settings/users/new", redirect: "/admin/platform/identity/users/new" },
  { path: "/admin/settings/users/:id", redirect: (to: RouteLocationGeneric) => `/admin/platform/identity/users/${String(to.params.id ?? "")}` },
  { path: "/admin/settings/roles", redirect: "/admin/platform/identity/roles" },
  { path: "/admin/settings/audit-logs", redirect: "/admin/platform/observability/audit-trail" },
  { path: "/admin/settings/queue-monitor", redirect: "/admin/platform/queue" },
];

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/admin/login", name: "login", component: LoginView, meta: { guestOnly: true, title: "Login" } },
    { path: "/admin", name: "main-dashboard", component: MainDashboardView, meta: { requiresAuth: true, title: "Main Dashboard" } },
    { path: "/admin/portal/dashboard", name: "dashboard", component: DashboardView, meta: { requiresAuth: true, title: "Dashboard" } },
    { path: "/admin/posts", name: "posts", component: PostsListView, meta: { requiresAuth: true, title: "Posts" } },
    { path: "/admin/posts/new", name: "post-create", component: PostEditorView, meta: { requiresAuth: true, title: "New Post" } },
    { path: "/admin/posts/:id", name: "post-edit", component: PostEditorView, meta: { requiresAuth: true, title: "Edit Post" } },
    { path: "/admin/categories", name: "categories", component: CategoriesListView, meta: { requiresAuth: true, title: "Categories" } },
    { path: "/admin/categories/new", name: "category-create", component: CategoryEditorView, meta: { requiresAuth: true, title: "New Category" } },
    { path: "/admin/categories/:id", name: "category-edit", component: CategoryEditorView, meta: { requiresAuth: true, title: "Edit Category" } },
    { path: "/admin/pages", name: "pages", component: PagesListView, meta: { requiresAuth: true, title: "Pages" } },
    { path: "/admin/pages/new", name: "page-create", component: PageEditorView, meta: { requiresAuth: true, title: "New Page" } },
    { path: "/admin/pages/:id", name: "page-edit", component: PageEditorView, meta: { requiresAuth: true, title: "Edit Page" } },
    { path: "/admin/media", name: "media", component: MediaLibraryView, meta: { requiresAuth: true, title: "Media" } },
    { path: "/admin/webfront-menu", name: "storefront-menu", component: StorefrontMenuView, meta: { requiresAuth: true, title: "Menus" } },
    { path: "/admin/storefront-menu", redirect: "/admin/webfront-menu" },
    { path: "/admin/webfront-settings", name: "webfront-settings", component: WebfrontSettingsView, meta: { requiresAuth: true, title: "Settings" } },
    { path: "/admin/menus", name: "menus", component: MenusView, meta: { requiresAuth: true, title: "Menus" } },
    { path: "/admin/kitchen-sink", name: "kitchen-sink", component: KitchenSinkView, meta: { requiresAuth: true, title: "Kitchen Sink" } },
    { path: "/admin/kitchen-sink/forms", name: "kitchen-forms", component: KitchenFormsView, meta: { requiresAuth: true, title: "Forms" } },
    { path: "/admin/kitchen-sink/charts", name: "kitchen-charts", component: KitchenChartsView, meta: { requiresAuth: true, title: "Charts" } },
    { path: "/admin/development/developers-guide", name: "developers-guide", component: DevelopersGuideView, meta: { requiresAuth: true, title: "Developers Guide" } },
    { path: "/admin/development/database-schema", name: "database-schema", component: DatabaseSchemaView, meta: { requiresAuth: true, title: "Database Schema" } },
    { path: "/admin/development/api-explorer", name: "api-explorer", component: ApiManagementView, meta: { requiresAuth: true, title: "API Explorer" } },
    { path: "/admin/development/api-management", redirect: "/admin/development/api-explorer" },
    {
      path: "/admin/profile",
      name: "profile",
      meta: { requiresAuth: true },
      beforeEnter: async () => {
        const auth = useAuthStore();
        await auth.initialize();
        if (auth.user?.id) return `/admin/platform/identity/users/${auth.user.id}`;
        return { name: "login" };
      },
      component: { template: "" },
    },

    // ── Administration ──
    { path: "/admin/settings", name: "settings", component: SettingsView, meta: { requiresAuth: true, title: "Settings" } },
    { path: "/admin/settings/system", name: "settings-system", component: SystemInfoView, meta: { requiresAuth: true, title: "System Info" } },

    // ── Core Platform: Identity & Access ──
    { path: "/admin/platform/identity", redirect: "/admin/platform/identity/users" },
    { path: "/admin/platform/identity/users", name: "platform-users", component: UsersView, meta: { requiresAuth: true, title: "Users" } },
    { path: "/admin/platform/identity/users/new", name: "platform-user-create", component: UserEditView, meta: { requiresAuth: true, title: "New User" } },
    { path: "/admin/platform/identity/users/:id", name: "platform-user-edit", component: UserEditView, meta: { requiresAuth: true, title: "Edit User" } },
    { path: "/admin/platform/identity/roles", name: "platform-rbac", component: RolesView, meta: { requiresAuth: true, title: "RBAC" } },
    { path: "/admin/platform/identity/tokens", name: "platform-tokens", component: ComingSoonView, meta: { requiresAuth: true, title: "Token Management" } },

    // ── Core Platform: Observability (Grafana) ──
    { path: "/admin/platform/observability", redirect: "/admin/platform/observability/audit-trail" },
    { path: "/admin/platform/observability/audit-trail", name: "platform-audit-trail", component: AuditLogsView, meta: { requiresAuth: true, title: "Audit Trail" } },
    { path: "/admin/platform/observability/activity-log", name: "platform-activity-log", component: ComingSoonView, meta: { requiresAuth: true, title: "Activity Log" } },
    { path: "/admin/platform/observability/logging", name: "platform-logging", component: ComingSoonView, meta: { requiresAuth: true, title: "Logging" } },
    { path: "/admin/platform/observability/errors", name: "platform-error-tracking", component: ComingSoonView, meta: { requiresAuth: true, title: "Error Tracking" } },
    { path: "/admin/platform/observability/monitoring", name: "platform-monitoring", component: ComingSoonView, meta: { requiresAuth: true, title: "Monitoring" } },

    // ── Core Platform: Queue (Laravel Queue) ──
    { path: "/admin/platform/queue", name: "platform-queue", component: QueueMonitorView, meta: { requiresAuth: true, title: "Queue" } },
    { path: "/admin/platform/queue/failed", name: "platform-queue-failed", component: ComingSoonView, meta: { requiresAuth: true, title: "Failed Jobs" } },
    { path: "/admin/platform/queue/scheduled", name: "platform-queue-scheduled", component: ComingSoonView, meta: { requiresAuth: true, title: "Scheduled Jobs" } },

    // ── Core Platform: Messaging ──
    { path: "/admin/platform/messaging", redirect: "/admin/platform/messaging/event-bus" },
    { path: "/admin/platform/messaging/event-bus", name: "platform-event-bus", component: ComingSoonView, meta: { requiresAuth: true, title: "Event Bus" } },
    { path: "/admin/platform/messaging/notifications", name: "platform-notifications", component: ComingSoonView, meta: { requiresAuth: true, title: "Notifications" } },

    // ── Backward-compat redirects from old governance/communication paths ──
    { path: "/admin/platform/governance", redirect: "/admin/platform/observability/audit-trail" },
    { path: "/admin/platform/governance/audit-trail", redirect: "/admin/platform/observability/audit-trail" },
    { path: "/admin/platform/governance/activity-log", redirect: "/admin/platform/observability/activity-log" },
    { path: "/admin/platform/communication", redirect: "/admin/platform/messaging/notifications" },
    { path: "/admin/platform/communication/notifications", redirect: "/admin/platform/messaging/notifications" },
    { path: "/admin/platform/messaging/queue", redirect: "/admin/platform/queue" },
    { path: "/admin/platform/messaging/queue/failed", redirect: "/admin/platform/queue/failed" },
    { path: "/admin/platform/messaging/queue/scheduled", redirect: "/admin/platform/queue/scheduled" },

    // ── Core Platform: System Management ──
    { path: "/admin/platform/system", redirect: "/admin/platform/system/configuration" },
    { path: "/admin/platform/system/configuration", name: "platform-config", component: ComingSoonView, meta: { requiresAuth: true, title: "Configuration" } },
    { path: "/admin/platform/system/feature-flags", name: "platform-feature-flags", component: ComingSoonView, meta: { requiresAuth: true, title: "Feature Flags" } },
    { path: "/admin/platform/system/scheduler", name: "platform-scheduler", component: ComingSoonView, meta: { requiresAuth: true, title: "Scheduler" } },

    // ── Core Platform: Storage ──
    { path: "/admin/platform/storage", redirect: "/admin/platform/storage/media" },
    { path: "/admin/platform/storage/media", name: "platform-file-media", component: ComingSoonView, meta: { requiresAuth: true, title: "File / Media Management" } },

    // ── Core Platform: API Gateway (APISIX) ──
    { path: "/admin/platform/gateway", redirect: "/admin/platform/gateway/routes" },
    { path: "/admin/platform/gateway/routes", name: "platform-gateway-routes", component: ComingSoonView, meta: { requiresAuth: true, title: "Routes" } },
    { path: "/admin/platform/gateway/upstreams", name: "platform-gateway-upstreams", component: ComingSoonView, meta: { requiresAuth: true, title: "Upstreams" } },
    { path: "/admin/platform/gateway/consumers", name: "platform-gateway-consumers", component: ComingSoonView, meta: { requiresAuth: true, title: "Consumers" } },
    { path: "/admin/platform/gateway/plugins", name: "platform-gateway-plugins", component: ComingSoonView, meta: { requiresAuth: true, title: "Plugins" } },
    { path: "/admin/platform/gateway/ssl", name: "platform-gateway-ssl", component: ComingSoonView, meta: { requiresAuth: true, title: "SSL Certificates" } },
    { path: "/admin/platform/gateway/webhooks", name: "platform-webhooks", component: ComingSoonView, meta: { requiresAuth: true, title: "Webhooks" } },

    // ── Backward-compat redirects from old integration paths ──
    { path: "/admin/platform/integration", redirect: "/admin/platform/gateway/routes" },
    { path: "/admin/platform/integration/api", redirect: "/admin/platform/gateway/routes" },
    { path: "/admin/platform/integration/webhooks", redirect: "/admin/platform/gateway/webhooks" },

    // ── Core Platform: AI Integration ──
    { path: "/admin/platform/ai", redirect: "/admin/platform/ai/providers" },
    { path: "/admin/platform/ai/providers", name: "platform-ai-providers", component: ComingSoonView, meta: { requiresAuth: true, title: "AI Providers" } },
    { path: "/admin/platform/ai/models", name: "platform-ai-models", component: ComingSoonView, meta: { requiresAuth: true, title: "AI Models" } },
    { path: "/admin/platform/ai/prompts", name: "platform-ai-prompts", component: ComingSoonView, meta: { requiresAuth: true, title: "Prompt Templates" } },
    { path: "/admin/platform/ai/usage", name: "platform-ai-usage", component: ComingSoonView, meta: { requiresAuth: true, title: "AI Usage & Billing" } },

    // ── Backward-compat redirects from old settings paths ──
    ...settingsRedirects,

    ...legacyAdminPaths.map<RouteRecordRaw>((path) => ({
      path,
      redirect: (to: RouteLocationGeneric) => `/admin${to.fullPath}`,
    })),

    // ═══════════════════════════════════════════════════════════
    // eMP v2.0 — Module Routes (UI Mockups)
    // ═══════════════════════════════════════════════════════════

    // ── Module 1: Portal eMP (public) ──
    { path: "/portal", name: "portal-home", component: () => import("@/views/portal/PortalHomeView.vue"), meta: { title: "Portal eMP" } },
    { path: "/portal/efiling", name: "portal-efiling", component: () => import("@/views/portal/PortalEfilingView.vue"), meta: { title: "Pemfailan Dalam Talian" } },
    { path: "/portal/carian", name: "portal-search", component: () => import("@/views/portal/PortalSearchView.vue"), meta: { title: "Carian Kes" } },
    { path: "/portal/jadual", name: "portal-schedule", component: () => import("@/views/portal/PortalScheduleView.vue"), meta: { title: "Jadual Mahkamah" } },
    { path: "/portal/award", name: "portal-awards", component: () => import("@/views/portal/PortalAwardsView.vue"), meta: { title: "Carian Award" } },
    { path: "/portal/kes/:id", name: "portal-case-detail", component: () => import("@/views/portal/PortalCaseDetailView.vue"), meta: { title: "Butiran Kes" } },
    { path: "/portal/faq", name: "portal-faq", component: () => import("@/views/portal/PortalFaqView.vue"), meta: { title: "Soalan Lazim" } },
    { path: "/portal/hubungi", name: "portal-contact", component: () => import("@/views/portal/PortalContactView.vue"), meta: { title: "Hubungi Kami" } },
    { path: "/portal/ca", name: "portal-ca", component: () => import("@/views/portal/PortalCaListView.vue"), meta: { title: "Perjanjian Kolektif" } },
    { path: "/portal/kebolehcapaian", name: "portal-accessibility", component: () => import("@/views/portal/PortalAccessibilityView.vue"), meta: { title: "Kebolehcapaian" } },
    { path: "/portal/log-masuk", name: "portal-login", component: () => import("@/views/portal/PortalLoginView.vue"), meta: { title: "Log Masuk" } },
    { path: "/portal/daftar", name: "portal-register", component: () => import("@/views/portal/PortalRegisterView.vue"), meta: { title: "Daftar Akaun" } },

    // ── Module 2: Pengurusan Akses Berpusat ──
    { path: "/admin/mfa-verify", name: "mfa-verify", component: () => import("@/views/auth/MfaVerifyView.vue"), meta: { guestOnly: true, title: "Pengesahan MFA" } },

    // ── Module 3: Pengurusan Notis ──
    { path: "/admin/notis", name: "notis-dashboard", component: () => import("@/views/notis/NotisWorkDashboardView.vue"), meta: { requiresAuth: true, title: "Pengurusan Notis" } },
    { path: "/admin/notis/tetapan", name: "notis-settings", component: () => import("@/views/notis/NotisSettingsView.vue"), meta: { requiresAuth: true, title: "Tetapan Notis" } },

    // ── Module 4: e-Filing & e-Services ──
    { path: "/admin/efiling", name: "efiling-list", component: () => import("@/views/efiling/EfilingListView.vue"), meta: { requiresAuth: true, title: "e-Filing" } },
    { path: "/admin/efiling/baru", name: "efiling-create", component: () => import("@/views/efiling/EfilingWizardView.vue"), meta: { requiresAuth: true, title: "Pemfailan Baru" } },
    { path: "/admin/efiling/:id", name: "efiling-status", component: () => import("@/views/efiling/EfilingStatusView.vue"), meta: { requiresAuth: true, title: "Status Pemfailan" } },
    { path: "/admin/efiling/:id/semak", name: "efiling-review", component: () => import("@/views/efiling/EfilingReviewView.vue"), meta: { requiresAuth: true, title: "Semakan Pemfailan" } },

    // ── Module 5: e-Sebutan ──
    { path: "/admin/esebutan", name: "sebutan-list", component: () => import("@/views/sebutan/SebutanListView.vue"), meta: { requiresAuth: true, title: "e-Sebutan" } },
    { path: "/admin/esebutan/:id", name: "sebutan-session", component: () => import("@/views/sebutan/SebutanSessionView.vue"), meta: { requiresAuth: true, title: "Sesi Sebutan" } },
    { path: "/admin/esebutan/:id/rumusan", name: "sebutan-summary", component: () => import("@/views/sebutan/SebutanSummaryView.vue"), meta: { requiresAuth: true, title: "Rumusan Sebutan" } },

    // ── Module 6: Jadual Mahkamah ──
    { path: "/admin/jadual", name: "jadual-calendar", component: () => import("@/views/jadual/JadualCalendarView.vue"), meta: { requiresAuth: true, title: "Jadual Mahkamah" } },
    { path: "/admin/jadual/baru", name: "jadual-create", component: () => import("@/views/jadual/JadualEventEditorView.vue"), meta: { requiresAuth: true, title: "Acara Baru" } },
    { path: "/admin/jadual/:id", name: "jadual-edit", component: () => import("@/views/jadual/JadualEventEditorView.vue"), meta: { requiresAuth: true, title: "Edit Acara" } },

    // ── Module 7: Paparan Kandungan Digital ──
    { path: "/admin/signage", name: "signage-dashboard", component: () => import("@/views/signage/SignageDashboardView.vue"), meta: { requiresAuth: true, title: "Paparan Digital" } },
    { path: "/admin/signage/playlist/:id", name: "signage-playlist", component: () => import("@/views/signage/SignagePlaylistView.vue"), meta: { requiresAuth: true, title: "Senarai Main" } },
    { path: "/admin/signage/preview/:id", name: "signage-preview", component: () => import("@/views/signage/SignagePreviewView.vue"), meta: { requiresAuth: true, title: "Pratonton" } },

    // ── Module 8: Carian Pintar (Award) ──
    { path: "/admin/carian", name: "carian-search", component: () => import("@/views/carian/CarianSearchView.vue"), meta: { requiresAuth: true, title: "Carian Pintar" } },
    { path: "/admin/carian/:id", name: "carian-detail", component: () => import("@/views/carian/CarianDetailView.vue"), meta: { requiresAuth: true, title: "Butiran Award" } },

    // ── Module 9: Pendaftaran Kes ──
    { path: "/admin/kes/daftar", name: "kes-daftar-list", component: () => import("@/views/kes/KesDaftarListView.vue"), meta: { requiresAuth: true, title: "Pendaftaran Kes" } },
    { path: "/admin/kes/daftar/baru", name: "kes-daftar-create", component: () => import("@/views/kes/KesDaftarFormView.vue"), meta: { requiresAuth: true, title: "Daftar Kes Baru" } },
    { path: "/admin/kes/daftar/:id/lulusan", name: "kes-daftar-approval", component: () => import("@/views/kes/KesDaftarApprovalView.vue"), meta: { requiresAuth: true, title: "Kelulusan Kes" } },

    // ── Module 11: Perjanjian Kolektif (must be before /admin/kes/:id to avoid param collision) ──
    { path: "/admin/kes/ca", name: "ca-list", component: () => import("@/views/ca/CaListView.vue"), meta: { requiresAuth: true, title: "Perjanjian Kolektif" } },
    { path: "/admin/kes/ca/baru", name: "ca-create", component: () => import("@/views/ca/CaFormView.vue"), meta: { requiresAuth: true, title: "Daftar CA Baru" } },
    { path: "/admin/kes/ca/:id", name: "ca-detail", component: () => import("@/views/ca/CaDetailView.vue"), meta: { requiresAuth: true, title: "Butiran CA" } },

    // ── Module 10: Pengurusan Kes (dynamic :id routes last) ──
    { path: "/admin/kes", name: "kes-list", component: () => import("@/views/kes/KesListView.vue"), meta: { requiresAuth: true, title: "Pengurusan Kes" } },
    { path: "/admin/kes/:id/award", name: "kes-award-draft", component: () => import("@/views/kes/KesAwardDraftView.vue"), meta: { requiresAuth: true, title: "Penulisan Award" } },
    { path: "/admin/kes/:id", name: "kes-detail", component: () => import("@/views/kes/KesDetailView.vue"), meta: { requiresAuth: true, title: "Butiran Kes" } },
    { path: "/admin/kes/:id/timeline", name: "kes-timeline", component: () => import("@/views/kes/KesTimelineView.vue"), meta: { requiresAuth: true, title: "Timeline Kes" } },
    { path: "/admin/kes/:id/tugasan", name: "kes-tasking", component: () => import("@/views/kes/KesTaskingView.vue"), meta: { requiresAuth: true, title: "Tugasan Kes" } },

    // ── Module 12: Dashboard dan Laporan ──
    { path: "/admin/laporan", name: "laporan-dashboard", component: () => import("@/views/laporan/EmpDashboardView.vue"), meta: { requiresAuth: true, title: "Dashboard KPI" } },
    { path: "/admin/laporan/senarai", name: "laporan-list", component: () => import("@/views/laporan/ReportsListView.vue"), meta: { requiresAuth: true, title: "Senarai Laporan" } },
    { path: "/admin/laporan/:id", name: "laporan-detail", component: () => import("@/views/laporan/ReportDetailView.vue"), meta: { requiresAuth: true, title: "Butiran Laporan" } },

    // ── Module 13: Pentadbir Sistem (additional views) ──
    { path: "/admin/pentadbir/data-induk", name: "master-data", component: () => import("@/views/admin/MasterDataView.vue"), meta: { requiresAuth: true, title: "Data Induk" } },
    { path: "/admin/pentadbir/templat", name: "template-admin", component: () => import("@/views/admin/TemplateAdminView.vue"), meta: { requiresAuth: true, title: "Templat" } },
    { path: "/admin/pentadbir/integrasi", name: "integration-settings", component: () => import("@/views/admin/IntegrationSettingsView.vue"), meta: { requiresAuth: true, title: "Integrasi" } },
    { path: "/admin/pentadbir/feature-toggles", name: "feature-toggles", component: () => import("@/views/admin/FeatureTogglesView.vue"), meta: { requiresAuth: true, title: "Feature Toggles" } },
    { path: "/admin/pentadbir/housekeeping", name: "housekeeping", component: () => import("@/views/admin/HousekeepingView.vue"), meta: { requiresAuth: true, title: "Housekeeping" } },

    { path: "/", name: "storefront-home", component: StorefrontHomeView, meta: { title: "Webfront" } },
    { path: "/:slug", name: "storefront-page", component: StorefrontPageView, meta: { title: "Webfront" } },
  ],
});

router.beforeEach(async (to) => {
  const auth = useAuthStore();
  await auth.initialize();

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: "login" };
  }

  if (to.meta.guestOnly && auth.isAuthenticated) {
    return { name: "main-dashboard" };
  }

  return true;
});

router.afterEach((to) => {
  const site = useSiteStore();
  const pageTitle = (to.meta.title as string) || "Admin";
  site.setDocumentTitle(pageTitle);
});

export default router;
