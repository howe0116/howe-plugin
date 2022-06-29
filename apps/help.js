import lodash from "lodash";
import { segment } from "oicq";
import fs from "fs";
import { version } from "../components/Changelog.js";
import {changelogs } from "../components/Changelog.js";
const _path = process.cwd();

export const rule = {
  versionInfo: {
    reg: "^#?howe版本$",
    priority: 100,
    describe: "版本",
  }
};

export function versionInfo(e) {
  e.reply(`当前版本：v${version}\n ${changelogs}`);
  return true;
}
