// Modelo de datos
let quizzes = [{
  question: 'Capital de Italia',
  answer: 'Roma'
},
{
  question: 'Capital de Francia',
  answer: 'París'
},
{
  question: 'Capital de España',
  answer: 'Madrid'
},
{
  question: 'Capital de Portugal',
  answer: 'Lisboa'
}];

//Devuelve el numero total de preguntas existentes
exports.count = () => quizzes.length;

/**
* Anade un nuevo quizzes
*
* param question String con la preguntar
* param answer String con la respuesta
*/
exports.add = (question, answer) => {
    quizzes.push({
      question: (question || '').trim(),
      answer: (answer || '').trim()
    });
};

/**
* Actualiza el quiz situado en la posicion index
*
* param id Clave que identifica el quiz a actualizar
* param question String con la pregunta
* param answer String con la respuesta
*/
exports.update = (id, question, answer) => {
  const quiz = quizzes[id];
  if (typeof quiz === undefined){
    throw new Error('El valor del parametro id no es valido');
  }
  quizzes.splice(id, 1, {
    question: (question || '').trim(),
    answer: (answer || '').trim()
  });
};

//Devuelve todos los quizzes existentes
exports.getAll = () => JSON.parse(JSON.stringify(quizzes));

//Devuelve un clon del quiz almacenado en la posicion dada
exports.getByIndex = (id) => {
  const quiz = quizzes[id];
  if (typeof quiz === undefined){
    throw new Error('El valor del parametro id no es valido');
  }
  return JSON.parse(JSON.stringify(quiz));
}

//Elimina el quiz situado en la posicion dada
exports.deleteByIndex = (id) => {

  const quiz = quizzes[id];
  if (typeof quiz === undefined){
    throw new Error(`El valor del parametro id no es valido`);
  }
  quizzes.splice(id, 1);
}
