minutes = 25
previous = minutes
minutes = minutes + 5
print(previous, minutes)

sessions = [25]
shared = sessions
shared.append(5)
print(sessions, shared)

separate = [25, 5]
print(sessions == separate)
print(sessions is separate)
print(sessions is shared)
