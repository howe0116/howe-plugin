import { segment } from "oicq";
import fs from "fs";
import lodash from "lodash";
import { createRequire } from "module";
import { exec } from "child_process";

export const rule = {
    updateMiaoPlugin: {
        hashMark: true,
        reg: "^#howe(强制)?更新",
        describe: "【#管理】howe更新",
      }
}
const _path = process.cwd();
const checkAuth = async function (e) {
  return await e.checkAuth({
    auth: "master",
    replyMsg: `只有主人才能命令喵喵哦~
    (*/ω＼*)`
  });
}
let timer;
export async function updateMiaoPlugin(e) {
    if (!await checkAuth(e)) {
      return true;
    }
    let isForce = e.msg.includes("强制");
    let command = "git  pull";
    if (isForce) {
      command = "git  checkout . && git  pull";
      e.reply("正在执行强制更新操作，请稍等");
    } else {
      e.reply("正在执行更新操作，请稍等");
    }
    exec(command, { cwd: `${_path}/plugins/howe-plugin/` }, function (error, stdout, stderr) {
      if (/Already up[ -]to[ -]date/.test(stdout)) {
        e.reply("目前已经是最新版howe了~");
        return true;
      }
      if (error) {
        e.reply("howe更新失败！\nError code: " + error.code + "\n" + error.stack + "\n 请稍后重试。");
        return true;
      }
      e.reply("howe更新成功，正在尝试重新启动Yunzai以应用更新...");
      timer && clearTimeout(timer);
      redis.set("howe:restart-msg", JSON.stringify({
        msg: "重启成功，新版howe已经生效",
        qq: e.user_id
      }), { EX: 30 });
      timer = setTimeout(function () {
        let command = `npm run start`;
        if (process.argv[1].includes("pm2")) {
          command = `npm run restart`;
        }
        exec(command, function (error, stdout, stderr) {
          if (error) {
            e.reply("自动重启失败，请手动重启以应用新版howe。\nError code: " + error.code + "\n" + error.stack + "\n");
            Bot.logger.error('重启失败\n${error.stack}');
            return true;
          } else if (stdout) {
            Bot.logger.mark("重启成功，运行已转为后台，查看日志请用命令：npm run log");
            Bot.logger.mark("停止后台运行命令：npm stop");
            process.exit();
          }
        })
      }, 1000);
  
    });
    return true;
  }
  