import { Router, Request, Response } from 'express';
import { Task, CreateTaskRequest, UpdateTaskRequest, ApiResponse, PaginatedResponse, generateId } from '@api-demo/shared';

const router = Router();

// 内存数据库模拟
let tasks: Task[] = [
  {
    id: '1',
    title: '完成项目设计',
    description: '设计整个项目的架构和界面',
    completed: false,
    userId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: '编写API文档',
    description: '为所有API端点编写详细文档',
    completed: true,
    userId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: '测试前端组件',
    description: '对所有React组件进行单元测试',
    completed: false,
    userId: '2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// GET /api/tasks - 获取任务列表
router.get('/', (req: Request, res: Response<ApiResponse<PaginatedResponse<Task>>>) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const userId = req.query.userId as string;
  
  let filteredTasks = tasks;
  if (userId) {
    filteredTasks = tasks.filter(task => task.userId === userId);
  }
  
  const total = filteredTasks.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedTasks = filteredTasks.slice(startIndex, endIndex);
  
  res.json({
    success: true,
    data: {
      data: paginatedTasks,
      total,
      page,
      limit,
      totalPages,
    },
  });
});

// GET /api/tasks/:id - 获取单个任务
router.get('/:id', (req: Request, res: Response<ApiResponse<Task>>) => {
  const { id } = req.params;
  const task = tasks.find(t => t.id === id);
  
  if (!task) {
    return res.status(404).json({
      success: false,
      error: '任务不存在',
    });
  }
  
  res.json({
    success: true,
    data: task,
  });
});

// POST /api/tasks - 创建任务
router.post('/', (req: Request<{}, ApiResponse<Task>, CreateTaskRequest>, res: Response<ApiResponse<Task>>) => {
  const { title, description, userId } = req.body;
  
  if (!title || !userId) {
    return res.status(400).json({
      success: false,
      error: '任务标题和用户ID不能为空',
    });
  }
  
  const newTask: Task = {
    id: generateId(),
    title,
    description,
    completed: false,
    userId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  tasks.push(newTask);
  
  res.status(201).json({
    success: true,
    data: newTask,
  });
});

// PUT /api/tasks/:id - 更新任务
router.put('/:id', (req: Request<{ id: string }, ApiResponse<Task>, UpdateTaskRequest>, res: Response<ApiResponse<Task>>) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  
  const taskIndex = tasks.findIndex(t => t.id === id);
  
  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      error: '任务不存在',
    });
  }
  
  const updatedTask = {
    ...tasks[taskIndex],
    ...(title !== undefined && { title }),
    ...(description !== undefined && { description }),
    ...(completed !== undefined && { completed }),
    updatedAt: new Date().toISOString(),
  };
  
  tasks[taskIndex] = updatedTask;
  
  res.json({
    success: true,
    data: updatedTask,
  });
});

// DELETE /api/tasks/:id - 删除任务
router.delete('/:id', (req: Request, res: Response<ApiResponse>) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(t => t.id === id);
  
  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      error: '任务不存在',
    });
  }
  
  tasks.splice(taskIndex, 1);
  
  res.json({
    success: true,
    message: '任务删除成功',
  });
});

export default router;
