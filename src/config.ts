import os from "os";
import path from "path";
import fs from "fs";

export type Config = {
    dbUrl: string;
    currentUserName?: string;
};

function validateConfig(config: any) : Config {
    return JSON.parse(config) as Config;
}

function writeConfig(config: any) {
    fs.writeFileSync(getConfigFilePath(), JSON.stringify(config, null, 2));
}

function getConfigFilePath(): string {
    const homeDir = os.homedir();

    return path.join(homeDir, ".gatorconfig.json");
}

export function setUser(userName:string) : Config {

    const config = readConfig();
    
    config.currentUserName = userName;

    writeConfig(config);

    return config;
}

export function readConfig(): Config {
    const configFilePath = getConfigFilePath();

    if (!fs.existsSync(configFilePath)) {
        throw new Error("Config file does not exist");
    }

    const configContent = fs.readFileSync(configFilePath, "utf-8");
    return validateConfig(configContent);
}