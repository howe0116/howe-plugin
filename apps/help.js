import lodash from "lodash";
import { segment } from "oicq";
import fs from "fs";
import { version } from "../components/Changelog.js";

const _path = process.cwd();

export const rule = {
  versionInfo: {
    reg: "^#?howe版本$",
    priority: 100,
    describe: "版本",
  },
  refer_description: {
    reg: "^#?参考面板说明$",
    priority: 100,
    describe: "说明",
  },
};

export function versionInfo(e) {
  e.reply(`当前版本：v${version}`);
  return true;
}
export function refer_description(e) {
  e.reply(`来源:https://bbs.nga.cn/read.php?tid=25843014 \n输入角色+参考面板查看`);
  return true;
}