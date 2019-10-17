import request from '@/utils/request.js';

export async function getTodo(params = {}) {
  return request('https://jsonplaceholder.typicode.com/todos/1', params);
}
