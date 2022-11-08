import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import requireTransform from 'vite-plugin-require-transform';
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
    // require 语法适配
    requireTransform({
      // fileRegex: /.ts$|.tsx$|.vue$/
      fileRegex:/.js$|.jsx$|.vue$/
    }),
    // * EsLint 报错信息显示在浏览器界面上
    // eslintPlugin(),
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
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html') //打包后的入口文件 比如dist/index.html
      },
      output: {
        //分割打包文件 js css img...
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/jss/[name]-[hash].js',
        assetFileNames: 'static/[ext]/name-[hash].[ext]',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    },
    terserOptions: {
      compress: {
        // 清除console和debugger
        drop_console: true,
        drop_debugger: true
      }
    },
    // 提高静态资源的容量大小
    chunkSizeWarningLimit: 1000
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/styles/varible.scss";'
      }
    }
  }
});
