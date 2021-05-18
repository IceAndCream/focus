import React, { Component } from 'react';
import * as classnames from 'classnames';
import SearchInput from './SearchInput';
import CountDown from './CountDown';
import type { Task } from '../reducers/types';
import {
  addTaskByName,
  removeTask,
  toggleState,
  selectTask,
  setTimeByCount,
  toggleCounting
} from '../actions/tasks';
import Play from './svgrs/play-shape';
import Delete from './svgrs/delete';
import Tick from './svgrs/tick';
import TickBox from './svgrs/tick-box';

import styles from './Tasks.scss';

type Props = {
  rows: Array<Task>,
  dispatch: any => any
};

type State = {
  search: string,
  displayRows: Task[]
};

export default class Tasks extends Component<Props, State> {
  static defaultProps = {
    rows: [],
    current: {}
  };

  state = {
    search: '',
    displayRows: []
  };

  static getDerivedStateFromProps(props: Props, state: State) {
    const { rows } = props;
    return {
      ...state,
      displayRows: rows.filter(
        (row): boolean => row.name.includes(state.search)
      )
    };
  }

  createTask = (name: string) => {
    this.props.dispatch(addTaskByName(name));
  };

  setTime = (time: Number) => {
    this.props.dispatch(setTimeByCount(time))
  }

  handleRemove = (id: string) => {
    this.props.dispatch(removeTask(id));
  };

  handleSeachChange = (value: string) => {
    this.setState({
      search: value
    });
  };

  handleSubmit = (value: string) => {
    if (value && value.trim()) {
      // this.createTask(value);
      this.setTime(value);
      this.handleSeachChange('');
    }
  };

  toggleState = (id: string) => {
    this.props.dispatch(toggleState(id));
  };

  selectTask = (task: Task) => {
    this.props.dispatch(selectTask(task));
    this.props.history.push('/'); // eslint-disable-line
  };

  render() {
    const { displayRows } = this.state;
    const { rows, current, counting, time, dispatch } = this.props;

    const { plan, remain } = current;

    return (
      <div className={styles.container}>
        <SearchInput
          value={this.state.search}
          onChange={this.handleSeachChange}
          onSubmit={this.handleSubmit}
          placeholder="倒计时（分钟）"
        />
        <CountDown
          plan={plan}
          remain={remain}
          counting={counting}
          onToggleCounting={() => dispatch(toggleCounting())}
        />
      </div>
    );
  }
}
