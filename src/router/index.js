import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }
]

export const otherRoutes = [

  {
    path: '/ape',
    component: Layout,
    meta: { title: 'APE', icon: 'ape' },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/dashboard'),
        meta: { title: '數據概覽' }
      },
      {
        path: 'user-list',
        name: 'UserList',
        component: () => import('@/views/user/list'),
        meta: { title: '用戶管理' }
      },
      {
        path: 'nft-apes',
        name: 'NftApes',
        component: () => import('@/views/nft/apes'),
        meta: { title: '賽博猿NFT' }
      },
      {
        path: 'order',
        component: () => import('@/views/order'),
        alwaysShow: true,
        meta: { title: '訂單管理' },
        children: [
          {
            path: '',
            name: 'OrderList',
            component: () => import('@/views/order/list'),
            meta: { title: '參與訂單' }
          },
          {
            path: 'receive',
            name: 'OrderReceive',
            component: () => import('@/views/order/receive'),
            meta: { title: '領取記錄' }
          },
          {
            path: 'extract',
            name: 'OrderExtract',
            component: () => import('@/views/order/extract'),
            meta: { title: '提現記錄' }
          },
          {
            path: 'transfer',
            name: 'OrderTransfer',
            component: () => import('@/views/order/transfer'),
            meta: { title: '轉賬記錄' }
          }
        ]
      },
      {
        path: '/revenue',
        component: () => import('@/views/revenue'),
        alwaysShow: true,
        meta: { title: '收益管理' },
        children: [
          {
            path: '',
            name: 'RevenueStatic',
            component: () => import('@/views/revenue/static'),
            meta: { title: '靜態收益' }
          },
          {
            path: 'trends',
            name: 'RevenueTrends',
            component: () => import('@/views/revenue/trends'),
            meta: { title: '動態收益' }
          },
          {
            path: 'incentive',
            name: 'RevenueIncentive',
            component: () => import('@/views/revenue/incentive'),
            meta: { title: '永動激勵' }
          },
          {
            path: 'compensate',
            name: 'RevenueCompensate',
            component: () => import('@/views/revenue/compensate'),
            meta: { title: '永動補償' }
          },
          {
            path: 'union',
            name: 'RevenueUnion',
            component: () => import('@/views/revenue/union'),
            meta: { title: '聯盟收益' }
          }
        ]
      },
      {
        path: '/system',
        component: () => import('@/views/system'),
        alwaysShow: true,
        meta: { title: '系統管理' },
        children: [
          {
            path: '',
            name: 'SystemSet',
            component: () => import('@/views/system/set'),
            meta: { title: '系統設置' }
          },
          {
            path: 'account',
            name: 'SystemAccount',
            component: () => import('@/views/system/account'),
            meta: { title: '收款賬戶' }
          }
        ]
      }
    ]
  },
  {
    path: '/adi',
    component: Layout,
    alwaysShow: true,
    meta: { title: 'ADI質押', icon: 'adi' },
    children: [
      {
        path: '',
        name: 'ADIData',
        component: () => import('@/views/ADI/data'),
        meta: { title: '數據統計' }
      },
      {
        path: 'user',
        name: 'ADIUser',
        component: () => import('@/views/ADI/user'),
        meta: { title: '用戶列表' }
      },
      {
        path: 'income',
        name: 'ADIIncome',
        component: () => import('@/views/ADI/income'),
        meta: { title: '质押收益' }
      },
      {
        path: 'join',
        name: 'ADIJoin',
        component: () => import('@/views/ADI/join'),
        meta: { title: '质押記錄' }
      },
      {
        path: 'casual',
        name: 'ADICasual',
        component: () => import('@/views/ADI/casual'),
        meta: { title: '臨時訂單' }
      },
      {
        path: 'collect',
        name: 'ADICollect',
        component: () => import('@/views/ADI/collect'),
        meta: { title: '质押領取' }
      },
      {
        path: 'extract',
        name: 'ADIExtract',
        component: () => import('@/views/ADI/extract'),
        meta: { title: '資產提現' }
      },
      {
        path: 'equity',
        name: 'ADIEquity',
        component: () => import('@/views/ADI/equity'),
        meta: { title: '私募記錄' }
      },
      {
        path: 'harvest',
        name: 'ADIHarvest',
        component: () => import('@/views/ADI/harvest'),
        meta: { title: '私募领取' }
      },
      {
        path: 'exchange',
        name: 'ADIExchange',
        component: () => import('@/views/ADI/exchange'),
        meta: { title: '兌換記錄' }
      },
      {
        path: 'system',
        component: () => import('@/views/ADI/system'),
        alwaysShow: true,
        meta: { title: '系統管理' },
        children: [
          {
            path: '',
            name: 'ADISystemSet',
            component: () => import('@/views/ADI/system/set'),
            meta: { title: '系統設置' }
          }
        ]
      }
    ]
  },
  {
    path: '/adifi',
    component: Layout,
    alwaysShow: true,
    meta: { title: 'ADIFI', icon: 'adifi' },
    children: [
      {
        path: '',
        name: 'ADIFIUser',
        component: () => import('@/views/ADIFI/user'),
        meta: { title: '用戶列表' }
      },
      // {
      //   path: 'exchange',
      //   name: 'ADIFIExchange',
      //   component: () => import('@/views/ADIFI/exchange'),
      //   meta: { title: '兌換訂單' }
      // },
      {
        path: 'pledge',
        name: 'ADIFIPledge',
        component: () => import('@/views/ADIFI/pledge'),
        meta: { title: '質押記錄' }
      },
      {
        path: 'short-selling',
        name: 'ADIFIShortSelling',
        component: () => import('@/views/ADIFI/short-selling'),
        meta: { title: '沽空訂單' }
      },
      {
        path: 'burn',
        name: 'ADIFIBurn',
        component: () => import('@/views/ADIFI/burn'),
        meta: { title: '燃燒記錄' }
      },
      // {
      //   path: 'adopt',
      //   name: 'ADIFIAdopt',
      //   component: () => import('@/views/ADIFI/adopt'),
      //   meta: { title: '領取分紅' }
      // },
      {
        path: 'withdraw',
        name: 'ADIFIWithdraw',
        component: () => import('@/views/ADIFI/withdraw'),
        meta: { title: '提現記錄' }
      },
      {
        path: 'settle',
        name: 'ADIFISettle',
        component: () => import('@/views/ADIFI/settle'),
        meta: { title: '結算記錄' }
      },
      {
        path: 'media',
        name: 'ADIFIMedia',
        component: () => import('@/views/ADIFI/media'),
        meta: { title: '媒體設置' }
      }
    ]
  },

  {
    path: '/limit-authority',
    component: Layout,
    alwaysShow: true,
    meta: { title: '權限管理', icon: 'limit-authority' },
    children: [
      {
        path: '',
        name: 'BackstageUser',
        component: () => import('@/views/limit-authority/backstage-user'),
        meta: { title: '後臺用戶' }
      },
      {
        path: 'set-role',
        name: 'SetRole',
        component: () => import('@/views/limit-authority/set-role'),
        meta: { title: '角色管理' }
      },
      {
        path: 'set-point',
        name: 'SetPoint',
        component: () => import('@/views/limit-authority/set-point'),
        meta: { title: '權限管理' }
      }
    ]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
