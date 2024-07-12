import request from 'supertest';
import server from '../src/server';
import TodoModel from '../src/database/models/TodoModel';

describe('GET /v1/todos/all', () => {
  test('Test /all todos route', async () => {
    const response = await request(server)
      .get('/v1/todos/all')
      .expect('Content-Type', /json/)
      .expect(200);

    const myTodos = response.body;
    const myFirstTodo = myTodos[0];

    expect(myTodos.length).toBeGreaterThan(0);
    expect(myFirstTodo.id).toBeDefined();
    expect(myFirstTodo.task).toBeDefined();
    expect(myFirstTodo.userId).toBeDefined();
  });

  test('GET by Id', async () => {
    const todoId = 1;
    const response = await request(server)
      .get(`/v1/todos/byid`)
      .query({ todoId: todoId })
      .expect('Content-Type', /json/)
      .expect(200);

    const myTodo = response.body.todo;
    expect(myTodo.id).toEqual(todoId);
  });
});

describe('Test Mutations (PUT,POST, DELETE)', () => {
  test('Test Create Object', async () => {
    const response = await request(server)
      .post(`/v1/todos/create`)
      .send({
        newTask: 'Tennis spielen',
        newIsDone: false,
        newDueDate: '2026-10-10',
        newUserId: 2,
      })
      .expect('Content-Type', /json/)
      .expect(200);
  });

  test('Test Create Object', async () => {
    const response = await request(server)
      .put(`/v1/todos/update`)
      .send({
        newTask: 'Putzen',
        newIsDone: false,
        newDueDate: '2026-10-10',
        todoId: 1,
      })
      .expect('Content-Type', /json/)
      .expect(200);
    const updatedTodoId = response.body.updatedTodoId;
    expect(updatedTodoId).toBe(1);

    // Abfragen von dem Todo direkt aus der DB
    const updatedTodo = await TodoModel.findOne({ where: { id: 1 } });
    // Vergleich des upgedateten Todos mit dem neuen Wert putzen
    expect(updatedTodo?.task).toEqual('Putzen');
    expect(updatedTodo?.isDone).toEqual(false);
    expect(updatedTodo?.dueDate).toEqual(new Date('2026-10-10'));
  });

  test('Test Mark Object', async () => {
    const response = await request(server)
      .put(`/v1/todos/mark`)
      .send({
        todoId: 1,
        newIsDone: false,
      })
      .expect('Content-Type', /json/)
      .expect(200);
    const updatedTodoId = response.body.updatedTodoId;
    expect(updatedTodoId).toBe(1);

    // Abfragen von dem Todo direkt aus der DB
    const updatedTodo = await TodoModel.findOne({ where: { id: 1 } });
    expect(updatedTodo?.isDone).toEqual(false);
  });

  test('Test Mark Object', async () => {
    await request(server).put(`/v1/todos/mark`).send({}).expect(400);
  });

  test('Test Mark Object', async () => {
    const response = await request(server)
      .put(`/v1/todos/mark`)
      .send({
        todoId: 1,
        newIsDone: true,
      })
      .expect('Content-Type', /json/)
      .expect(200);
    const updatedTodoId = response.body.updatedTodoId;
    expect(updatedTodoId).toBe(1);

    // Abfragen von dem Todo direkt aus der DB
    const updatedTodo = await TodoModel.findOne({ where: { id: 1 } });
    expect(updatedTodo?.isDone).toEqual(true);
  });

  test('Test Delete Object', async () => {
    const response = await request(server)
      .delete(`/v1/todos/delete`)
      .send({
        todoId: 2,
      })
      .expect('Content-Type', /json/)
      .expect(200);
    const deletedTodosId = response.body.deletedTodosId;
    expect(deletedTodosId).toBe(2);

    // Abfragen von dem Todo direkt aus der DB
    const deletedTodo = await TodoModel.findOne({ where: { id: 2 } });
    expect(deletedTodo).toEqual(null);
  });
});
