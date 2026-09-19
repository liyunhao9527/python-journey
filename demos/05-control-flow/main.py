records = [
    {"topic": "字符串", "minutes": 25},
    {"topic": "容器", "minutes": 30},
    {"topic": "字符串", "minutes": 15},
]

total = 0
long_sessions = []
for index, record in enumerate(records, start=1):
    total += record["minutes"]
    if record["minutes"] >= 25:
        long_sessions.append(record["topic"])
    print(f"第 {index} 条：{record['topic']}（{record['minutes']} 分钟）")

print(f"总计 {total} 分钟")
print(f"达到 25 分钟：{', '.join(long_sessions)}")
