import { setUser, readConfig } from "../config";
import { getUserByName } from "../lib/db/queries/users";
import { createUser } from "../lib/db/queries/users";
import { deleteAllUsers, getUsers } from "../lib/db/queries/users";

export async function handlerLogin(cmdName: string, ...args: string[]) {
  if (!args || args.length === 0) {
    throw new Error("Login requires one parameter.");
  }

  const user = await getUserByName(args[0]);

  if (!user) {
    throw new Error("User not found.");
  }

  setUser(args[0]);
  console.log("Current user set to:", args[0]);

}

export async function handlerRegister(cmdName: string, ...args: string[]) {
  if (!args || args.length === 0) {
    throw new Error("Register requires one parameter.");
  }

  await createUser(args[0]);

  setUser(args[0]);
  console.log("Current user registered as:", args[0]);
}

export async function handlerReset(cmdName: string, ...args: string[]) {
  await deleteAllUsers();
  console.log("All users have been deleted.");
}

export async function handlerUsers(cmdName: string, ...args: string[]) {
  const users = await getUsers();
  const config = readConfig();
  for (let user of users) {
      console.log(`* ${user.name} ${config.currentUserName === user.name ? "(current)" : ""}`);
  }
}

