import lodash from "lodash";
import { segment } from "oicq";
import fs from "fs";
import { version } from "../components/Changelog.js";

const _path = process.cwd();

export const rule = {
  versionInfo: {
    reg: "^#?参考面板说明$",
    priority: 100,
    describe: "版本",
  }
};

export function versionInfo(e) {
  e.reply(`参考面板来源:https://bbs.nga.cn/read.php?tid=25843014`);
  return true;
}
