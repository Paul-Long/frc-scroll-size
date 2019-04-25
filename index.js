let scrollbarMeasure = {
  position: 'absolute',
  top: '-9999px',
  width: '50px',
  height: '50px'
};

let scrollbarVerticalSize;
let scrollbarHorizontalSize;

export default function measureScrollbar(direction = 'vertical') {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return 0;
  }
  const isVertical = direction === 'vertical';
  if (isVertical && scrollbarVerticalSize) {
    return scrollbarVerticalSize;
  } else if (!isVertical && scrollbarHorizontalSize) {
    return scrollbarHorizontalSize;
  }
  const scrollDiv = document.createElement('div');
  Object.keys(scrollbarMeasure).forEach((scrollProp) => {
    scrollDiv.style[scrollProp] = scrollbarMeasure[scrollProp];
  });
  // Append related overflow style
  if (isVertical) {
    scrollDiv.style.overflowY = 'scroll';
  } else {
    scrollDiv.style.overflowX = 'scroll';
  }
  document.body.appendChild(scrollDiv);
  let size = 0;
  if (isVertical) {
    size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    scrollbarVerticalSize = size;
  } else {
    size = scrollDiv.offsetHeight - scrollDiv.clientHeight;
    scrollbarHorizontalSize = size;
  }

  document.body.removeChild(scrollDiv);
  return size;
}
