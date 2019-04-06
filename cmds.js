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

/**
 * Lista todos los quizzes existentes en el modelo.
 *
 * @param rl Objeto readline usado para implementar el CLI.
 */
exports.listCmd = (rl) => {
  model.getAll().forEach((quiz, id) => {
    log(`[${ colorize(id, 'magenta') }]: ${ quiz.question }`);
  });

  rl.prompt();
}

/**
 * Muestra el quiz indicado en el parámetro: la pregunta y la respuesta.
 *
 * @param rl Objeto readline usado para implementar el CLI.
 * @param id Clave del quiz a mostrar.
 */
exports.showCmd = (rl, id) => {
  if (typeof id === 'undefined'){
    errorLog(`Falta el parametro id.`);
  } else {
    try {
      const quiz = model.getByIndex(id);
      log(` [${ colorize(id, 'magenta') }]: ${quiz.question} ${colorize('=>', 'magenta')} ${quiz.answer}`);
    }
    catch (error) {
      errorLog(error.message);
    }
  }

  rl.prompt();
}

/**
 * Añade un nuevo quiz al módelo.
 * Pregunta interactivamente por la pregunta y por la respuesta.
 *
 * Hay que recordar que el funcionamiento de la funcion rl.question es asíncrono.
 * El prompt hay que sacarlo cuando ya se ha terminado la interacción con el usuario,
 * es decir, la llamada a rl.prompt() se debe hacer en la callback de la segunda
 * llamada a rl.question.
 *
 * @param rl Objeto readline usado para implementar el CLI.
 */
exports.addCmd = (rl) => {
  rl.question(colorize(' Introduzca una pregunta: ', 'red'), question => {
    rl.question(colorize(' Introduzca la respuesta: ', 'red'), answer => {
      model.add(question, answer);
      log(` ${colorize('Se ha anadido', 'magenta')}: ${question} ${colorize('=>', 'magenta')} ${answer}`);
      rl.prompt();
    })
  })
}

/**
 * Borra un quiz del modelo.
 *
 * @param rl Objeto readline usado para implementar el CLI.
 * @param id Clave del quiz a borrar en el modelo.
 */
exports.deleteCmd = (rl, id) => {
  if (typeof id === 'undefined'){
    errorLog(`Falta el parametro id.`);
  } else {
    try {
      model.deleteByIndex(id);
    }
    catch (error) {
      errorLog(error.message);
    }
  }

  rl.prompt();
}

/**
 * Edita un quiz del modelo.
 *
 * Hay que recordar que el funcionamiento de la funcion rl.question es asíncrono.
 * El prompt hay que sacarlo cuando ya se ha terminado la interacción con el usuario,
 * es decir, la llamada a rl.prompt() se debe hacer en la callback de la segunda
 * llamada a rl.question.
 *
 * @param rl Objeto readline usado para implementar el CLI.
 * @param id Clave del quiz a editar en el modelo.
 */
exports.editCmd = (rl, id) => {
  if (typeof id === 'undefined') {
    errorLog(`Falta el parametro id.`);
    rl.prompt();
  } else {
    try {
      const quiz = model.getByIndex(id);
      process.stdout.isTTY && setTimeout(() => { rl.write(quiz.question)}, 0);
      rl.question(colorize(' Introduzca una pregunta: ', 'red'), question => {
        process.stdout.isTTY && setTimeout(() => { rl.write(quiz.answer)}, 0);
        rl.question(colorize(' Introduza la respuesta: ', 'red'), answer => {
          model.update(id, question, answer);
          log(` Se ha cambiado el quiz ${colorize(id, 'magenta')} por: ${question} ${colorize('=>', 'magenta')} ${answer}`);
          rl.prompt();
        });
      });
    }
      catch (error) {
          errorLog(error.message);
          rl.prompt();
      }
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

function shuffle(array) {
    var i = array.length,
        j = 0,
        temp;

    while (i--) {

        j = Math.floor(Math.random() * (i+1));

        // swap randomly chosen element with current element
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;

    }

    return array;
}

exports.playCmd = (rl) => {
  let score = 0;
  let leftQuizzes = [];
  const quizzes = model.getAll();
  for(quiz in quizzes){
    leftQuizzes[quiz] = quiz;
  }
const playOne = () => {
  if (typeof leftQuizzes === 'undefined' || leftQuizzes.length === 0){
    log(`Has finalizado todas las preguntas tu puntuacion es: ${score}`, 'green');
    log(`${colorize('add', 'green')} para agregar una nueva pregunta`);
    log(`${colorize('help', 'green')} para ver todos los comandos disponibles`);
    rl.prompt();
  }
  else {
    try {
      let ranNums = shuffle(leftQuizzes);
      let id = ranNums[ranNums.length -1];
      ranNums.pop();
      const quiz = model.getByIndex(id);
      rl.question(`${ quiz.question } `, answer => {
        if(answer.toLowerCase().trim() === quiz.answer.toLowerCase()){
          bigLog('Correcto', 'green');
          score++;
          log(`Puntuacion: ${ score }`);
          playOne();
        }
        else {
          bigLog('Incorrecto', 'red');
          log(`Puntuacion: ${ score }`);
          rl.prompt();
        }
     });
   }
    catch (error){
      errorLog(error.message);
      rl.prompt();
    }
  }

  }// const PlayOne
 playOne();
}

/**
 * Prueba un quiz, es decir, hace una pregunta del modelo a la que debemos contestar.
 *
 * @param rl Objeto readline usado para implementar el CLI.
 * @param id Clave del quiz a probar.
 */
exports.testCmd = (rl, id) => {
  if (typeof id === 'undefined'){
    errorLog(`Falta el parametro id.`);
    rl.prompt();
  }
    else {
      try {
        const quiz = model.getByIndex(id);
        rl.question(colorize(`${quiz.question}: `, 'red'), answer  => {
          const answerLow = answer.toLowerCase();
          if(answerLow.trim() === quiz.answer.toLowerCase()){
            log(`Su respuesta es: `);
            bigLog('Correcta', 'green');
            rl.prompt();
          } else {
            log(`Su respuesta es: `);
            bigLog('Incorrecta','red');
            rl.prompt();
          }
        });
      }
      catch (error) {
          errorLog(error.message);
          rl.prompt();
      }
    }
}

/**
 * Muestra los nombres de los autores de la práctica.
 *
 * @param rl Objeto readline usado para implementar el CLI.
 */
exports.creditsCmd = (rl) => {
  log('Autores de la practica:');
  log('Miguel Angel Marquez Leon', 'green');
  rl.prompt();
}

exports.quitCmd = (rl) => {
  rl.close();
}
