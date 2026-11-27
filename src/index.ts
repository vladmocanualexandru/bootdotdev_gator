import { argv } from 'process';
import { handlerLogin, handlerRegister, handlerReset, handlerUsers } from "./commands/users";
import { handlerAgg } from "./commands/rss";
import { handlerAddFeed, handlerFeeds, handlerFollow, handlerFollowing} from "./commands/feeds";
import { CommandsRegistry, registerCommand, runCommand } from "./commandRegistry";



async function main() {
  try {
    const commandsRegistry:CommandsRegistry = {};
  
    registerCommand(commandsRegistry, "login", handlerLogin);
    registerCommand(commandsRegistry, "register", handlerRegister);
    registerCommand(commandsRegistry, "reset", handlerReset);
    registerCommand(commandsRegistry, "users", handlerUsers);
    registerCommand(commandsRegistry, "agg", handlerAgg);

    registerCommand(commandsRegistry, "addfeed", handlerAddFeed);
    registerCommand(commandsRegistry, "follow", handlerFollow);
    registerCommand(commandsRegistry, "following", handlerFollowing);
    registerCommand(commandsRegistry, "feeds", handlerFeeds);
  
    const args = argv.slice(2);
  
    if (args.length === 0) {
      console.error("No command provided.");
      process.exit(1);
    }
  
    await runCommand(commandsRegistry, args[0], ...args.slice(1));

    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

main();
