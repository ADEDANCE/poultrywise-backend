const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",

    // API information
    info: {
      title: "PoultryWise API",
      version: "1.0.0",
      description:
        "Backend API for PoultryWise, a poultry farm management application.",
    },

    servers: [
      {
        url: "http://localhost:3000",
        description: "Local development server",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },

  apis: ["./routes/*.js"],
};

// generate the specification
const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
