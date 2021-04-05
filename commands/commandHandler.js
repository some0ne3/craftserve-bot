const config = require("./../config.json");

const channels = [];
const commands = {};

require("fs").readdirSync("./commands").forEach(function(file) {
    if (file === "index.js") {
        return;
    }

    const command = require("./" + file);
    let channelList = command.channel || config.channels;

    if (!(channelList instanceof Array)) {
        channelList = [channelList];
    }

    command.channel = channelList;

    for (let i = 0; i < channelList.length; i++) {
        channels.indexOf(channelList[i]) === -1 && channels.push(channelList[i]);
    }

    let prefixList = command.prefix || config.prefix;

    if (!(prefixList instanceof Array)) {
        prefixList = [prefixList];
    }

    command.prefix = prefixList;

    let commandList = command.command;

    if (!(commandList instanceof Array)) {
        commandList = [commandList];
    }

    command.command = commandList;

    for (let x = 0; x < prefixList.length; x++) {
        for (let i = 0; i < commandList.length; i++) {
            let prefix = prefixList[x];
            let commandPrefix = commands[prefix];

            if (!commandPrefix) {
                commandPrefix = [];
                commands[prefix] = commandPrefix;
            }
            commandPrefix[commandList[i]] = command;
        }
    }
});

module.exports.callCommand = function(args, message) {

    if (args.length < 2) {
        return;
    }

    const prefixList = commands[args[0]];

    if (!prefixList) {
        return;
    }

    const command = prefixList[args[1]];

    if (!command) {
        return;
    }

    command.callback(args.slice(2), message);

    return;
};