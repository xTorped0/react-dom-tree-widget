import { createRoot } from 'react-dom/client';
import { Widget } from './app/index';

const containerElement = document.createElement('div');
document.body.appendChild(containerElement);

const root = createRoot(containerElement);
root.render(<Widget />);


