import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

//Element-plus 按需导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'

//路径重命名path引入
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
 plugins: [
  vue(),
  AutoImport({
   resolvers: [ElementPlusResolver()],
  }),
  Components({
   resolvers: [ElementPlusResolver()],
  }),
 ],
 //路径重命名
 resolve: {
  alias: {
   '~': resolve(__dirname, './'),//[problem] 此路径重写只能用于css资源导入(背景图引入)
   '@': resolve(__dirname, 'src'),//[problem] 可以用于组件引用，但好像不能用于动态组件引入
  },
 },
})
