import express from 'express'
import { ApolloServer } from '@apollo/server'
import bodyParser from 'body-parser'
import cors from 'cors'
import { expressMiddleware } from '@apollo/server/express4'
import axios from 'axios'


const startserver = async () => {
    const app = express();
    const server = new ApolloServer({
        typeDefs:`
        type User{
          id: ID!
          name: String!
          username: String!
          email: String!
          phone: String!
        }
           type Todo{
               id: ID!
               title: String!
               completed: Boolean
            }

            type Query{
                getTodos: [Todo]
                getAllUsers:[User]
            }
        `,
        resolvers:{
            Query:{
                getTodos: async () => 
                    (await axios.get('https://jsonplaceholder.typicode.com/todos')).data,
                getAllUsers: async () => 
                    (await axios.get('https://jsonplaceholder.typicode.com/todos')).data,
            }
        }
    })

    app.use(bodyParser.json());
    app.use(cors());

    await server.start()

    app.use('/graphql', expressMiddleware(server,)
    );

    app.listen(8000, () => console.log('server started on port 8000')
    )
}

startserver()