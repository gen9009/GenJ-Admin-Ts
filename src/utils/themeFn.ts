/* 
  颜色按层次进行渐变
*/
export const mix = (colorTheme: string | null, level: number, mixWhite: string = '#ffffff') => {
  if (!colorTheme) return;
  level = Math.max(Math.min(Number(level), 1), 0);
  let r1 = parseInt(colorTheme.substring(1, 3), 16);
  let g1 = parseInt(colorTheme.substring(3, 5), 16);
  let b1 = parseInt(colorTheme.substring(5, 7), 16);
  let r2 = parseInt(mixWhite.substring(1, 3), 16);
  let g2 = parseInt(mixWhite.substring(3, 5), 16);
  let b2 = parseInt(mixWhite.substring(5, 7), 16);
  let rNum = Math.round(r1 * (1 - level) + r2 * level);
  let gNum = Math.round(g1 * (1 - level) + g2 * level);
  let bNum = Math.round(b1 * (1 - level) + b2 * level);
  let r = ('0' + (rNum || 0).toString(16)).slice(-2);
  let g = ('0' + (gNum || 0).toString(16)).slice(-2);
  let b = ('0' + (bNum || 0).toString(16)).slice(-2);
  return '#' + r + g + b;
};
