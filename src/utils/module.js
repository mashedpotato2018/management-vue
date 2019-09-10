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
  test: '39.100.153.211',
  // 旋王争霸
  xwzb: '149.234.157.71',
  //掌上旋
  zsx: '119.27.160.138',
  //32旋
  sanerxuan: '139.9.146.72'
}

//至尊系列以启用
const Zz = {
  // 至尊棋牌
  zzqp: '140.143.162.86',
  newzzqp: '103.37.234.58',
  jinsha: '103.37.234.49'
}
const JunJun = {
  // 测试服
  test:'114.116.243.4',
  // 君君娱乐
  junjun: '152.136.160.73',
  // 君越(联盟)
  junyue: '45.40.199.237',
  // 星辰
  xingchen: '49.234.176.192'
}

const TongCheng ={

  // 同城娱乐
  tongcheng:'139.9.149.224'
}

// 端口号
// const prot = 53803
// const prot = 6061

const module = {
  KXM: {
    joinPro: (baseUrl, routers, title = '管理后台', prot) => {
      return {
        title,
        baseUrl: `http://${baseUrl}:${prot}/KXM`,
        routers
      }
    }
  },
  Zzqp: {
    joinPro: (baseUrl, routers, title = '管理后台', prot) => {
      return {
        title,
        baseUrl: `http://${baseUrl}:${prot}/ZZQP`,
        routers
      }
    }
  },
  JunJun: {
    joinPro: (baseUrl, routers, title = '管理后台', prot) => {
      return {
        title,
        baseUrl: `http://${baseUrl}:${prot}/JunJun`,
        routers
      }
    }
  },
  TongCheng: {
    joinPro: (baseUrl, routers, title = '管理后台', prot) => {
      return {
        title,
        baseUrl: `http://${baseUrl}:${prot}/TongCheng`,
        routers
      }
    }
  }
}
// 生成项目
function makePro(url,title='管理后台') {
  return {
    tongcheng:{
      base: module.TongCheng.joinPro(url, CompanyJunJunRouters,title,53803),
    },
    junjun: {
      base: module.JunJun.joinPro(url, JunJunRouters,title,53803),
      Company: module.JunJun.joinPro(url, CompanyJunJunRouters,title,53803)
    },
    zzqp: {
      base: module.Zzqp.joinPro(url, ZzqpRouters,title,53803),
      Company: module.Zzqp.joinPro(url, CompanyZzqpRouters,title,53803)
    },
    kxm: {
      base: module.KXM.joinPro(url, KxmRouters,title,6061)
    }
  }
}

// 项目
// const project = makePro(local,'本地').kxm.base
// const project = makePro(KXM.test,'测试').kxm.base
// const project = makePro(KXM.kx,'天地旋').kxm.base
// const project = makePro(KXM.zsx,'掌上旋').kxm.base
// const project = makePro(KXM.sanerxuan,'32旋').kxm.base

// const project = makePro(JunJun.test,'测试服').junjun.Company
// const project = makePro(Zz.jinsha,'金沙娱乐').junjun.Company
// const project = makePro(JunJun.xingchen,'星辰').junjun.Company
const project = makePro(JunJun.junyue,'联盟娱乐').junjun.Company
// const project = makePro(TongCheng.tongcheng,'同城娱乐').junjun.Company
// const project = makePro(local,'同城娱乐').junjun.Company

// const project = makePro(TongCheng.tongcheng,'同城娱乐').tongcheng.base
// const project = makePro(local,'同城娱乐').tongcheng.base


// 项目模块配置
export const title = project.title
export const baseUrl = project.baseUrl
export const viewRouters = project.routers
