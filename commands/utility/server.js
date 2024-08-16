const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('this command shows you the current number of users in the server'),
    async execute(interaction) {
        await interaction.reply(`this server has ${interaction.guild.memberCount} members`);
    },
};