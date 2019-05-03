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

  render(): React.ReactNode {
    return (
      <div onChange={this._save}>
        {/*<div>*/}
          {/*<input*/}
            {/*type="checkbox"*/}
            {/*defaultChecked={defaultEFCache}*/}
            {/*onChange={this._switchEfCache}*/}
          {/*>*/}
            {/*Use EF Cache*/}
          {/*</input>*/}
        {/*</div>*/}
        {/*<div>*/}
          {/*<input*/}
            {/*type="checkbox"*/}
            {/*defaultChecked={defaultRedisCache}*/}
            {/*onChange={this._switchRedisCache}*/}
          {/*>*/}
            {/*Use Redis Cache*/}
          {/*</input>*/}
        {/*</div>*/}
      </div>
    );
  }
}
