// const {Sequelize}=require('sequelize')
 
// const sequelize=new Sequelize('orders','root','20281128',{
//     dialect:'mysql',
//     host:'172.24.65.85',
//     port:3306,
//     logging:false,
 
// })

// const dbConnection = async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('mysql Connection successful !!! ');
//         const [results, metadata] = await sequelize.query("SELECT * FROM menu");
//         console.log(results)
// // Results will be an empty array and metadata will contain the number of affected rows.
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
 
// }
// dbConnection()

const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
