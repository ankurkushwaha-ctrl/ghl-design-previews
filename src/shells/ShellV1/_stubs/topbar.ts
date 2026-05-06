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
export const CopilotPrimaryIcon = noOp('CopilotPrimaryIcon');

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
