import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  defaultEFCache,
  defaultRedisCache,
} from '../constants/defaultTimeSettings';

type CacheSettingsState = {
  redisCache_On: boolean,
  efCache_On: boolean,
};

type CacheSettingsProps = {
  saveSettings: (efCache_on: boolean, redisCache_on: boolean) => void,
};

export class CacheSettings extends React.PureComponent<CacheSettingsProps, CacheSettingsState> {
  static displayName = 'CacheSettings';
  static propTypes = {
    saveSettings: PropTypes.func.isRequired,
  };

  state = {
    redisCache_On: defaultRedisCache,
    efCache_On: defaultEFCache,
  };

  _save = (_: any): void => {
    this.props.saveSettings(this.state.efCache_On, this.state.redisCache_On);
  };

  _switchEfCache = () => {
    this.setState(prevState => ({
      ...prevState,
      efCache_On: !prevState.efCache_On,
    }));
  };

  _switchRedisCache = () => {
    this.setState(prevState => ({
      ...prevState,
      redisCache_On: !prevState.redisCache_On,
    }));
  };

  render(): React.ReactNode {
    return (
      <div
        id={'cacheSettings'}
      >
        <div>
          <label>Turn EF Cache ON:</label>
          <input
            form={'cacheSettings'}
            type="checkbox"
            defaultChecked={defaultEFCache}
            onChange={this._switchEfCache}
          />
        </div>
        <div>
          <label>Turn Redis Cache ON:</label>
          <input
            form={'cacheSettings'}
            type="checkbox"
            defaultChecked={defaultRedisCache}
            onChange={this._switchRedisCache}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={this._save}
        >
          Submit
        </button>
      </div>
    );
  }
}
