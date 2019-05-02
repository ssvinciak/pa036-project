import { AppState } from '../store/AppState';
import { connect } from 'react-redux';
import * as React from 'react';
import { ResultGraph, ResultGraphOwnProps } from '../components/ResultGraph';

const mapStateToProps = (state: AppState): ResultGraphOwnProps => {
  return {
    fromTime: state.fromTime,
    toTime: state.toTime,
    reloadTime: state.reloadTime,
  };
};

const ResultGraphContainer: React.ComponentClass = connect(mapStateToProps)(ResultGraph);
export { ResultGraphContainer as ResultGraph };
