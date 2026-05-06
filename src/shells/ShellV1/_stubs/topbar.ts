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

export const UITopMenuItems = defineComponent({
  name: 'UITopMenuItems',
  props: {
    navigation: { type: Object, required: false },
    locationId: { type: String, required: false },
    user: { type: Object, required: false },
  },
  setup() {
    return () =>
      h('div', { class: 'preview-top-menu-stub' }, [
        h(
          'button',
          {
            class: 'preview-top-menu-stub__btn preview-top-menu-stub__btn--yellow',
            'aria-label': 'top menu quick action',
            type: 'button',
          },
          '↑'
        ),
        h(
          'button',
          {
            class: 'preview-top-menu-stub__btn preview-top-menu-stub__btn--green',
            'aria-label': 'top menu quick action',
            type: 'button',
          },
          '↑'
        ),
      ]);
  },
});
