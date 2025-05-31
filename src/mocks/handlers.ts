import { authHandlers } from './handlers/authHandlers';
import { userHandlers } from './handlers/userHandlers';
import { postHandlers } from './handlers/postHandlers';

export const handlers = [...authHandlers, ...userHandlers, ...postHandlers];
