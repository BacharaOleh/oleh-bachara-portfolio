export type IntentEventType =
  | "cv_download"
  | "recruiter_modal_open"
  | "contact_click_telegram"
  | "contact_click_linkedin"
  | "contact_click_email"
  | "contact_click_phone"
  | "contact_click_whatsapp"
  | "contact_click_github"
  | "fit_matcher_used"
  | "fit_matcher_cta_click"
  | "project_case_view"
  | "contact_form_submit"
  | "offer_clicked"
  | "expo_tab_switched"
  | "expo_cta_clicked";

export interface IntentEventPayload {
  type: IntentEventType;
  label: string;
  details?: string;
  path?: string;
  referrer?: string;
  isAdminDevice?: boolean;
}

/**
 * Tracks high-intent actions by recruiters, employers, and clients.
 * Automatically marks the event with isAdminDevice if this browser
 * has ever logged into the admin dashboard.
 */
export function trackIntent(
  type: IntentEventType,
  label: string,
  details?: string
): void {
  if (typeof window === "undefined") return;

  try {
    const isAdminDevice = localStorage.getItem("is_admin_device") === "true";
    const payload: IntentEventPayload = {
      type,
      label,
      details,
      path: window.location.pathname,
      referrer: document.referrer || "Direct",
      isAdminDevice,
    };

    fetch("/api/intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {
      // Non-critical tracking error, silently ignore
    });
  } catch {
    // Non-critical error
  }
}
