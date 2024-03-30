export const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for Cafe Collection',
    version: '1.0.0',
    description: 'This is a REST API application made with Express for managing cafes.',
  },
  servers: [
    {
      url: 'http://localhost:5001',
      description: 'Development server',
    },
  ],
};