import { Router, Request, Response } from 'express';
import { User, CreateUserRequest, UpdateUserRequest, ApiResponse, generateId } from '@api-demo/shared';

const router = Router();

// 内存数据库模拟
let users: User[] = [
  {
    id: '1',
    name: '张三',
    email: 'zhangsan@example.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: '李四',
    email: 'lisi@example.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// GET /api/users - 获取所有用户
router.get('/', (req: Request, res: Response<ApiResponse<User[]>>) => {
  res.json({
    success: true,
    data: users,
  });
});

// GET /api/users/:id - 获取单个用户
router.get('/:id', (req: Request, res: Response<ApiResponse<User>>) => {
  const { id } = req.params;
  const user = users.find(u => u.id === id);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      error: '用户不存在',
    });
  }
  
  res.json({
    success: true,
    data: user,
  });
});

// POST /api/users - 创建用户
router.post('/', (req: Request<{}, ApiResponse<User>, CreateUserRequest>, res: Response<ApiResponse<User>>) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({
      success: false,
      error: '姓名和邮箱不能为空',
    });
  }
  
  // 检查邮箱是否已存在
  if (users.some(u => u.email === email)) {
    return res.status(400).json({
      success: false,
      error: '邮箱已存在',
    });
  }
  
  const newUser: User = {
    id: generateId(),
    name,
    email,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  users.push(newUser);
  
  res.status(201).json({
    success: true,
    data: newUser,
  });
});

// PUT /api/users/:id - 更新用户
router.put('/:id', (req: Request<{ id: string }, ApiResponse<User>, UpdateUserRequest>, res: Response<ApiResponse<User>>) => {
  const { id } = req.params;
  const { name, email } = req.body;
  
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      error: '用户不存在',
    });
  }
  
  // 如果更新邮箱，检查是否已存在
  if (email && users.some(u => u.email === email && u.id !== id)) {
    return res.status(400).json({
      success: false,
      error: '邮箱已存在',
    });
  }
  
  const updatedUser = {
    ...users[userIndex],
    ...(name && { name }),
    ...(email && { email }),
    updatedAt: new Date().toISOString(),
  };
  
  users[userIndex] = updatedUser;
  
  res.json({
    success: true,
    data: updatedUser,
  });
});

// DELETE /api/users/:id - 删除用户
router.delete('/:id', (req: Request, res: Response<ApiResponse>) => {
  const { id } = req.params;
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      error: '用户不存在',
    });
  }
  
  users.splice(userIndex, 1);
  
  res.json({
    success: true,
    message: '用户删除成功',
  });
});

export default router;
