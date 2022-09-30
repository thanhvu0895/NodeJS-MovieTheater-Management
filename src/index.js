const express = require('express');
const app = express();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs')

app.use(express.json());
app.use(express.static("."));
app.listen(8080)

const rootRouter = require('./routers/index')
app.use("/api",rootRouter)

// swaggerRouter configuration

const swaggerOption = {
    swaggerDefinition: {
        components: {
            schemas: {
               User: {
                  type: "object",
                  properties: {
                     id: {
                        type: "integer",
                        format: "int64",
                        example: 10
                     },
                     name: {
                        type: "string",
                        example: "Thanh Vu"
                     },
                     email: {
                        type: "string",
                        example: "thanhvu@gmail.com"
                     },
                     pass_word: {
                        type: "string",
                        example: "1234"
                     },
                     phone: {
                        type: "string",
                        example: "+12693978290"
                     },
                     role_id: {
                        type: "integer",
                        format: "int32"
                     },
                  },
                  xml: {
                     name: "user"
                  }
               }
            }
         },
        info: {
            title: "Thanh's Film Management API 3.0",
            version: "1.0.11",
            description: "This is a sample Film Management Server based on the `OpenAPI 3.0` specification.",
            contact: {
                email: "thanhvu0895@gmail.com"
            },
            servers: ["http://localhost/8080"],
            layout: "StandaloneLayout",
        },
        tags: [
            {
                name: "Movies Management",
                description: "Operations about films"
            },
            {
                name: "Theaters Management",
                description: "Operations about cine-plex"
            },
            {
                name: "Tickets Management",
                description: "Operations about tickets"
            },
            {
                name: "Users Management",
                description: "Operations about users"
            },
        ],
    },
    apis: ["./src/routers/*.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOption);


app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


