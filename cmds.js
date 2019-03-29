const {log, bigLog, errorLog, colorize} = require('./output');

const model = require('./model');

/**
* It shows help
*/

exports.helpCmd = (rl) => {
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

exports.listCmd = (rl) => {
  log('Listar todos los quizzes existentes', 'red');
  rl.prompt();
}

exports.showCmd = (rl, id) => {
  log('Mostrar el quiz indicado', 'red');
  rl.prompt();
}

exports.addCmd = (rl) => {
  log('Anadir un nuevo quiz', 'red');
  rl.prompt();
}

exports.deleteCmd = (rl, id) => {
  log('Borrar el quiz indicado', 'red');
  rl.prompt();
}

exports.editCmd = (rl, id) => {
  log('Editar el quiz indicado', 'red');
  rl.prompt();
}

exports.creditsCmd = (rl) => {
  log('Autores de la practica:');
  log('Miguel Angel Marquez Leon', 'green');
  rl.prompt();
}

exports.playCmd = (rl) => {
  log('Jugar');
  rl.prompt();
}

exports.testCmd = (rl, id) => {
  log('Probar el quiz indicado');
  rl.prompt();
}

exports.quitCmd = (rl) => {
  rl.close();
}
