<script lang="ts" setup>
  /*
   * ShellV1 TopBar — visual port of spm-ts/src/pmd/components/TopBar.vue.
   *
   * Visual-layer port. Steady-state the user sees on the agency Add-Ons
   * page. Order of right-aligned controls matches prod:
   *   1. Red `</>` dev/debugger button     (prod: v-if="isDev")
   *   2. Ask AI / Copilot pill              (prod: CopilotPrimaryIcon SVG)
   *   3. Changelog (green megaphone)        (prod: btn-changelog)
   *   4. Notifications (yellow bell)        (prod: btn-yellow + red dot)
   *   5. Help (blue ?)                      (prod: hl_header--help-icon)
   *   6. Avatar with initials               (prod: profile dropdown)
   *
   * Stubbed (not rendered) compared to prod:
   *   - NotificationBanner, user-switched banner
   *   - Location dropdown (hidden in prod template too)
   *   - HIPAA badge (only when location.hipaa_compliance)
   *   - Calendar/Contacts/Payments feature discovery slots
   *   - WhatsApp slot, I18nFeedback, TopBarWalletPill
   *   - DialerModalV2, ScreenRecorder, profile dropdown menu
   * These either depend on Vuex state or surface contextually — not
   * useful for static design previews.
   */

  interface Props {
    /** Override the avatar initials. */
    avatarInitials?: string;
    /** Override the avatar background color. */
    avatarColor?: string;
    /** Show the red unread-notifications dot on the bell. */
    hasUnread?: boolean;
    /** Show the red dev `</>` button. Defaults to true so previews
        match the reference screenshot of the design team's account. */
    showDevButton?: boolean;
  }

  withDefaults(defineProps<Props>(), {
    avatarInitials: 'AK',
    avatarColor: 'var(--violet-600)',
    hasUnread: true,
    showDevButton: true,
  });
</script>

