import todoSequelize from './database/setup/database';
import server from './server';
import swaggerUi from 'swagger-ui-express';
import express from 'express';
// const { PORT } = process.env;
const PORT = process.env.PORT;

todoSequelize
  .sync()
  .then(() => {
    console.log('DB has been successfully initialized');
  })
  .catch(e => {
    console.log(e);
  });

if (process.env.NODE_ENV === 'dev') {
  server.use(express.static('docs'));
  server.use(
    '/swagger',
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
      swaggerOptions: {
        url: '/swagger.json',
      },
    }),
  );
  console.log(
    `Swagger launched on at https://localhost:${
      process.env.PORT ?? ''
    }/swagger`,
  );
}

// App hört im folgenden auf den Port, welcher über die Umgebungsvariable definiert ist
server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
