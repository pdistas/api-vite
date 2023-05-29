import users from "../data/users.json";
import * as crypt from "../crypt";

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

export async function checkPassword(user: string, password: string) {
  const userObj = byUsername(user);
  return crypt.compare(password, userObj.password);
}

export async function add(user: User): Promise<User> {
  user.password = await crypt.hash(user.password);
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

  const userToUpdate = users[index];

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
