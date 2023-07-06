import type { DirectiveBinding } from 'vue';

const elEventsWeakMap = new WeakMap();
const MIN_WIDTH = 50;
const MIN_HEIGHT = 50;
const TRIGGER_SIZE = 8;

enum RESIZE_CURSOR {
  COL_RESIZE = 'col-resize',
  ROW_RESIZE = 'row-resize'
}

enum POSITION {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right'
}

type Positions = [POSITION.TOP, POSITION.BOTTOM, POSITION.LEFT, POSITION.RIGHT];

interface ResizeState {
  resizing: boolean;
  position?: POSITION;
  startPointerX?: number;
  startPointerY?: number;
}
type WidthHeight = 'width' | 'height';

type ElAttr = WidthHeight | 'cursor' | 'display'; // 后面补充

type ResizeFormatter = 'px' | 'flex';

interface ResizeInfo {
  el: HTMLElement;
  positions: Positions;
  minWidth: number;
  minHeight: number;
  triggerSize: number;
  formatter: ResizeFormatter;
}

function getElStyleAttr(element: HTMLElement, attr: ElAttr) {
  const styles = window.getComputedStyle(element);
  return styles[attr];
}

function getSiblingByPosition(el: HTMLElement, position: POSITION) {
  const siblingMap = {
    left: el.previousElementSibling,
    right: el.nextElementSibling,
    bottom: el.nextElementSibling,
    top: el.previousElementSibling
  };
  return siblingMap[position];
}

function getSiblingsSize(el: HTMLElement, attr: WidthHeight) {
  const siblings = Array.from((el.parentNode && el.parentNode.children) || []);
  return [...siblings].reduce((prev, next) => next.getBoundingClientRect()[attr] + prev, 0);
}

function updateSize({ el, sibling, formatter = 'px', elSize, siblingSize, attr = 'width' }: { el: HTMLElement; sibling: HTMLElement; formatter: ResizeFormatter; elSize: number; siblingSize: number; attr?: WidthHeight }) {
  let totalSize = elSize + siblingSize;
  if (formatter === 'px') {
    el.style[attr] = elSize + formatter;
    sibling.style[attr] = siblingSize + formatter;
  } else if (formatter === 'flex') {
    totalSize = getSiblingsSize(el as HTMLElement, attr);
    el.style.flex = `${(elSize / totalSize) * 10}`; // 修复 flex-grow <1
    sibling.style.flex = `${(siblingSize / totalSize) * 10}`;
  }
}

