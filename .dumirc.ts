/*
 * @Description: 
 * @Author: handongliang dongliang.han@12301.cn
 * @Date: 2023-02-10 11:32:35
 * @LastEditors: handongliang dongliang.han@12301.cn
 * @LastEditTime: 2023-02-14 14:00:52
 */

import { defineConfig } from 'dumi';
import path from 'path';
export default defineConfig({
  // pass theme config
  apiParser: {},
  resolve: {
    docDirs: [{ type: 'doc', dir: 'docs' }],
    atomDirs: [{ type: 'component', dir: 'components' }],
    // codeBlockMode: 'passive',
    entryFile: './components/index.ts',
  },
  alias: {
    'cysj-ui-components': path.join(__dirname, 'components'),
},
  themeConfig: {
    name: 'cysj-ui-components',
    nav:  [
      { title: '指南', link: '/docs/guide' },
      { title: '组件总览', link: '/components/button' }
    ],
    footer: 'cysj | Copyright © 2023-present',
    sidebarGroupModePath: ['/config'],
    title: 'cysj-ui-components',
    description: '唱游数据内部ui组件库及工具库',
    actions: [
      {
        type: 'primary',
        text: '开始使用',
        link: '/docs/guide'
      },
      {
        text: '配置',
        link: '/components/button'
      }
    ],
  }
});