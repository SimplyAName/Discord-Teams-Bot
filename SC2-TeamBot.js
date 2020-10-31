require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('message', msg => {
	
	//Check to see if message starts with !
	if (!msg.content.startsWith('!') || msg.author.bot) return;

	//Split the message into commands
	const args = msg.content.slice(1).split(/ +/);
	const command = args.shift().toLowerCase();

	console.log(command);
	
	//Set this to team 1's voice channel ID channel2Id
	const channel1 = client.channels.get(process.env.TEAM_1_CHANNEL_ID);

	//Set this to team 2's voice channel ID
	const channel2 = client.channels.get(process.env.TEAM_2_CHANNEL_ID);

	//Change the .get() to your inital voice channel ID
	const mainVoiceChannel = client.channels.get(process.env.MAIN_CHANNEL_ID);
	
	const people = [];

	mainVoiceChannel.members.forEach(function(guildMember, guildMemberId) {
		people.push(guildMemberId);
	});

	if (command === 'ping') {

		msg.reply('Pong!');

	} else if (command === 'createteam' || command === "ct") {
	  
		let teams = splitTeams(people);

		let message = generateOutput(teams);
		
		teams.team1.forEach((user) => {
			let currentUser = members.find(currentUser => currentUser.id === user.id);
			
			currentUser.setVoiceChannel(channel1Id);
		});
		
		teams.team2.forEach((user) => {
			let members = mainVoiceChannel.members;
			
			let currentUser = members.find(currentUser => currentUser.id === user.id);
			
			currentUser.setVoiceChannel(channel2Id);
		});
		
		msg.channel.send(message);

	} else if (command === "createteam-novoice" || command === "ct-nv") {

		let teams = splitTeams(people);
				
		let message = generateOutput(teams);
		
		msg.channel.send(message);

	} else if (command === "return") {

		channel1.members.forEach(function(member) {
			//Change this to your voice channel ID that you want the player to be returned to. This would normally be the inital one for easy of use
			member.setVoiceChannel(process.env.MAIN_CHANNEL_ID);
		});
		
		//Same again here. Best to use the same ID as above.
		channel2.members.forEach(function(member) {
			member.setVoiceChannel(process.env.MAIN_CHANNEL_ID);
		});
	}
  
	//Split the team into two differnt teams
	//TODO: Just get half of the suffled array
	function splitTeams(people) {

		let shuffledPeople = shuffle(people);

		let team1 = [];
		let team2 = [];

		var x = true;
		var y = 0;

		while (y < shuffledPeople.length) {
			let currentPerson = mainVoiceChannel.members.find(currentPerson => currentPerson.id === shuffledPeople[y]);
			
			if (x === true) {
				//Team 1
				team1.push(currentPerson);
				x = false;
			} else {
				//Team 2
				team2.push(currentPerson);
				x = true;
			}

			y++;
		}

		return({'team1': team1, 'team2': team2}); 

	}

	//Generate output string for team
	function generateOutput(teams) {
		
		let message = "Team 1: \n";
		
		teams.team1.forEach((user) => {
			message += (user.displayName + "\n");
		});
		
		message += "\nTeam 2: \n";
		
		teams.team2.forEach((user) => {
			message += (user.displayName + "\n");
		});
		
		return(message);
	}

	//Shuffle array of players in main channel
	function shuffle(array) {
	  let currentIndex = array.length, temporaryValue, randomIndex;

	  while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	  }

	  return array;
	}
});

client.login(process.env.DISCORD_KEY);