const { Model} = require('objection')
const Hapi = require('@hapi/hapi');
const route= require('./router/router')
const knex = require('knex')(require('./src/db/config'));
const express = require('express');
const multer = require('multer');
const path = require('path');
const axios = require('axios');
const app = express();

//port connection
const init = async () => {
    knex .raw('select 1')

    .then(_ =>{
        console.log("Connected to Database");
    })

    .catch(e =>{
        console.log('Error' ,e)
        Process.exit(1)
    })

    Model.knex(knex);

    const server = Hapi . server ({
        port : 4400,
        host : 'localhost'
    });

    server.route(route)
    await server.start();

    console.log('Server running on %s', server.info.uri);

    process.on('unhandledRejection', (err)=>{
        console.log(err);
        process.exit(1);
    });
};

init();
console.log(() =>{});