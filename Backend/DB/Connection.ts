import mysql from 'mysql2/promise';
import DBConfig from './DBConfig';


const connection = mysql.createPool(DBConfig.dbConfig);

export default connection;
