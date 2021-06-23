require('dotenv').config();

const path = require('path');

const { CommandoClient } = require('discord.js-commando');
const client = new CommandoClient({
	commandPrefix: '!',
	owner: '180406165295857665',
	disableEveryone: true,
});

client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setActivity('with zerglings');

	console.log('Ready to beep and boop!');
});

client.registry
	.registerDefaultTypes()
	.registerDefaultGroups()
	.registerDefaultCommands({ unknownCommand: false })
	.registerGroups([
		['team creator', 'Create random teams'],
		['kill counter', 'Track team kills'],
	])
	.registerCommandsIn(path.join(__dirname, 'commands'));

client.login(process.env.DISCORD_KEY);