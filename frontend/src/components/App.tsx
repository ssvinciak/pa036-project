import '../sticky-footer.css';
import * as React from 'react';
import { StatelessComponent } from 'react';
import { ResultGraph } from './ResultGraph';

export const App: StatelessComponent = () => (
  <div>
    <div className="container">
      <h1>Sorry, still in progress... :( </h1>
      <ResultGraph />
    </div>
    <footer className="footer">
      <p>
        &copy; Team 11, PA036
      </p>
    </footer>
  </div>
);

App.displayName = 'App';
