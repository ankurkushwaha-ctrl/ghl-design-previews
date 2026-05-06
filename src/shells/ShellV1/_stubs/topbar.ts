import { defineComponent, h } from 'vue';

const noOp = (name: string) =>
  defineComponent({
    name,
    render: () => h('div', { style: 'display:none' }),
  });

export const NotificationBanner = noOp('NotificationBanner');
export const I18nFeedback = noOp('I18nFeedback');
export const DialerModalV2 = noOp('DialerModalV2');
export const ScreenRecorder = noOp('ScreenRecorder');
export const UserSwitcher = noOp('UserSwitcher');
export const CopilotPrimaryIcon = defineComponent({
  name: 'CopilotPrimaryIcon',
  setup() {
    return () =>
      h(
        'span',
        {
          'aria-hidden': 'true',
          style:
            'display:inline-flex;align-items:center;gap:6px;padding:3px 12px;height:26px;border-radius:999px;background:linear-gradient(135deg,#7c3aed 0%,#4f46e5 55%,#6366f1 100%);color:#fff;font-size:12px;font-weight:600;line-height:1;box-shadow:0 1px 2px rgba(0,0,0,0.18);',
        },
        [
          h('span', { style: 'font-size:11px;opacity:0.95;' }, '✦'),
          h('span', null, 'Ask AI'),
        ]
      );
  },
});

export const TopBarWalletPill = defineComponent({
  name: 'TopBarWalletPill',
  props: {
    balance: { type: Number, default: 0 },
    visible: { type: Boolean, default: false },
  },
  emits: ['click'],
  setup(props, { emit }) {
    return () =>
      props.visible
        ? h(
            'button',
            {
              class: 'btn btn-circle btn-primary',
              onClick: () => emit('click'),
              style: 'display:none',
            },
            '$'
          )
        : h('div', { style: 'display:none' });
  },
});
