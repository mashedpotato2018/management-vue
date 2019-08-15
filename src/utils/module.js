// 凯旋门
import KxmRouters from '../router/modules/KxmRouters'

// 至尊棋牌
import ZzqpRouters from '../router/modules/ZzqpRouters'
import CompanyZzqpRouters from '../router/modules/CompanyZzqpRouters'

// 君君娱乐
import JunJunRouters from '../router/modules/JunJunRouters'
import CompanyJunJunRouters from '../router/modules/CompanyJunJunRouters'

// 本地
const local = 'localhost'

const KXM = {
  // 凯旋门
  kx: '39.98.188.43',
  test: '39.100.153.211'
}
const Zz = {
  // 至尊棋牌
  zzqp: '140.143.162.86',
  newzzqp: '103.37.234.58'
}
const JunJun = {
  // 君君娱乐
  junjun: '152.136.160.73',
  junyue: '139.155.17.199'
}

// 端口号
// const prot = 53803
const prot = 6061

const module = {
  KXM: {
    joinPro: (baseUrl, routers, title = '管理后台') => {
      return {
        title,
        baseUrl: `http://${baseUrl}:${prot}/KXM`,
        routers
      }
    }
  },
  Zzqp: {
    joinPro: (baseUrl, routers, title = '管理后台') => {
      return {
        title,
        baseUrl: `http://${baseUrl}:${prot}/ZZQP`,
        routers
      }
    }
  },
  JunJun: {
    joinPro: (baseUrl, routers, title = '管理后台') => {
      return {
        title,
        baseUrl: `http://${baseUrl}:${prot}/JunJun`,
        routers
      }
    }
  }
}
// 生成项目
function makePro(url) {
  return {
    junjun: {
      base: module.JunJun.joinPro(url, JunJunRouters),
      Company: module.JunJun.joinPro(url, CompanyJunJunRouters)
    },
    zzqp: {
      base: module.Zzqp.joinPro(url, ZzqpRouters),
      Company: module.Zzqp.joinPro(url, CompanyZzqpRouters)
    },
    kxm: {
      base: module.KXM.joinPro(url, KxmRouters)
    }
  }
}

// 项目
const project = makePro(KXM.kx).kxm.base
// const project = makePro(JunJun.junyue).junjun.Company

// 项目模块配置
export const title = project.title
export const baseUrl = project.baseUrl
export const viewRouters = project.routers
