const { Command } = require('discord.js-commando');
const Database = require('@replit/database');
const database = new Database();

module.exports = class CreateTeamsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'remove_kill',
			aliases: ['rk', 'removekill'],
			group: 'kill counter',
			memberName: 'remove_kill',
			description: 'Remove a team kill from the scoreboard.',
			examples: ['rk', 'remove_kill', 'removekill'],
			args: [
				{
					key: 'user',
					prompt: 'What user do you want to add kills to?',
					type: 'user',
				},
				{
					key: 'game',
					prompt: 'What game do you want to add this too?',
					type: 'string',
				},
				{
					key: 'amount',
					prompt: 'How many kills you want to add',
					type: 'integer',
					default: 1,
				},
			],
		});
	}

	async run(message, { user, game, amount }) {

		const result = await database.get(game);

		const username = user.username;

		if (result == null) {
			return message.say(`No kill count for ${game} found`);
		}

		if (result[username]) {
			result[username] -= amount;

			if(result[username] < 0) {
				result[username] = 0;
			}
		}
		else{
			return message.say(`${user} was already at 0 kills. Nothing removed`);
		}

		await database.set(game, result);

		return message.say(`${user} now has ${result[username]} kill for ${game}`);
	}
};