const readline = require('readline');

console.log('Quiz');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'quiz> ',
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
      console.log(`Comando desconocido: '${cmd}'`);
      console.log(`Use 'help' para ver todos los comandos disponibles`);
      r1.prompt();
      break;
  }

}).on('close', () => {
  console.log('Adios!');
  process.exit(0);
});

/**
* It shows help
*/
const helpCmd = () => {
  console.log('Comandos: ');
  console.log(' h|help - Muestra esta ayuda');
  console.log(' list - Listar los quizzes existentes');
  console.log(' show <id> - Muestra la pregunta y la respuesta el quiz indicado');
  console.log(' add - Anadir un nuevo quiz interactivamente');
  console.log(' delete <id> - Borrar el quiz indicado');
  console.log(' edit <id> - Editar el quiz indicado');
  console.log(' test <id> - Probar el quiz indicado');
  console.log(' p|play - Jugar a preguntar aleatoriamente todos los quizzes');
  console.log(' credits - Creditos');
  console.log(' q|quit - Salir del programa');
  rl.prompt();
};

const listCmd = () => {
  console.log('Listar todos los quizzes existentes');
  rl.prompt();
}

const showCmd = (id) => {
  console.log('Mostrar el quiz indicado');
  r1.prompt();
}

const addCmd = () => {
  console.log('Anadir un nuevo quiz');
  rl.prompt();
}

const deleteCmd = (id) => {
  console.log('Borrar el quiz indicado', id);
  rl.prompt();
}

const editCmd = (id) => {
  console.log('Editar el quiz indicado');
  rl.prompt();
}

const creditsCmd = () => {
  console.log('Autores de la practica');
  console.log('Miguel Angel Marquez Leon');
  rl.prompt();
}

const playCmd = () => {
  console.log('Jugar');
  rl.prompt();
}

const testCmd = (id) => {
  console.log('Probar el quiz indicado');
  rl.prompt();
}

const quitCmd = () => {
  rl.close();
}
