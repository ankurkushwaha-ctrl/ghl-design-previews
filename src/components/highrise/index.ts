/*
 * HighRise component stubs — preview-only.
 *
 * These are NOT a faithful re-implementation of @platform-ui/highrise.
 * They render the HR visual treatment using HR tokens so previews look
 * like production, but the API surface is intentionally narrow — only
 * what the migrated pages actually use.
 *
 * If a page needs an HR primitive that isn't here yet: add it as a
 * stub here, then update the migration. Don't reach for a third-party
 * component library. Don't import from spm-ts.
 */
export { default as HLTabs } from './HLTabs.vue';
export { default as HLTabPane } from './HLTabPane.vue';
export { default as HLButton } from './HLButton.vue';
export { default as HLTag } from './HLTag.vue';
