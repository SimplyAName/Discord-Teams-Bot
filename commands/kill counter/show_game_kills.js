const { Command } = require('discord.js-commando');
const Database = require('@replit/database');
const database = new Database();

module.exports = class CreateTeamsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'show_game_kills',
			aliases: ['sgk', 'showgamekills'],
			group: 'kill counter',
			memberName: 'show_game_kills',
			description: 'Show the team kill scoreboard for a specific game.',
			examples: ['sgk', 'show_game_kills', 'showgamekills'],
			args: [
				{
					key: 'game',
					prompt: 'What game do you want to show?',
					type: 'string',
				},
			],
		});
	}

	async run(message, { game }) {

		const result = await database.getAll();

		console.log(result);

		if(result) {
			return message.say('```' + JSON.stringify(result) + '```');
		}

		return message.say('You don\'t have any stats saved');
	}
};