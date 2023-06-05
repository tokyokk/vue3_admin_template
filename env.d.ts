/// <reference types="vite/client" />
// 这里就新建一个 env.d.ts 文件
declare module '*.vue' {
    import { defineComponent } from 'vue'
    const Component: ReturnType<typeof defineComponent>
    export default Component
}
