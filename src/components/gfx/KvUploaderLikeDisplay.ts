import { h } from 'vue';
import type { SetupContext } from 'vue';
import './KvUploaderLike.scss';
import SvgIcon from './icons/SvgIcon.vue';
import { ICON_SIZE } from './icons/icon-data';

interface Props {
  imageUrl: string;
}

const KvUploaderLikeDisplay = (props: Props, context: SetupContext) => {
  let children = [
    h('img', {
      class: 'avatar',
      alt: 'Profilbild des Uploaders',
      src: `${props.imageUrl}`,
      ...context.attrs,
    }),
    h(SvgIcon, { iconName: 'heart', size: ICON_SIZE.s }),
  ];

  return h('div', { class: 'kv-uploader-like-display' }, children);
};

export default KvUploaderLikeDisplay;
