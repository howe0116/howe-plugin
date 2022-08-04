/** 导入plugin */
import plugin from '../../lib/plugins/plugin.js'
import gsCfg from '../genshin/model/gsCfg.js'
import { segment } from 'oicq'
import fs from 'node:fs'

export class referartifact extends plugin {
  constructor () {
    super({
      name: 'nga参考面板',
      dsc: 'nga参考面板',
      event: 'message',
      priority: 500,
      rule: [
        {
          reg: '^#*(.*)参考面板$',
          fnc: 'referartifact'
        }
      ]
    })

    this.path = './resources/refer_Artifacts'//存放参考面板图片 自己想放哪里就改成相应路径吧
    
  }

  

  /** #刻晴参考面板 */
  async referartifact () {
    

    let role = gsCfg.getRole(this.e.msg, '参考面板')

    if (!role) return

    /** 主角特殊处理 */
    if (['10000005', '10000007', '20000000'].includes(String(role.roleId))) {
      if (!['风主', '岩主', '雷主', '草主'].includes(role.alias)) {
        await this.e.reply('请选择：风主参考面板、岩主参考面板、雷主参考面板')
        return
      } else {
        role.name = role.alias
      }
    }

    this.sfPath = `${this.path}/${role.name}.png`
    
    if (fs.existsSync (this.sfPath)) {
      //最后回复消息
      let msg = [
          segment.image (this.sfPath),
          '[来源:nga @bluemushoom]',
      ];
      //发送消息
      await this.e.reply (msg);
  } else {
    await this.e.reply ("暂时无该角色参考面板~>_<");
  }

    
  }
}
