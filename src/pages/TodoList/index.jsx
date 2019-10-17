import React, { Component } from 'react';
import { connect } from 'dva';
import { List, InputItem, Button, Checkbox } from 'antd-mobile';
import styles from './styles.scss';

const CheckboxItem = Checkbox.CheckboxItem;
function TodoItem({ item, changeTodo }) {
  const Item = List.Item;
  const { id, title = 'Hello World!', checked } = item;
  const onChange = item => {
    changeTodo(item);
  };

  return (
    <CheckboxItem checked={checked} onChange={() => onChange(item)}>
      {title}
    </CheckboxItem>
  );
}

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.inputRef = {};
  }

  addTodoHandler = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'todoList/addTodo',
      payload: {
        id: Date.now(),
        title: this.inputRef.state.value,
        checked: false,
      },
    });
    this.inputRef.state.value = '';
  };

  fetchDataHandler = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'todoList/fetchTodo',
      payload: {
        a: 1,
        b: 2,
      },
    });
  };

  changeTodoHandler = item => {
    const { dispatch } = this.props;
    dispatch({
      type: 'todoList/updateTodoChecked',
      payload: item,
    });
  };

  deleteTodoHandler = item => {
    const { dispatch } = this.props;
    dispatch({
      type: 'todoList/deleteTodo',
    });
  };

  deleteAllHandler = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'todoList/deleteAll',
    });
  };

  render() {
    const { data } = this.props.todoList;
    return (
      <div>
        <List>
          <Button onClick={this.fetchDataHandler} type="primary">
            Fetch todo
          </Button>
          <InputItem
            extra={
              <Button
                onClick={this.addTodoHandler}
                className={styles.button}
                type="primary"
                size="small"
              >
                Add
              </Button>
            }
            placeholder="please input todo"
            data-seed="logId"
            ref={el => (this.inputRef = el)}
          >
            Todo Title
          </InputItem>
          {data &&
            data.map((item, idx) => {
              return (
                <TodoItem key={idx} item={item} changeTodo={this.changeTodoHandler}></TodoItem>
              );
            })}
        </List>

        <Button
          inline
          size="small"
          type="primary"
          style={{ marginRight: '1rem' }}
          onClick={this.deleteTodoHandler}
        >
          Detele
        </Button>
        <Button inline size="small" type="primary" onClick={this.deleteAllHandler}>
          Detele All by Async
        </Button>
      </div>
    );
  }
}

const mapStateToProps = ({ todoList }) => ({
  todoList,
});

export default connect(mapStateToProps)(TodoList);
