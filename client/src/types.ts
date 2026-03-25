export type PublishStatus = "draft" | "published" | "archived";
export type ThemeColor = "violet" | "blue" | "green" | "red" | "black-white" | "grey";

export type ApiError = { error: { code: string; message: string; details?: unknown } };

export type ApiResponse<T> = { data: T; meta?: Record<string, unknown> };

export type User = {
  id: number;
  email: string;
  name: string;
  photoUrl?: string;
  role?: string;
};

export type PostInput = {
  title: string;
  slug?: string;
  excerpt?: string;
  content: string;
  status: PublishStatus;
  featuredImageId?: number | null;
  categoryIds?: number[];
};

export type Post = PostInput & {
  id: number;
  slug: string;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  featuredImage?: Media | null;
  categories?: Category[];
};

export type CategoryInput = {
  name: string;
  slug?: string;
  description?: string;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  _count?: { posts: number };
};

export type PageInput = {
  title: string;
  slug?: string;
  content: string;
  status: PublishStatus;
  featuredImageId?: number | null;
};

export type Page = PageInput & {
  id: number;
  slug: string;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  featuredImage?: Media | null;
};

export type Media = {
  id: number;
  filename: string;
  originalName: string;
  title: string | null;
  caption: string | null;
  description: string | null;
  mimeType: string;
  size: number;
  width: number | null;
  height: number | null;
  altText: string | null;
  path: string;
  url: string;
  createdAt: string;
};

export type MediaMetadataInput = {
  title: string;
  altText: string;
  caption: string;
  description: string;
};

export type SettingsPayload = {
  siteTitle: string;
  tagline: string;
  webfrontTitle: string;
  webfrontTagline: string;
  titleFormat: string;
  metaDescription: string;
  siteIconUrl: string;
  webfrontLogoUrl: string;
  sidebarLogoUrl: string;
  faviconUrl: string;
  language: string;
  timezone: string;
  footerText: string;
  frontPageId: number | null;
};

export type PublicSiteSettings = Pick<
  SettingsPayload,
  "siteTitle" | "tagline" | "webfrontTitle" | "webfrontTagline" | "metaDescription" | "footerText" | "siteIconUrl" | "webfrontLogoUrl" | "sidebarLogoUrl" | "faviconUrl"
> & {
  storefrontMenu: StorefrontMenuItem[];
};

export type StorefrontMenuItem = {
  id: string;
  label: string;
  href: string;
  parentId: string | null;
  openInNewTab: boolean;
};

export type Role = {
  id: number;
  name: string;
  description: string;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
};

export type RoleInput = {
  name: string;
  description: string;
  permissions: string[];
};

