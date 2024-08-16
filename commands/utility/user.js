const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data : new SlashCommandBuilder()
    .setName('user')
    .setDescription('this command shows you some informations about the user'),
    async execute(interaction) {
        await interaction.reply(`this commnad was run by ${interaction.user.username}, he's studying at ${interaction.member.joinedAt}`)
        },
    }