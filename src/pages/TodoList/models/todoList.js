import { getTodo } from '@/services/todoList';
console.log(getTodo);
export default {
  namespace: 'todoList', // reducer 's state -> props obj
  state: {
    data: [
      {
        id: 12,
        title: 'todo 0',
        checked: false,
      },
      {
        id: 121,
        title: 'todo 1',
        checked: false,
      },
      {
        id: 1212,
        title: 'todo 2',
        checked: false,
      },
    ],
  },
  effects: {
    *fetchTodo({ payload, callback }, { call, put }) {
      const { data } = yield call(getTodo, payload);
      yield put({
        type: 'addTodo',
        payload: data,
      });
    },
    *deleteAll({ payload, callback }, { call, put }) {
      yield call(getTodo, payload);

      yield put({
        type: 'deleteTodo',
      });
    },
  },
  reducers: {
    addTodo(state, { payload: item }) {
      const { data } = state;
      state.data = [...data, item];
      return { ...state };
    },
    updateTodoChecked(state, { payload: item }) {
      const arr = state.data.map(obj => {
        if (obj.id == item.id) {
          return {
            id: obj.id,
            title: obj.title,
            checked: !obj.checked,
          };
        }
        return obj;
      });

      return { ...state, data: arr };
    },
    deleteTodo(state) {
      const arr = state.data.filter(obj => {
        return !obj.checked;
      });

      return {
        ...state,
        data: arr,
      };
    },
  },
};