const initResize = ({ el, positions, minWidth = MIN_WIDTH, minHeight = MIN_HEIGHT, triggerSize = TRIGGER_SIZE, formatter = 'px' }: ResizeInfo) => {
  if (!el || !(el instanceof HTMLElement)) return;
  const resizeState: ResizeState = {
    resizing: false
  };
  const defaultCursor = getElStyleAttr(el, 'cursor');
  const elStyle = el.style;

  const canLeftResize = positions.includes(POSITION.LEFT);
  const canRightResize = positions.includes(POSITION.RIGHT);
  const canTopResize = positions.includes(POSITION.TOP);
  const canBottomResize = positions.includes(POSITION.BOTTOM);

  if (!canLeftResize && !canRightResize && !canTopResize && !canBottomResize) {
    return;
  } // 未指定方向

  const pointermove = (e: PointerEvent) => {
    if (resizeState.resizing) return;
    e.preventDefault();
    const { left, right, top, bottom } = el.getBoundingClientRect();
    const { clientX, clientY } = e;
    // 左右拉伸
    if (canLeftResize || canRightResize) {
      if (clientX - left < triggerSize) resizeState.position = POSITION.LEFT;
      else if (right - clientX < triggerSize) resizeState.position = POSITION.RIGHT;
      else resizeState.position = undefined;

      if (resizeState.position === undefined) {
        elStyle.cursor = defaultCursor;
      } else {
        if (getSiblingByPosition(el, resizeState.position)) {
          elStyle.cursor = RESIZE_CURSOR.COL_RESIZE;
        }
        e.stopPropagation();
      }
    } else if (canTopResize || canBottomResize) {
      // 上下拉伸
      if (clientY - top < triggerSize) resizeState.position = POSITION.TOP;
      else if (bottom - clientY < triggerSize) resizeState.position = POSITION.BOTTOM;
      else resizeState.position = undefined;

      if (resizeState.position === undefined) {
        elStyle.cursor = defaultCursor;
      } else {
        if (getSiblingByPosition(el, resizeState.position)) {
          elStyle.cursor = RESIZE_CURSOR.ROW_RESIZE;
        }
        e.stopPropagation();
      }
    }
  };

  const pointerleave = (e: PointerEvent) => {
    e.stopPropagation();
    resizeState.position = undefined;
    elStyle.cursor = defaultCursor;
    el.releasePointerCapture(e.pointerId);
  };
  const pointerdown = (e: PointerEvent) => {
    const { resizing, position } = resizeState;
    if (resizing || !position) return;

    if (position) e.stopPropagation(); // 如果当前节点存在拉伸方向 需要阻止冒泡(用于嵌套拉伸)
    el.setPointerCapture(e.pointerId);

    if (el.parentElement) {
      const isFlex = getElStyleAttr(el.parentElement, 'display') === 'flex';
      if (isFlex) formatter = 'flex';
    }

    resizeState.resizing = true;
    resizeState.startPointerX = e.clientX;
    resizeState.startPointerY = e.clientY;

    const { width, height } = el.getBoundingClientRect();

    const sibling: HTMLElement = getSiblingByPosition(el, position) as HTMLElement;
    if (!sibling || !(sibling instanceof HTMLElement)) {
      console.error('未找到兄弟节点', position);
      return;
    }

    const rectSibling = sibling.getBoundingClientRect();

    const { startPointerX, startPointerY } = resizeState;
    const onDocumentMouseMove = (e: MouseEvent) => {
      if (!resizeState.resizing) return;
      elStyle.cursor = canLeftResize || canRightResize ? RESIZE_CURSOR.COL_RESIZE : RESIZE_CURSOR.ROW_RESIZE;
      const { clientX, clientY } = e;

      if (position === POSITION.LEFT || position === POSITION.RIGHT) {
        const offsetX = clientX - startPointerX;
        const elSize = position === POSITION.RIGHT ? width + offsetX : width - offsetX;

        const siblingSize = position === POSITION.RIGHT ? rectSibling.width - offsetX : rectSibling.width + offsetX;
        if (elSize <= minWidth || siblingSize <= minWidth) return;

        updateSize({ el, sibling, elSize, siblingSize, formatter });
      } else if (position === POSITION.TOP || position === POSITION.BOTTOM) {
        const offsetY = clientY - startPointerY;
        const elSize = position === POSITION.BOTTOM ? height + offsetY : height - offsetY;

        const siblingSize = position === POSITION.BOTTOM ? rectSibling.height - offsetY : rectSibling.height + offsetY;
        if (elSize <= minHeight || siblingSize <= minHeight) return;

        updateSize({
          el,
          sibling,
          elSize,
          siblingSize,
          formatter,
          attr: 'height'
        });
      }
    };

    const onDocumentMouseUp = () => {
      document.removeEventListener('mousemove', onDocumentMouseMove);
      document.removeEventListener('mouseup', onDocumentMouseUp);
      resizeState.resizing = false;
      elStyle.cursor = defaultCursor;
    };

    document.addEventListener('mousemove', onDocumentMouseMove);
    document.addEventListener('mouseup', onDocumentMouseUp);
  };

  const bindElEvents = () => {
    el.addEventListener('pointermove', pointermove);
    el.addEventListener('pointerleave', pointerleave);
    el.addEventListener('pointerup', pointerleave);
    el.addEventListener('pointerdown', pointerdown);
  };

  const unBindElEvents = () => {
    el.removeEventListener('pointermove', pointermove);
    el.removeEventListener('pointerleave', pointerleave);
    el.removeEventListener('pointerup', pointerleave);
    el.removeEventListener('pointerdown', pointerdown);
  };

  bindElEvents();

  // 设置解绑事件
  elEventsWeakMap.set(el, unBindElEvents);
};
export const dragResize = {
  mounted: function (el: HTMLElement, binding: DirectiveBinding) {
    const { modifiers, value } = binding;
    const positions = Object.keys(modifiers);
    initResize({ el, positions, ...value });
  },
  beforeUnmount: function (el: HTMLElement) {
    const unBindElEvents = elEventsWeakMap.get(el);
    unBindElEvents();
  }
};
export default dragResize;
