import { versionInfo } from "./apps/help.js";
import { version } from "./components/Changelog.js";
import { refer_Artifacts } from "./apps/refer_Artifacts";
import { refer_description } from "./apps/help";


export {
  refer_Artifacts,
  versionInfo
};


let rule = {
  refer_Artifacts: {
    reg: "^#*[^-~]+参考面板+$",
    describe: "参考面板",
  },
  versionInfo: {
    reg: "^#?howe版本$",
    describe: "版本",
},
  refer_description:{
    reg: "^#?参考面板说明$",
    describe: "说明",

}
};

export { rule };

console.log(`howe插件${version}初始化~`);

setTimeout(async function () {
  let msgStr = await redis.get("howe:restart-msg");
  if (msgStr) {
    let msg = JSON.parse(msgStr);
    await common.relpyPrivate(msg.qq, msg.msg);
    await redis.del("howe:restart-msg");
    let msgs = [`当前howe版本: ${version}`, `您可使用 #howe版本 命令查看更新信息`];
    await common.relpyPrivate(msg.qq, msgs.join("\n"));
  }
}, 1000);