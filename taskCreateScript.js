import fetch from 'node-fetch';
import { categories } from './controllers/cat.controller.js';

const generateRandomTask = () => {
  const statuses = ['pending', 'in_progress', 'completed'];
  const priorities = ['low', 'medium', 'high'];
  const taskCategories = categories;

  // Random date between now and 30 days in future
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + Math.floor(Math.random() * 30));

  const result = {
    title: `Task ${Math.floor(Math.random() * 1000)}`,
    description: `This is a randomly generated task description ${Math.random().toString(36).substring(7)}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    priority: priorities[Math.floor(Math.random() * priorities.length)],
    category: taskCategories[Math.floor(Math.random() * taskCategories.length)],
    deadline: futureDate.toISOString()
  };
  const JSONresult = JSON.stringify(result, null, 2);
  return JSONresult;
};
 

const task = generateRandomTask();

console.log(task);


// Usage example:
// createRandomTasks(10); // Creates 10 random tasks
