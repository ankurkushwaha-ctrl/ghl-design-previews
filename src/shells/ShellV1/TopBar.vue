<script lang="ts" setup>
  /*
   * ShellV1 TopBar — visual port of spm-ts/src/pmd/components/TopBar.vue.
   *
   * Like the sidebar, this is the visual layer only. The real top bar
   * has notification banners, A2P/billing warnings, dialer, screen
   * recorder, calendar/contact feature-discovery slots, wallet pill,
   * Canny changelog, copilot drawer, help drawer, profile dropdown,
   * etc. — all of which would require a Vuex store, the Pendo SDK,
   * and a stack of platform packages we deliberately don't pull in.
   *
   * What we render here is the "steady state" most stakeholders see:
   *   - subtle bottom shadow (matches prod)
   *   - 50px tall, right-aligned controls
   *   - changelog (megaphone), notifications (bell with red dot),
   *     help (?), Ask AI (Copilot icon stand-in), avatar with initials
   *
   * The "Ask AI" icon in prod is a custom svg (CopilotPrimaryIcon).
   * Here we use a sparkles + "Ask AI" wordmark to communicate the
   * same surface without bundling the asset.
   */

  interface Props {
    /** Override the avatar initials. Used to mirror the signed-in user. */
    avatarInitials?: string;
    /** Override the avatar background color. */
    avatarColor?: string;
    /** Whether to show the small red unread-notifications dot. */
    hasUnread?: boolean;
  }

  withDefaults(defineProps<Props>(), {
    avatarInitials: 'AK',
    avatarColor: '#7839ee', // var(--violet-600) — feels brand-y, distinct from icon tiles
    hasUnread: true,
  });
</script>

<template>
  <header class="shell-topbar hl_header">
    <div class="shell-topbar__inner container-fluid">
      <div class="shell-topbar__controls hl_header--controls">
        <!-- Ask AI / Copilot pill. Stand-in for CopilotPrimaryIcon.
             In prod this is a custom SVG — here a sparkle + label
             that reads like the same surface. -->
        <button
          type="button"
          class="shell-topbar__askai"
          aria-label="Ask AI"
        >
          <i class="fas fa-magic" aria-hidden="true" />
          <span>Ask AI</span>
        </button>

        <!-- Changelog (megaphone) — agency-side only in prod. We always
             show it because previews are agency-side. -->
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
    /* Same shadow as prod. */
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
  .shell-topbar__askai i {
    color: var(--violet-500);
    font-size: 12px;
  }
  .shell-topbar__askai:hover {
    border-color: var(--gray-300);
    color: var(--gray-900);
  }
  .shell-topbar__askai:focus-visible {
    outline: 2px solid var(--primary-600);
    outline-offset: 2px;
  }

  /* ── Circle buttons (changelog / bell / help) ─────────────────────── */
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

  .shell-topbar__btn--changelog {
    background: var(--shell-changelog-btn-bg);
  }
  .shell-topbar__btn--notifications {
    /* Yellow circle in prod (.btn-yellow class) — matches HR warning ramp. */
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
    background: var(--error-500, #f04438);
    box-shadow: 0 0 0 2px #ffffff;
  }
  .shell-topbar__btn--help {
    background: var(--shell-help-btn-bg);
  }

  /* ── Avatar ───────────────────────────────────────────────────────── */
  .shell-topbar__avatar-wrap {
    margin-left: 4px;
  }
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
