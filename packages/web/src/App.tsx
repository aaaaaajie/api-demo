import React, { useState, useEffect } from 'react';
import { User, Task, formatDate } from '@api-demo/shared';
import { usersApi, tasksApi } from './api';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // 表单状态
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [newTask, setNewTask] = useState({ title: '', description: '', userId: '' });

  // 加载数据
  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await usersApi.getAll();
      if (response.data.success) {
        setUsers(response.data.data || []);
      }
    } catch (err) {
      setError('加载用户列表失败');
    } finally {
      setLoading(false);
    }
  };

  const loadTasks = async () => {
    try {
      setLoading(true);
      const response = await tasksApi.getAll();
      if (response.data.success) {
        setTasks(response.data.data?.data || []);
      }
    } catch (err) {
      setError('加载任务列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
    loadTasks();
  }, []);

  // 清除消息
  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  // 用户操作
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;

    try {
      clearMessages();
      const response = await usersApi.create(newUser);
      if (response.data.success) {
        setSuccess('用户创建成功！');
        setNewUser({ name: '', email: '' });
        loadUsers();
      }
    } catch (err: any) {
      setError(err.response?.data?.error || '创建用户失败');
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm('确认删除该用户吗？')) return;

    try {
      clearMessages();
      const response = await usersApi.delete(id);
      if (response.data.success) {
        setSuccess('用户删除成功！');
        loadUsers();
        loadTasks(); // 重新加载任务，因为可能有关联的任务
      }
    } catch (err: any) {
      setError(err.response?.data?.error || '删除用户失败');
    }
  };

  // 任务操作
  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title || !newTask.userId) return;

    try {
      clearMessages();
      const response = await tasksApi.create({
        title: newTask.title,
        description: newTask.description,
        userId: newTask.userId,
      });
      if (response.data.success) {
        setSuccess('任务创建成功！');
        setNewTask({ title: '', description: '', userId: '' });
        loadTasks();
      }
    } catch (err: any) {
      setError(err.response?.data?.error || '创建任务失败');
    }
  };

  const handleToggleTask = async (task: Task) => {
    try {
      clearMessages();
      const response = await tasksApi.update(task.id, {
        completed: !task.completed,
      });
      if (response.data.success) {
        setSuccess(`任务已${task.completed ? '标记为未完成' : '标记为完成'}！`);
        loadTasks();
      }
    } catch (err: any) {
      setError(err.response?.data?.error || '更新任务失败');
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (!confirm('确认删除该任务吗？')) return;

    try {
      clearMessages();
      const response = await tasksApi.delete(id);
      if (response.data.success) {
        setSuccess('任务删除成功！');
        loadTasks();
      }
    } catch (err: any) {
      setError(err.response?.data?.error || '删除任务失败');
    }
  };

  const getUserName = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user?.name || '未知用户';
  };

  return (
    <div className="container">
      <h1>API Demo - React + TypeScript + Node.js</h1>
      <p>这是一个使用 monorepo 架构的演示项目，展示前后端数据交互</p>

      {loading && <div className="loading">加载中...</div>}
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      {/* 用户管理 */}
      <div className="section">
        <h2>👥 用户管理</h2>
        
        {/* 创建用户表单 */}
        <form onSubmit={handleCreateUser}>
          <div className="form-group">
            <label>姓名：</label>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              placeholder="请输入姓名"
              required
            />
          </div>
          <div className="form-group">
            <label>邮箱：</label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              placeholder="请输入邮箱"
              required
            />
          </div>
          <div className="button-group">
            <button type="submit" className="btn btn-primary">创建用户</button>
          </div>
        </form>

        {/* 用户列表 */}
        <div className="user-list">
          {users.map((user) => (
            <div key={user.id} className="user-item">
              <h3>{user.name}</h3>
              <p>📧 {user.email}</p>
              <p>🕒 创建时间：{formatDate(user.createdAt)}</p>
              <div className="button-group">
                <button 
                  className="btn btn-danger"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  删除
                </button>
              </div>
            </div>
          ))}
        </div>

        {users.length === 0 && !loading && (
          <p>暂无用户数据</p>
        )}
      </div>

      {/* 任务管理 */}
      <div className="section">
        <h2>📋 任务管理</h2>
        
        {/* 创建任务表单 */}
        <form onSubmit={handleCreateTask}>
          <div className="form-group">
            <label>任务标题：</label>
            <input
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              placeholder="请输入任务标题"
              required
            />
          </div>
          <div className="form-group">
            <label>任务描述：</label>
            <textarea
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              placeholder="请输入任务描述（可选）"
            />
          </div>
          <div className="form-group">
            <label>分配给：</label>
            <select
              value={newTask.userId}
              onChange={(e) => setNewTask({ ...newTask, userId: e.target.value })}
              required
            >
              <option value="">请选择用户</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="button-group">
            <button type="submit" className="btn btn-primary" disabled={users.length === 0}>
              创建任务
            </button>
          </div>
        </form>

        {/* 任务列表 */}
        <div className="task-list">
          {tasks.map((task) => (
            <div key={task.id} className={`task-item ${task.completed ? 'task-completed' : ''}`}>
              <h3>{task.title}</h3>
              {task.description && <p>📝 {task.description}</p>}
              <p>👤 负责人：{getUserName(task.userId)}</p>
              <p>📊 状态：{task.completed ? '✅ 已完成' : '⏳ 进行中'}</p>
              <p>🕒 创建时间：{formatDate(task.createdAt)}</p>
              <div className="button-group">
                <button 
                  className={`btn ${task.completed ? 'btn-secondary' : 'btn-primary'}`}
                  onClick={() => handleToggleTask(task)}
                >
                  {task.completed ? '标记为未完成' : '标记为完成'}
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  删除
                </button>
              </div>
            </div>
          ))}
        </div>

        {tasks.length === 0 && !loading && (
          <p>暂无任务数据</p>
        )}
        
        {users.length === 0 && (
          <p>💡 提示：请先创建用户才能创建任务</p>
        )}
      </div>

      <div className="section">
        <h2>📊 项目信息</h2>
        <p><strong>技术栈：</strong> React 18 + TypeScript + Node.js + Express</p>
        <p><strong>架构：</strong> npm workspaces monorepo</p>
        <p><strong>功能：</strong> 用户管理、任务管理、实时数据同步</p>
        <p><strong>特点：</strong> 类型安全、代码共享、快速开发</p>
      </div>
    </div>
  );
}

export default App;
