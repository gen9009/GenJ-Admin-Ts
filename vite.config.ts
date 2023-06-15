import { defineConfig, loadEnv, ConfigEnv, UserConfig } from 'vite';
import { wrapperEnv } from './src/utils/getEnv';
import vue from '@vitejs/plugin-vue';
import requireTransform from 'vite-plugin-require-transform';
import { createHtmlPlugin } from 'vite-plugin-html';
// import eslintPlugin from 'vite-plugin-eslint';
//Element-plus 按需导入
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  // [problem] loadEnv会将定义的环境变量转为 String
  const env = loadEnv(mode, process.cwd());
  // 通过工具函数, 主动将 env 数据转为正常值
  const viteEnv = wrapperEnv(env);

  return {
    base: './',
    plugins: [
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      vue(),
      // 配置tsx,jsx
      vueJsx(),
      // require 语法适配
      requireTransform({
        // fileRegex: /.ts$|.tsx$|.vue$/
        fileRegex: /.js$|.jsx$|.vue$/
      }),
      createHtmlPlugin({
        //为入口文件index.html 注入可用数据
        inject: {
          data: {
            ...env
            // injectScript: `<script type="module" src=""></script>`,
          }
        }
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
        '@': resolve(__dirname, './src'), //[problem] 可以用于组件引用，但好像不能用于动态组件引入 (Ts:需要在ts配置文件额外配置 baseUrl path)
        '~': resolve(__dirname, './') //[problem] 此路径重写只能用于css资源导入(背景图引入)
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/styles/varible.scss";'
        }
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
    server: {
      host: '0.0.0.0', // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      cors: true,
      // https: false,
      proxy: {
        '/api': {
          target: 'https://www.fastmock.site/mock/99e6f727febc6dbdd2c57b1600176d59/admin', // easymock
          changeOrigin: true
          // rewrite: path => path.replace(/^\/api/, '')
        }
      }
    }
  };
});
