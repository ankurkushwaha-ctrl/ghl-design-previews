/*
 * No-op modal stubs.
 *
 * Upstream SideBar.vue mounts six modal components that show only when their
 * corresponding state ref is set to `true`. None of those refs are ever set
 * in the preview, so the modals never render. We still need the imports to
 * resolve, hence these no-op stubs.
 *
 * If you need any of these modals visible in the preview, vendor them
 * properly from spm-ts and replace the corresponding stub.
 */

import { defineComponent, h } from 'vue';

const noOpModal = (name: string) =>
  defineComponent({
    name,
    render: () => h('div', { 'data-stub-modal': name, style: 'display:none' }),
  });

export const SendReviewRequestModal = noOpModal('SendReviewRequestModal');
export const EditAppointmentModal = noOpModal('EditAppointmentModal');
export const AddRecordForm = noOpModal('AddRecordForm');
// Upstream imports as `OpportunityModelV2` and registers under the alias
// `OpportunitiesModal` in the `components` option. We cut out the middleman
// and export under the template-facing name.
export const OpportunitiesModal = noOpModal('OpportunitiesModal');
export const GlobalSearch = noOpModal('GlobalSearch');
