const { SlashCommandBuilder } = require("discord.js")


module.exports = {
    data : new SlashCommandBuilder()
        .setName('current time')
        .setDescription('shows you the amount of time that you spent here until now'),
        async execute(interaction) {
            await interaction.reply(tempoDecorridoFormatado);
        }


}