<template>
  <header class="shell-topbar hl_header">
    <div class="shell-topbar__inner container-fluid">
      <div class="shell-topbar__controls hl_header--controls">
        <!-- Red `</>` dev/debugger toggle. Prod renders this only when
             isDev is true; the design team's Chrome account in the
             reference screenshot has it on, so we mirror that. -->
        <button
          v-if="showDevButton"
          type="button"
          class="shell-topbar__btn shell-topbar__btn--dev"
          aria-label="Toggle frontend debugger"
          title="Toggle frontend debugger"
        >
          <i class="fa fa-code" aria-hidden="true" />
        </button>

        <!-- Ask AI / Copilot pill. Stand-in for prod's CopilotPrimaryIcon
             SVG (83×32). Inline sparkle + "Ask AI" wordmark reads as the
             same surface without bundling the asset. -->
        <button
          type="button"
          class="shell-topbar__askai"
          aria-label="Ask AI"
        >
          <svg
            class="shell-topbar__askai-icon"
            viewBox="0 0 16 16"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M8 0 L9.4 5.4 L14.8 6.8 L9.4 8.2 L8 13.6 L6.6 8.2 L1.2 6.8 L6.6 5.4 Z"
              fill="currentColor"
            />
            <circle cx="13" cy="2.5" r="1.2" fill="currentColor" />
            <circle cx="2.5" cy="12" r="0.8" fill="currentColor" />
          </svg>
          <span>Ask AI</span>
        </button>

        <!-- Changelog (megaphone) — agency-side only in prod. -->
        <button
          type="button"
          class="shell-topbar__btn shell-topbar__btn--changelog"
          aria-label="View changelog"
          title="Changelog"
        >
          <i class="fa fa-bullhorn" aria-hidden="true" />
        </button>

        <!-- Notifications. Red dot when hasUnread. -->
        <button
          type="button"
          class="shell-topbar__btn shell-topbar__btn--notifications"
          :class="{ 'shell-topbar__btn--has-unread': hasUnread }"
          aria-label="Notifications"
          title="Notifications"
        >
          <i class="fa fa-bell" aria-hidden="true" />
        </button>

        <!-- Help. Legacy HL blue (#188bf6) per prod. -->
        <button
          type="button"
          class="shell-topbar__btn shell-topbar__btn--help"
          aria-label="Help and support"
          title="Help"
        >
          <i class="fa fa-question" aria-hidden="true" />
        </button>

        <!-- Profile avatar. Initials over a brand-ish color. -->
        <div class="shell-topbar__avatar-wrap">
          <button
            type="button"
            class="shell-topbar__avatar"
            :style="{ backgroundColor: avatarColor }"
            aria-label="Open profile menu"
            title="Profile"
          >
            {{ avatarInitials }}
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
  .shell-topbar {
    position: fixed;
    top: 0;
    left: 14rem;
    right: 0;
    height: 50px;
    z-index: 30;
    background: #ffffff;
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.11);
    font-family: var(--hr-font-family-base);
  }

  .shell-topbar__inner {
    height: 100%;
    padding: 0 15px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .shell-topbar__controls {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  /* ── Ask AI pill ──────────────────────────────────────────────────── */
  .shell-topbar__askai {
    appearance: none;
    border: 1px solid var(--gray-200);
    background: linear-gradient(135deg, #ffffff 0%, var(--gray-50) 100%);
    color: var(--gray-700);
    border-radius: 999px;
    padding: 0 14px;
    height: 32px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: border-color 0.15s ease, background 0.15s ease, color 0.15s ease;
  }
  .shell-topbar__askai-icon {
    width: 14px;
    height: 14px;
    color: var(--violet-500);
    flex-shrink: 0;
  }
  .shell-topbar__askai:hover {
    border-color: var(--gray-300);
    color: var(--gray-900);
  }
  .shell-topbar__askai:focus-visible {
    outline: 2px solid var(--primary-600);
    outline-offset: 2px;
  }

  /* ── Circle buttons (dev / changelog / bell / help) ───────────────── */
  .shell-topbar__btn {
    appearance: none;
    border: 0;
    cursor: pointer;
    width: 32px;
    height: 32px;
    border-radius: 999px;
    display: grid;
    place-items: center;
    color: #ffffff;
    font-size: 13px;
    line-height: 1;
    position: relative;
    transition: filter 0.15s ease;
  }
  .shell-topbar__btn:hover { filter: brightness(1.05); }
  .shell-topbar__btn:focus-visible {
    outline: 2px solid var(--primary-600);
    outline-offset: 2px;
  }

  /* Red dev button — matches prod's `style="background: red !important"`. */
  .shell-topbar__btn--dev { background: var(--error-500); }

  .shell-topbar__btn--changelog { background: var(--shell-changelog-btn-bg); }

  .shell-topbar__btn--notifications {
    /* Yellow circle in prod (.btn-yellow class). */
    background: var(--warning-500);
  }
  .shell-topbar__btn--notifications.shell-topbar__btn--has-unread::after {
    content: '';
    position: absolute;
    top: 4px;
    right: 4px;
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: var(--error-500);
    box-shadow: 0 0 0 2px #ffffff;
  }

  .shell-topbar__btn--help { background: var(--shell-help-btn-bg); }

  /* ── Avatar ───────────────────────────────────────────────────────── */
  .shell-topbar__avatar-wrap { margin-left: 4px; }
  .shell-topbar__avatar {
    appearance: none;
    border: 0;
    cursor: pointer;
    width: 32px;
    height: 32px;
    border-radius: 999px;
    color: #ffffff;
    font-size: 12px;
    font-weight: 600;
    line-height: 32px;
    text-align: center;
    letter-spacing: 0.02em;
  }
  .shell-topbar__avatar:focus-visible {
    outline: 2px solid var(--primary-600);
    outline-offset: 2px;
  }
</style>
