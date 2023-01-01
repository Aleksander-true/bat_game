import './style.scss';

import App from './components/App';

const app = new App();
window.addEventListener('load', () => {
  app.start();
});
