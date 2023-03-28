import { HomeMenu } from './HomeMenu';
import { CompMenu } from './CompMenu';
import { CanvasMenu } from './CanvasMenu';
import { DirectiveMenu } from './DirectiveMenu';
import { CSSMenu } from './CSSMenu';

/* 
  {
    title:'首页',   //展示标题
    icon:'',       //展示图标
    menu:homeList  //菜单列表
  }
*/
const NavTabs: Menu.MenuNav[] = [
  {
    title: '首页',
    icon: '',
    active:true,
    menu: HomeMenu 
  },
  {
    title: '组件',
    icon: '',
    menu: CompMenu
  },
  {
    title: '画布',
    icon: '',
    menu: CanvasMenu
  },
  {
    title: '指令',
    icon: '',
    menu: DirectiveMenu
  },
  {
    title: 'Fun',
    icon: '',
    menu: CSSMenu
  }
  // {
  //   title: '外链',
  //   icon: '',
  //   menu: LinkMenu
  // }
];
export default NavTabs;
