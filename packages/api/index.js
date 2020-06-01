require('dotenv').config()
const express = require('express')
const graphqlHTTP = require('express-graphql')
const { env: { MONGODB_URL, PORT } } = process
const { mongoose } = require('@skylab/data')
const schema = require('./schema/schema');
const cors = require('cors');

(async ()=> {
    await mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('Connected to Database'))
    
    const app = express()

    app.use(cors())
    app.use('/graphql', graphqlHTTP({
        schema,
        graphiql: true
    }))
    
    app.listen(PORT, () => console.log(`Server up and listening in port ${PORT}`))

})()