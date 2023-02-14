# 唱游数据内部ui组件库及工具库

## 📦安装
```shell
npm install cy-ui-component --registry https://nexus.12301.cloud/repository/npm-group
```
```shell
yarn config set registry https://nexus.12301.cloud/repository/npm-group
# Yarn v2+ uses a different configuration key for updating the NPM registry, called npmRegistryServer
yarn config set npmRegistryServer https://nexus.12301.cloud/repository/npm-group

yarn add cy-ui-component
```

## 🔨使用

### 组件
```jsx
import React from 'react';
import { CyCard, CyTop } from 'cysj-ui-component';
const App = () => (
  <>
    <CyCard title="title">
        <CyTop data={data}></CyTop>
    </CyCard>
  </>
);
```

### 图表
-  [折线图](./charts/line.md)
-  [柱状图](./charts/bar.md)
-  [饼状图](./charts/pie.md)
