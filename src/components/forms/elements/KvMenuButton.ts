import { h } from 'vue';
import type { SetupContext } from 'vue';

const KvMenuButton = (_props: Record<string, any>, context: SetupContext) => {
  return h(
    'button',
    {
      class: 'kv-menu-button',
      type: 'button',
    },
    context.slots
  );
};

export default KvMenuButton;
