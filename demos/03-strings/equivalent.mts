import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

const terminal = createInterface({ input: stdin, output: stdout });
const rawName = await terminal.question("姓名：");
const rawMinutes = await terminal.question("分钟：");
terminal.close();
const name = rawName.trim();
const minutes = Number(rawMinutes);
const hours = minutes / 60;
console.log(`${name}，本次学习 ${minutes} 分钟（${hours.toFixed(2)} 小时）。`);
