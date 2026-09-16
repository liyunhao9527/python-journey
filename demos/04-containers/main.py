first = {"topic": "字符串", "minutes": 25}
second = {"topic": "容器", "minutes": 30}
records = [first]
records.append(second)
records[0]["minutes"] = 35

total = records[0]["minutes"] + records[1]["minutes"]
print(f"共 {len(records)} 条记录，合计 {total} 分钟。")
print(records[1]["topic"])
print(records[0].get("note", "未填写"))
