import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // includes Popper
import '@fortawesome/fontawesome-free/css/all.min.css'; // ✅ Font Awesome هنا مهم جدًا
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary.jsx';
import { UserContextProvider } from './Components/UserContext/UserContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserContextProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </UserContextProvider>
  </BrowserRouter>
);
