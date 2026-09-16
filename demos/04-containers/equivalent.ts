const first: { topic: string; minutes: number; note?: string } = {
  topic: "字符串", minutes: 25,
};
const second = { topic: "容器", minutes: 30 };
const records = [first];
records.push(second);
// ! 仅告知 TS 此处元素存在；运行时保证来自上面的数组构造与 push。
records[0]!.minutes = 35;

const total = records[0]!.minutes + records[1]!.minutes;
console.log(`共 ${records.length} 条记录，合计 ${total} 分钟。`);
console.log(records[1]!.topic);
console.log(Object.hasOwn(records[0]!, "note") ? records[0]!.note : "未填写");
