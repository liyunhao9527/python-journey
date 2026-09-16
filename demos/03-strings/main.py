raw_name = input("姓名：")
raw_minutes = input("分钟：")
name = raw_name.strip()
minutes = int(raw_minutes)
hours = minutes / 60
print(f"{name}，本次学习 {minutes} 分钟（{hours:.2f} 小时）。")
