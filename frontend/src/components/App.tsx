import '../sticky-footer.css';
import * as React from 'react';
import { StatelessComponent } from 'react';
import { TimeSettings } from '../containers/TimeSettings';
import { ResultGraph } from '../containers/ResultGraph';

export const App: StatelessComponent = () => (
  <div>
    <div>
      <TimeSettings/>
      <ResultGraph/>
    </div>
    <footer className="footer">
      <p>
        &copy; Team 11, PA036
      </p>
    </footer>
  </div>
);

App.displayName = 'App';
