import * as React from 'react';
import { DataModel } from '../models/DbRecord';
import { getTemperatureUrl } from '../utils/ApiUrlUtils';
import { Graph } from './Graph';

const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };

const formatDate = (date: any) => {
  return new Date(date).toLocaleDateString('cs-CZ', dateOptions);
};

const convertToDataModel = (data: any): DataModel[] => {
  return data.map((d: any) => ({
    id: d.Id,
    dateTime: formatDate(d.measurementDate),
    value: d.temperature,
  }));
};

type ResultGraphWrapperProps = {
  reloadTime: number,
  fromDate: Date,
  toDate: Date,
  wasSubmitted: boolean,
  cacheType: number,
};

type ResultGraphWrapperState = {
  values: DataModel[],
  intervalId?: NodeJS.Timeout,
};

let from: Date;
let to: Date;

export class ResultGraphWrapper extends React.PureComponent<ResultGraphWrapperProps, ResultGraphWrapperState> {
  static displayName = 'ResultGraph';

  state: ResultGraphWrapperState = {
    values: [],
  };

  componentDidMount(): void {
    console.log('graph did mount');

    const intervalId = setInterval(async () => {
      if (this.props.wasSubmitted) {
        const url = getTemperatureUrl(this.props.cacheType, from, to);

        const data = await fetch(url, {
          headers: {
            'Access-Control-Allow-Origin': "*"
          },
        });
        const json = await data.json();
        this.setState(() => ({
          values: convertToDataModel(json),
        }));
        from = from.addDays(1);
        to = to.addDays(1);
      }
    }, this.props.reloadTime * 1000);

    from = this.props.fromDate;
    to = this.props.toDate;

    this.setState(() => ({
      intervalId,
    }));
  }

  componentDidUpdate(prevProps: ResultGraphWrapperProps): void {
    if (this.props.fromDate !== prevProps.fromDate
      || this.props.toDate !== prevProps.toDate
      || this.props.reloadTime !== prevProps.reloadTime
      || this.props.cacheType !== prevProps.cacheType) {
      from = this.props.fromDate;
      to = this.props.toDate;
    }
  }

  componentWillUnmount(): void {
    if (this.state.intervalId != null) {
      clearTimeout(this.state.intervalId);
    }
  }

  render(): React.ReactNode {
    if (!this.props.wasSubmitted) {
      return (
        <div className="card col-sm-7 col-md-7 col-lg-7 text-center shadow graph-card">
          <div className="card-body card-body-text">
            <h5 className="card-text">Please setup time and cache settings to display data.</h5>
          </div>
        </div>
      );
    }
    return (
      <div className={'col-sm-8 col-md-8 col-lg-8 graph'} >
        <Graph values={this.state.values} />
      </div>
    );
  }
}
