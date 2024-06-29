import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import './index.css';
import { initTranslations } from './i18next.ts';

initTranslations();
ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
