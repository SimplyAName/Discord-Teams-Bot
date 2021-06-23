const { Command } = require('discord.js-commando');
const Database = require('@replit/database');
const database = new Database();

module.exports = class CreateTeamsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'show_user_kills',
			aliases: ['suk', 'showuserkills'],
			group: 'kill counter',
			memberName: 'show_user_kills',
			description: 'Show the team kill count scoreboard.',
			examples: ['suk', 'show_user_kills', 'showuserkills'],
			args: [
				{
					key: 'user',
					prompt: 'What user do you want to show?',
					type: 'user',
				},
			],
		});
	}

	async run(message, { user }) {

		const result = await database.getAll();

		console.log(result);

		if(result) {
			return message.say('```' + JSON.stringify(result) + '```');
		}

		return message.say('You don\'t have any stats saved');
	}
};