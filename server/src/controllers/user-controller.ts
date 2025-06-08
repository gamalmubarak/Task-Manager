import { Request, Response } from 'express';
import {User} from '../models/user.js';

// GET /users
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password');
    return res.json(users);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// GET /users/:id
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// POST /users
export const createUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const newUser = await User.create({ username, password });
    return res.status(201).json(newUser);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

// PUT /users/:id
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, password } = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, { username, password }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

// DELETE /users/:id
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json({ message: 'User deleted' });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
