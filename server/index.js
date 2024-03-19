import  express from "express";
import { ApolloServer } from "@apollo/server";
import {expressMiddleware} from "@apollo/server/express4";
import cors from "cors";
import axios from "axios";



async function startApolloServer() {
    const app = express();
    app.use(cors({
        origin: "*",
        credentials: true
    }));
    const server = new ApolloServer({
        typeDefs:`
        type User{
            id: ID!
            name: String!
            username: String!
            email: String!
            address: String!
            phone: String!
            website: String!
            company: String!
        },
        type Todos{
            id: ID!
            title: String!
            completed: Boolean!
            userId: ID!
            user: User!
        },
        type Query{
            getodos: [Todos]
            getUser: [User]
            getTodoById(id: ID!): User
        }
        `,
        resolvers: {
            Todos:{
                user: async(todo) => {
                    return (await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`)).data;
                }
            },
            Query: {
                getodos: async() => {
                   return (await axios.get("https://jsonplaceholder.typicode.com/todos")).data;
            }
        }
}});
    app.use(express.json());
    await server.start();

    app.use('/graphql', expressMiddleware(server));

    app.listen({port: 4000}, () => {
        console.log("Server ready at http://localhost:4000");
    });
};
startApolloServer();