import lodash from "lodash";
import { segment } from "oicq";
import fs from "fs";
import { version } from "../components/Changelog.js";
import {changelogs } from "../components/Changelog.js";
import { refer_Artifacts } from "./refer_Artifacts.js";
const _path = process.cwd();

export const rule = {
  versionInfo: {
    reg: "^#?howe版本$",
    priority: 100,
    describe: "版本",
  },
  refer_Artifacts_Desc:{
    reg: "^#?参考面板说明$",
    priority: 100,
    describe: "参考面板说明",
  }
};

export function versionInfo(e) {
  e.reply(`当前版本：v${version}`);
  return true;
}
let path=`${_path}/plugins/howe-plugin/resources/help/refer_Artifacts_help.png`;
export function refer_Artifacts_Desc(e){
  let msg = [
    segment.image (path),]
  e.reply(msg);
}
