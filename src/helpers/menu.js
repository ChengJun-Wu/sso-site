export default [
  {
    icon: 'ios-people',
    name: '用户',
    children: [
      {
        name: '用户',
        path: '/backend/user'
      }
    ]
  },
  {
    icon: 'ios-key',
    name: '权限',
    children: [
      {
        name: '权限',
        path: '/backend/auth'
      },
      {
        name: '路由',
        path: '/backend/route'
      }
    ]
  }
]
