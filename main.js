const readline = require('readline');
const model = require('./model');

const {log, bigLog, errorLog, colorize} = require('./output');

//Mensaje Inicial
bigLog('Node Quiz','green');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: colorize('quiz > ', 'blue'),
  completer: (line) => {
  const completions = 'h help add delete edit list test p play credits q quit'.split(' ');
  const hits = completions.filter((c) => c.startsWith(line));
  // show all completions if none found
  return [hits.length ? hits : completions, line];
  }
});

rl.prompt();

rl.on('line', (line) => {
  let args = line.split(' ');
  let cmd = args[0].toLowerCase().trim();

  switch (cmd) {
    case '':
      rl.prompt();
      break;
    case 'help':
    case 'h':
      helpCmd();
      break;
    case 'quit':
    case 'q':
      quitCmd();
      break;
    case 'add':
      addCmd();
      break;
    case 'list':
      listCmd();
      break;
    case 'show':
      showCmd(args[1]);
      break;
    case 'test':
      testCmd(args[1]);
      break;
    case 'play':
    case 'p':
      playCmd();
      break;
    case 'delete':
      deleteCmd(args[1]);
      break;
    case 'edit':
      editCmd(args[1]);
      break;
    case 'credits':
      creditsCmd();
      break;

    default:
      console.log(`Comando desconocido: '${colorize(cmd, 'red')}'`);
      console.log(`${colorize('help', 'green')} para ver todos los comandos disponibles`);
      rl.prompt();
      break;
  }

}).on('close', () => {
  log('Adios!');
  process.exit(0);
});

/**
* It shows help
*/
const helpCmd = () => {
  log('Comandos: ');
  log(' h|help - Muestra esta ayuda');
  log(' list - Listar los quizzes existentes');
  log(' show <id> - Muestra la pregunta y la respuesta el quiz indicado');
  log(' add - Anadir un nuevo quiz interactivamente');
  log(' delete <id> - Borrar el quiz indicado');
  log(' edit <id> - Editar el quiz indicado');
  log(' test <id> - Probar el quiz indicado');
  log(' p|play - Jugar a preguntar aleatoriamente todos los quizzes');
  log(' credits - Creditos');
  log(' q|quit - Salir del programa');
  rl.prompt();
};

const listCmd = () => {
  log('Listar todos los quizzes existentes', 'red');
  rl.prompt();
}

const showCmd = (id) => {
  log('Mostrar el quiz indicado', 'red');
  rl.prompt();
}

const addCmd = () => {
  log('Anadir un nuevo quiz', 'red');
  rl.prompt();
}

const deleteCmd = (id) => {
  log('Borrar el quiz indicado', 'red');
  rl.prompt();
}

const editCmd = (id) => {
  log('Editar el quiz indicado', 'red');
  rl.prompt();
}

const creditsCmd = () => {
  log('Autores de la practica:');
  log('Miguel Angel Marquez Leon', 'green');
  rl.prompt();
}

const playCmd = () => {
  log('Jugar');
  rl.prompt();
}

const testCmd = (id) => {
  log('Probar el quiz indicado');
  rl.prompt();
}

const quitCmd = () => {
  rl.close();
}
