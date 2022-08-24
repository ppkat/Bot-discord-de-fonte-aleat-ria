const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('fonte_maluca').setDescription('Substitui a fonte do que você escreveu por uma divertida e aleatória')
	.addStringOption(option => 
		option.setName('texto')
		.setDescription('O texto a ter a fonte modificada')
		.setRequired(true)
		)
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Comandos postados'))
	.catch(console.error);