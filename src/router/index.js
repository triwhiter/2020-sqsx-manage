import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);


const routes = [
        {
            path: '/',
            component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Login.vue')
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/icon',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/table',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '订单管理' }
                },
                {
                    path: '/productTable',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/productTable.vue'),
                    meta: { title: '商品表格' }
                },
				{
				    path: '/rubbish',
				    component: () => import(/* webpackChunkName: "table" */ '../components/page/Rubbish.vue'),
				    meta: { title: '回收站' }
				},
                {
                    path: '/userTable',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/userTable.vue'),
                    meta: { title: '用户表格' }
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
 ]
 
 const router = new Router({
   routes
 })
 
 // 挂载路由导航守卫,to表示将要访问的路径，from表示从哪里来，next是下一个要做的操作 next('/login')强制跳转login
 router.beforeEach((to, from, next) => {
   // 访问登录页，放行
   if (to.path === '/login') return next()
   // 获取token
   const tokenStr = window.sessionStorage.getItem('ms_username')
   // 没有token, 强制跳转到登录页
   if (!tokenStr) return next('/login')
   next()
 })
 
 export default router
	
