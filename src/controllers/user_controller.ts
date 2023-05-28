import users from "../data/users.json";

type User = (typeof users)[number];

export function getID(username: string): number {
  const index = users.findIndex((user) => user.username === username);
  if (index < 0) throw new Error("User not found");

  return index;
}

export function byID(id: number): User {
  const user = users[id];
  if (!user) throw new Error("User ID not found");

  return user;
}

export function byUsername(username: string): User {
  const index = getID(username);
  return byID(index);
}

export function checkPassword(user: string, password: string): boolean {
  const userObj = byUsername(user);
  return userObj.password === password;
}

export function add(user: User): User {
  users.push(user);
  return user;
}

export function updateUser(
  userInfo: { username: string; password: string },
  user: User
): void {
  if (!checkPassword(userInfo.username, userInfo.password))
    throw new Error("Incorrect password");

  const index = getID(userInfo.username);
  users[index] = user;
}

export function deleteUser(userInfo: {
  username: string;
  password: string;
}): void {
  if (!checkPassword(userInfo.username, userInfo.password))
    throw new Error("Incorrect password");

  const index = getID(userInfo.username);
  users.splice(index, 1);
}
