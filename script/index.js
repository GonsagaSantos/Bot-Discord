const fs = require('node:fs'); // É usado para ler o diretório dos comandos e identificar os arquivos de comandos
const path = require('node:path'); // Ajuda na procura e acesso de arquivos
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js'); // Importa a biblioteca do discord
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });
// Um objeto contendo a intenção do client ao usar o bot, nesse caso são os eventos dentro da guilda (servidor) e os estados de voz desse servidor 

const token = 'BLANK'; 
const channelId = 'BLANK'; 

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandsFolders = fs.readdirSync(foldersPath);

for (const folder of commandsFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  for (const file of commandsFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if('data' in command && 'execute' in command) {
      client.command.set(command.data.name, command);
    } else {
      console.log(`[WARNING] the command at ${filePath} is missing a required "data" or "execute" property.`)
    }
  }
} 

client.on(Events.InteractionCreate, interaction => {
  if(!interaction.isChatInputCommand()) return;
  console.log(interaction);
});

let tempoInicial = null; // Inicialização de uma váriavel que marca o tempo que a pessoa entrou e que será armazenada a hora 

client.once('ready', () => { // Evento que marca se o bot está logado
  console.log(`Logado como ${client.user.tag}`); // Quando o evento é acionado, é inserido no console essa msg
});

client.on('voiceStateUpdate', (oldState, newState) => { // Evento que marca uma alteração no canal de voz
  if (newState.member.user.bot) return; // Se o evento for oriundo(?) de um bot, então a função acaba

  const userName = newState.member.user.username; // Declaração de uma variável que armazena o nome do usuário que entrou na chamada

  if (oldState.channelId === null && newState.channelId !== null) { // Quando alguém entra
    // Entrou em um canal de voz
    tempoInicial = new Date(); // Então essa variável passa a marcar o horário atual
    const horaEntrada = tempoInicial.toLocaleTimeString(); // Formata a saída do horário para o local do sistema, no meu caso, Brasil

    client.channels.cache.get(channelId).send(`${userName} entrou na chamada às ${horaEntrada}`); // cache guarda na memoria cache do bot todos os canais de voz do servidor
    // então, ele pega o id do canal, e dentro desse canal, envia uma mensagem dizendo a hora que o cliente entrou

    user.channel.cache.get(channelId).message

    setTimeout(() => {        
        client.channels.cache.get(channelId).send(`Passaram-se 25 minutos.`);
    }, 1500000);
  } 
  else if (oldState.channelId !== null && newState.channelId === null) {
    // Saiu de um canal de voz
    if (tempoInicial) {
      const tempoFinal = new Date(); //Faz a mesma coisa que fez quando o usuário entrou no canal, mas dessa vez no horário de saída
      const horaSaida = tempoFinal.toLocaleTimeString(); // idem, mesma coisa...

      const tempoDecorrido = tempoFinal - tempoInicial; // Faz a conta para armazenar a quantidade de tempo que o usuário ficou na chamada
      const tempoDecorridoFormatado = msToTime(tempoDecorrido); // chama a função msToTime para formatar o horário

      client.channels.cache.get(channelId).send(`${userName} saiu da chamada às ${horaSaida}. Tempo decorrido: ${tempoDecorridoFormatado}`);
      // Envia uma mensagem no canal dizendo quando tempo se passou desde que o usuário entrou no canal

      tempoInicial = null; // Retorna essa variável para null
    }
  }
});

client.on('messageCreate', message => {
    if(message.channelId === channelId && message.content.toLowerCase === '!shutdown'){
      message.channel.send('Encerrando...');
      client.destroy();
      console.log('Miguel mandou encerrar o bot');
      process.exit();
    }
}); //arrumar depois

function msToTime(duration) {
  const segundos = Math.floor((duration / 1000) % 60); // Formata a quantidade de tempo
  const minutos = Math.floor((duration / (1000 * 60)) % 60); // Idem
  const horas = Math.floor((duration / (1000 * 60 * 60)) % 24); // Idem

  return `${horas}h ${minutos}m ${segundos}s`; //Retorna a quantidade de tempo formatada em horas, minutos e segundos
}

client.login(token); // Inicia o bot

/* Melhorias a fazer por enquanto

1. Comando pra pausar e retomar a contagem de tempo. talvez um '!pause' e um '!resume'
2. Criar um comando para guardar uma lista de matérias pra estudar e me retornar toda vez que eu entrar no canal
3. Criar um comando para ver um histórico de tempos de estudo
4. Criar um reminder pra me lembrar de ter interação social de vez em quando ou tomar um sol, ou tomar agua, sei la
*/