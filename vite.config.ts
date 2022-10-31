import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
//Element-plus 按需导入
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';
export default defineConfig({
  plugins: [
    // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
    vue(),
    // 配置tsx,jsx
    vueJsx(),
    // * EsLint 报错信息显示在浏览器界面上
    eslintPlugin(),
    // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
    AutoImport({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'Icon'
        })
      ]
      // dts: resolve(resolve(__dirname, 'src'), 'auto-imports.d.ts'),
    }),
    Components({
      resolvers: [
        // 自动导入 Element Plus 组件
        ElementPlusResolver(),
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep']
        })
      ]
      // dts: resolve(resolve(__dirname, 'src'), 'components.d.ts'),
    }),
    Icons({
      autoInstall: true
    })
  ],
  //路径重命名
  resolve: {
    alias: {
      '~': resolve(__dirname, './'), //[problem] 此路径重写只能用于css资源导入(背景图引入)
      '@': resolve(__dirname, 'src') //[problem] 可以用于组件引用，但好像不能用于动态组件引入 (Ts:需要在ts配置文件额外配置 baseUrl path)
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/styles/varible.scss";'
      }
    }
  }
});
