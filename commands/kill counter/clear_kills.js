const { Command } = require('discord.js-commando');
const Database = require('@replit/database');
const database = new Database();

module.exports = class CreateTeamsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'clear_kills',
			group: 'kill counter',
			memberName: 'clear_kills',
			description: 'Clears the scoreboard.',
			examples: ['clear_kills'],
		});
	}

	async run(message) {
		await database.empty();

		return message.say('Database cleared');
	}
};