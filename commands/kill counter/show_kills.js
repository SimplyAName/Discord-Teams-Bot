const { Command } = require('discord.js-commando');
const Database = require('@replit/database');
const database = new Database();

const { table } = require('table');

module.exports = class CreateTeamsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'show_kills',
			aliases: ['sk', 'showkills'],
			group: 'kill counter',
			memberName: 'show_kills',
			description: 'Show the team kill count scoreboard.',
			examples: ['tk', 'team_kills', 'teamkill'],
		});
	}

	async run(message) {

		const result = await database.getAll();

		if(result) {
			const [games, player_stats] = getData(result);

			return message.say('``` Red coat defections:\n' + generateTable(games, player_stats) + '```');
		}

		return message.say('You don\'t have any stats saved');
	}
};

function getData(data) {

	const games = getGames(data);

	const game_data = {};

	const player_stats = new Map();

	for(const game in data) {

		game_data[game] = 0;

		Object.keys(data[game]).forEach(
			player => {

				const score = data[game][player];
				game_data[game] += score;

				if(player_stats.has(player)) {

					const temp = player_stats.get(player);

					player_stats.set(player, { ...temp, [game]: score });

				}
				else{
					player_stats.set(player, { [game]: score });
				}
			}
		);
	}

	return [games, player_stats];
}

function getGames(data) {
	return Object.keys(data);
}

function getPlayers(data) {
	const players = new Map();

	for(const game in data) {

		Object.keys(data[game]).forEach(
			player => {
				if(players.has(player)) {

					const temp = players.get(player);

					players.set(player, { ...temp, [game]: data[game][player] });

				}
				else{
					players.set(player, { [game]: data[game][player] });
				}

			}
		);
	}

	return players;
}

function generateTable(columns, rows) {

	const headers = ['', ...columns];

	const data = [headers];

	rows.forEach((row, index) => {

		const table_row = [index];

		const temp_games = Object.keys(row);

		columns.forEach((col, index) => {
			const game_index = temp_games.indexOf(col);

			if(game_index == -1) {
				table_row.push(0);
			}
			else{
				table_row.push(row[col]);
			}
		});

		data.push(table_row);
	});

	return table(data);
}