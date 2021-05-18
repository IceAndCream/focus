// @flow
import { connect } from 'react-redux';
import Tasks from '../components/Tasks';

const mapStateToProps = state => {
  const current = state.tasks.rows.find(
    row => row.id === state.tasks.currentId
  );
  return {
    counting: state.tasks.counting,
    current: state.tasks.timeInfo,
  };
};

export default connect(mapStateToProps)(Tasks);
