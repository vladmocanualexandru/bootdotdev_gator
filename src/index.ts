import { setUser, readConfig } from "./config";

function main() {
  console.log("Hello, world!");

  const testConfig = {
    dbUrl: "postgres://example"
  };

  setUser("Vlad", testConfig);
  console.log(readConfig());

}

main();
