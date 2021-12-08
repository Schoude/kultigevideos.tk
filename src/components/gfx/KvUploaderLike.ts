import { h } from 'vue';
import type { SetupContext } from 'vue';
import './KvUploaderLike.scss';
import SvgIcon from './icons/SvgIcon.vue';
import { ICON_SIZE } from './icons/icon-data';

interface Props {
  imageUrl: string;
  isLiked: boolean;
}

const KvUploaderLike = (props: Props, context: SetupContext) => {
  let children = [
    h('img', {
      class: 'avatar',
      alt: 'Profilbild des Uploaders',
      src: props.imageUrl,
      ...context.attrs,
    }),
    h(SvgIcon, { iconName: 'heart', size: ICON_SIZE.s }),
  ];

  if (props.isLiked === false) {
    children.pop();
  }

  return h('button', { class: 'kv-uploader-like', type: 'button' }, children);
};

export default KvUploaderLike;
