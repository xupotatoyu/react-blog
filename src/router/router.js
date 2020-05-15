import Loadable from 'react-loadable';

const loadComponent = (component) => {
  return Loadable({
    loader: () => import(`../containters/${component}/${component}.js`),
    loading: () => null
  })
}

const routes = [
  {
    path: '/main',
    component: loadComponent('Main'),
    exact: true,
		title: '主页'
  },
  {
    path: '/sign',
    component: loadComponent('Sign'),
    exact: true,
		title: '登录'
  },
  {
    path: '/manage',
    component: loadComponent('Manage'),
    exact: true,
		title: '用户管理界面'
  },
  {
    path: '/write',
    component: loadComponent('Write'),
    exact: true,
		title: '写博客'
  },
  {
    path: '/edit/:id',
    component: loadComponent('Edit'),
    exact: true,
		title: '修改博客'
  },
  {
    path: '/detail/:id',
    component: loadComponent('Detail'),
    exact: true,
		title: '文章页面'
  },
]

export default routes;