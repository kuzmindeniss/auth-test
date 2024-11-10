import express from 'express';
import { register, registerExpressValidations } from './controllers/register';
import { login, loginValidations } from './controllers/login';
import { edit } from './controllers/edit';
import { authToken } from './middlwares/authToken';
import { auth } from './controllers/auth';

const router = express.Router();

export const getRouter = () => {
  /**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: uuid
 *         login:
 *           type: string
 *           description: Логин
 *         firstName:
 *           type: string
 *           description: Имя
 *         lastName:
 *           type: string
 *           description: Фамилия
 *       example:
 *         id: 550e8400-e29b-41d4-a716-446655440000
 *         login: admin
 *         firstName: Админ
 *         lastName: Админов
 * 
 *     Error:
 *       type: object
 *       properties:
 *         msg:
 *           type: string
 *           description: Сообщение ошибки
 *         path:
 *           type: string
 *           description: Путь к полю с ошибкой
 * 
 *     Errors:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/Error'
 * 
 *     ObjectWithErrors:
 *       type: object
 *       properties:
 *         errors:
 *           $ref: '#/components/schemas/Errors'
 */

  /**
   * @swagger
   * /register:
   *   post:
   *     summary: Регистрация пользователя
   *     parameters:
   *       - in: body
   *         name: user
   *         required: true
   *         schema:
   *           $ref: '#/components/schemas/User'
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 user:
   *                   $ref: '#/components/schemas/User'
   *                 token:
   *                   type: string
   *       422:
   *         content:
   *           application/json:
    *            schema:
    *              $ref: '#/components/schemas/ObjectWithErrors'
   *             
   */
  router.post('/register', registerExpressValidations, register);

  /**
   * @swagger
   * /login:
   *   post:
   *     summary: Авторизация пользователя
   *     parameters:
   *       - in: body
   *         name: login
   *         type: string
   *       - in: body
   *         name: password
   *         type: string
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 user:
   *                   $ref: '#/components/schemas/User'
   *                 token:
   *                   type: string
   *       401:
   *         description: Неверные логин или пароль
   *       422:
   *         content:
   *           application/json:
    *            schema:
    *              $ref: '#/components/schemas/ObjectWithErrors'
   */
  router.post('/login', loginValidations, login);
  /**
   * @swagger
   * /edit:
   *   post:
   *     summary: Изменение данных пользователя
   *     parameters:
   *       - in: body
   *         name: firstName
   *         type: string
   *       - in: body
   *         name: lastName
   *         type: string
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 user:
   *                   $ref: '#/components/schemas/User'
   *                 token:
   *                   type: string
   *       422:
   *         content:
   *           application/json:
    *            schema:
    *              $ref: '#/components/schemas/ObjectWithErrors'
   *       403:
   *         description: Пользователь не авторизован
   */
  router.post('/edit', authToken, edit);
  /**
   * @swagger
   * /auth:
   *   post:
   *     summary: Проверка по токену их хедера authorization, авторизован ли пользователь.
   *     description: Если у пользователя корректный jwt токен в хедере, то возвращает объект пользователя 
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 user:
   *                   $ref: '#/components/schemas/User'
   *       401:
   *         description: Нет токена
   *       403:
   *         description: Токен некорректный
   *       
   */
  router.get('/auth', auth);

  return router;
};
