const {Client} = require('pg')

const client = new Client({
    host: "ec2-34-201-95-176.compute-1.amazonaws.com",
    user: "zavcfgezaofzgf",
    port: 5432,
    password: "0dc5a2e45caa55d5d98553868a436c8b5ec445d9b61ed06d3a0659613cb7ef8f",
    database: "dags485oe3bq63",
    ssl: {
      require: true, // This will help you. But you will see nwe error
      rejectUnauthorized: false // This line will fix new error
  },
})

module.exports = client