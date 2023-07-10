import ReactDOM from 'react-dom';
import './index.scss';
import { HashRouter as Router } from 'react-router-dom';
import { App } from './App';
import { SessionProvider } from './providers/SessionContext';

ReactDOM.render(
  <Router>
    <SessionProvider>
      <App />
    </SessionProvider>
  </Router>,
  document.getElementById('root'),
);
