import TodoModel from '../../src/database/models/TodoModel';
import todoSequelize from '../../src/database/setup/database';
import TestDataTodos from './test-data/TestDataTodos';

const setup = async () => {
  try {
    // todoSequelize.dropSchema("Todos").then(() => {
    //   todoSequelize.sync();
    // });
    console.log('PRDDD', process.env);
    await todoSequelize.dropSchema('Todos', {});
    await todoSequelize.sync();
    // DB mit Daten füllen, um DB auf Test Szenarien vorzubereiten
    await TodoModel.bulkCreate(TestDataTodos);
  } catch (e) {
    console.error('MY DB Issue', e);
  }
};
beforeAll(async () => {
  await setup();
});

afterAll(async () => {
  await todoSequelize.close();
});
