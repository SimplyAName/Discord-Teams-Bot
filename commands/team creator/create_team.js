const { Command } = require('discord.js-commando');

module.exports = class CreateTeamsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'create_team',
			aliases: ['ct', 'createteam'],
			group: 'basic',
			memberName: 'create_team',
			description: 'Creates a team from your current voice channel',
			examples: ['createTeam', 'ct'],
		});
	}

	run(message) {
		const channel = message.member.voice.channel;

		if(!channel) {
			return message.say('Please join a voice channel with your team members');
		}

		const members = channel.members.filter(member => !member.user.bot);

		const randomMembers = members.random(members.size / 2);

		const teamCheck = function(curr) {
			if(randomMembers.find(member => curr == member)) {return true;}
			return false;
		};

		const [team1, team2] = members.partition(teamCheck);

		// return message.say('Hi, I should be making a team but I\'m stilling being built at the moment!' + ' | ' + members.size + ' | ' + Array.from(team1.values()) + ' | ' + Array.from(team2.values()));

		return message.say(generateOutput(team1, team2));
	}
};

// Generate output string for team
function generateOutput(team1, team2) {
	let message = 'Team 1: \n';

	team1.forEach((user) => {
		message += user.displayName + '\n';
	});

	message += '\nTeam 2: \n';

	team2.forEach((user) => {
		message += user.displayName + '\n';
	});

	return message;
}