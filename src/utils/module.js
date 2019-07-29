import KxmRouters from '../router/modules/KxmRouters'
import ZzqpRouters from '../router/modules/ZzqpRouters'
import CompanyZzqpRouters from '../router/modules/CompanyZzqpRouters'

//本地
const local = 'localhost'

const KXM = {
  //凯旋门
  kx:'39.98.188.43'
}
const Zz = {
  // 至尊棋牌
  zzqp:'140.143.162.86',
  //君君娱乐
  junjun: '49.232.35.123'
}

// 端口号
const prot = 53803

const module = {
  KXM:{
    joinPro: (baseUrl,routers,title='管理后台')=>{
      return {
        title,
        baseUrl:`http://${baseUrl}:${prot}/KXM`,
        routers
      }
    }
  },
  Zzqp:{
    joinPro: (baseUrl,routers,title='管理后台')=>{
      return {
        title,
        baseUrl:`http://${baseUrl}:${prot}/ZZQP`,
        routers
      }
    }
  }
}
const project = module.Zzqp.joinPro(Zz.zzqp,CompanyZzqpRouters)

// 项目模块配置
export const title = project.title
export const baseUrl = project.baseUrl
export const viewRouters = project.routers
