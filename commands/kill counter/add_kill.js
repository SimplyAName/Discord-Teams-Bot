const { Command } = require('discord.js-commando');
const Database = require('@replit/database');
const database = new Database();

module.exports = class CreateTeamsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'add_kill',
			aliases: ['ak', 'addkill'],
			group: 'kill counter',
			memberName: 'add_kill',
			description: 'Add a team kill to the scoreboard.',
			examples: ['ak', 'add_kill', 'addkill'],
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

		let result = await database.get(game);

		const username = user.username;

		if (result == null) {
			result = { [username]: amount };
		}
		else if (result[username]) {
			result[username] += amount;
		}
		else{
			result[username] = amount;
		}

		await database.set(game, result);

		return message.say(`${user} now has ${result[username]} kill for ${game}`);
	}
};