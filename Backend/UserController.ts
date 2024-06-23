import { Request, Response } from 'express';
import connection from './DB/Connection';
import bcryptjs from 'bcryptjs';

export const login = async (req: Request, res: Response) => {
    const username = req.body.Name;
    const password = req.body.Password;

    if (!username || !password) {
        return res.status(400).json({ msg: 'Username and password are required' });
    }

    try {
            // Buscar usuario en la tabla Users

        const query = `SELECT * FROM Users WHERE Name = ? AND Password = ?`
        const [userResult]: any[] = await connection.execute(query, [username, password]);


        // Verificar si se encontró un usuario
        if (userResult.length === 0) {
            return res.status(401).json({
                msg: 'Name or password is incorrect'
            });
        }

        // Obtener el primer usuario encontrado
        const user = userResult[0];
        let userType = '';

        return res.status(200).json({
            msg: 'Logged in successfully!',
            userName: user.Name,
            userId: user.Ci,
            userType: userType,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'INTERNAL_SERVER_ERROR' });
    }
};

export const loginInjection = async (req: Request, res: Response) => {
    const username = req.body.Name;
    const password = req.body.Password;

    if (!username || !password) {
        return res.status(400).json({ msg: 'Username and password are required' });
    }
    try {
        // Buscar usuario en la tabla Users
        
        const query = `SELECT * FROM Users WHERE Name = '${username}' AND Password = '${password}'`;
        const [userResult]: any[] = await connection.execute(query);

        // Verificar si se encontró un usuario
        if (userResult.length === 0) {
            return res.status(401).json({
                msg: 'Name or password is incorrect'
            });
        }

        // Obtener el primer usuario encontrado
        const user = userResult[0];
        let userType = '';

        return res.status(200).json({
            msg: 'Logged in successfully!',
            userName: user.Name,
            userId: user.Ci,
            userType: userType,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'INTERNAL_SERVER_ERROR' });
    }
};