export type UserDetail = {
  id: number;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type UserInput = {
  name: string;
  email: string;
  password?: string;
  role: string;
  isActive: boolean;
};

export type AuditLog = {
  id: number;
  userId: number | null;
  action: string;
  auditableType: string | null;
  auditableId: number | null;
  oldValues: Record<string, unknown> | null;
  newValues: Record<string, unknown> | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
  user?: { id: number; name: string; email: string } | null;
};

// ═══════════════════════════════════════════════════════════════
// eMP v2.0 — Domain Types
// ═══════════════════════════════════════════════════════════════

// ── Case Management Core ──

export type CaseStatus = "pending" | "registered" | "in-progress" | "hearing" | "decided" | "closed" | "archived";
export type CaseType = "unfair-dismissal" | "trade-dispute" | "collective-agreement" | "non-compliance" | "other";

export type Party = {
  id: number;
  name: string;
  type: "claimant" | "respondent" | "representative";
  icNumber?: string;
  companyRegNo?: string;
  email?: string;
  phone?: string;
  address?: string;
  lawyerName?: string;
  lawyerFirm?: string;
};

export type CaseRecord = {
  id: number;
  caseNo: string;
  caseType: CaseType;
  subject: string;
  description?: string;
  priority: "normal" | "urgent";
  status: CaseStatus;
  parties: Party[];
  referenceNo?: string;
  registeredAt: string;
  assignedChairmanId?: number;
  assignedChairmanName?: string;
  assignedRegistrarId?: number;
  assignedRegistrarName?: string;
  createdAt: string;
  updatedAt: string;
};

export type CaseEvent = {
  id: number;
  caseId: number;
  type: "registration" | "mention" | "hearing" | "decision" | "filing" | "note" | "assignment";
  title: string;
  description?: string;
  actorName: string;
  occurredAt: string;
};

// ── e-Filing ──

export type FilingStatus = "draft" | "submitted" | "under-review" | "accepted" | "rejected" | "returned";

export type FilingDocument = {
  id: number;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  uploadedAt: string;
};

export type Filing = {
  id: number;
  caseId?: number;
  caseNo?: string;
  filingType: string;
  status: FilingStatus;
  referenceNo: string;
  applicantName: string;
  documents: FilingDocument[];
  submittedAt?: string;
  createdAt: string;
  updatedAt: string;
};

// ── Court Schedule ──

export type ScheduleEventType = "mention" | "hearing" | "conference" | "mediation" | "administrative";
export type ScheduleEventStatus = "scheduled" | "in-progress" | "completed" | "postponed" | "cancelled";

export type ScheduleEvent = {
  id: number;
  caseId?: number;
  caseNo?: string;
  title: string;
  type: ScheduleEventType;
  venue: string;
  courtRoom: string;
  startAt: string;
  endAt: string;
  chairmanName?: string;
  status: ScheduleEventStatus;
};

// ── e-Mention (e-Sebutan) ──

export type MentionMessage = {
  id: number;
  mentionSessionId: number;
  senderName: string;
  senderRole: string;
  content: string;
  type: "message" | "system" | "decision";
  sentAt: string;
};

export type MentionSession = {
  id: number;
  caseId: number;
  caseNo: string;
  status: "scheduled" | "in-progress" | "completed";
  scheduledAt: string;
  startedAt?: string;
  endedAt?: string;
  participants: { name: string; role: string; present: boolean }[];
  messages: MentionMessage[];
  decisions?: string[];
};

// ── Smart Search / Award ──

export type AwardResult = {
  id: number;
  caseNo: string;
  awardNo: string;
  title: string;
  snippet: string;
  chairmanName: string;
  decidedAt: string;
  relevanceScore: number;
  highlights: string[];
  caseType: string;
  year: number;
};

// ── Digital Signage ──

export type SignageDevice = {
  id: number;
  name: string;
  location: string;
  status: "online" | "offline" | "maintenance";
  lastHeartbeat?: string;
  currentPlaylistId?: number;
};

export type SignageItem = {
  id: number;
  type: "schedule" | "announcement" | "image" | "html";
  content: string;
  duration: number;
  order: number;
};

export type SignagePlaylist = {
  id: number;
  name: string;
  items: SignageItem[];
  isActive: boolean;
};

// ── Collective Agreement (Perjanjian Kolektif) ──

export type CollectiveAgreementStatus = "submitted" | "under-review" | "registered" | "action-required" | "archived";

export type CollectiveAgreement = {
  id: number;
  caNo: string;
  employerName: string;
  unionName: string;
  industry: string;
  status: CollectiveAgreementStatus;
  effectiveFrom?: string;
  effectiveTo?: string;
  submittedAt: string;
  registeredAt?: string;
  createdAt: string;
  updatedAt: string;
};

// ── Notices / Work Dashboard ──

export type NoticeItem = {
  id: number;
  type: "task" | "reminder" | "sla-warning" | "new-case" | "system";
  title: string;
  description?: string;
  relatedCaseId?: number;
  relatedCaseNo?: string;
  priority: "low" | "normal" | "high" | "critical";
  dueAt?: string;
  isRead: boolean;
  createdAt: string;
};

// ── KPI / Reports ──

export type KpiMetric = {
  key: string;
  label: string;
  value: number;
  target: number;
  unit: string;
  trend: "up" | "down" | "flat";
  changePercent: number;
};
