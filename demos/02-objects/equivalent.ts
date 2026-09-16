let minutes = 25;
const previous = minutes;
minutes = minutes + 5;
console.log(previous, minutes);

const sessions = [25];
const shared = sessions;
shared.push(5);
console.log(sessions, shared);

const separate = [25, 5];
console.log(sessions === separate);
console.log(sessions === shared);
