import { setUser, readConfig } from "./config";
import { argv } from 'process';

type CommandHandler = (cmdName: string, ...args: string[]) => void;

type CommandsRegistry = {
  [commandName: string]: CommandHandler;
}

function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler) {
  registry[cmdName] = handler;
}

function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]) {
  if (!registry[cmdName]) {
    throw new Error(`Command not found: ${cmdName}`);
  }

  registry[cmdName](cmdName, ...args);
}

function handlerLogin(cmdName: string, ...args: string[]) {
  if (!args || args.length === 0) {
    throw new Error("Login requires one parameter.");
  }

  setUser(args[0]);
  console.log("Current user set to:", args[0]);

}

function main() {
  const commandsRegistry:CommandsRegistry = {};

  registerCommand(commandsRegistry, "login", handlerLogin);

  const args = argv.slice(2);

  if (args.length === 0) {
    console.error("No command provided.");
    process.exit(1);
  }

  runCommand(commandsRegistry, args[0], ...args.slice(1));
}

main();
