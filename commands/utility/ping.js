const { SlashCommandBuilder } = require("discord.js");

module.exports = { // Dentro do comando module.exports porque esse comando pode ser lido por outros arquivos do projeto
    data: new SlashCommandBuilder() // Mostra a descrição do comando abaixo do registro no Discord
            .setName('ping') // Setando o nome do comando
            .setDescription('Replies with Pong!'), // A descrição do comando
        async execute(interaction) { // Função assíncrona que espera a interação do usuário
            await interaction.reply('Pong!') // Execução do comando
        },
}