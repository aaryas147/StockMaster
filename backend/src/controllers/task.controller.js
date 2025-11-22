import prisma from '../services/prisma.js';


export const createTask = async (req, res) => {
const { title, description, assignedToId, deadline } = req.body;
try {
const task = await prisma.task.create({ data: { title, description, assignedToId: assignedToId || null, deadline: deadline ? new Date(deadline) : null } });
res.json(task);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


export const getMyTasks = async (req, res) => {
try {
const tasks = await prisma.task.findMany({ where: { assignedToId: req.user.id } });
res.json(tasks);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


export const getAllTasks = async (req, res) => {
try {
const tasks = await prisma.task.findMany({ include: { assignedTo: true } });
res.json(tasks);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


export const updateTaskStatus = async (req, res) => {
const { id } = req.params;
const { status } = req.body;
try {
const task = await prisma.task.update({ where: { id: Number(id) }, data: { status } });
res.json(task);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};