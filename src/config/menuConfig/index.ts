import { HomeMenu } from './HomeMenu.ts';
import { CompMenu } from './CompMenu.ts';
import { CanvasMenu } from './CanvasMenu.ts';
import { DirectiveMenu } from './DirectiveMenu.ts';

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
  }
  // {
  //   title: '外链',
  //   icon: '',
  //   menu: LinkMenu
  // }
];
export default NavTabs;
