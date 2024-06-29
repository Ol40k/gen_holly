import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { QuizStateMachine } from './components/QuizStateMachine/QuizStateMachine';
import { EmailPage } from './components/EmailPage/EmailPage';
import { ThankYouPage } from './components/ThankYouPage/ThankYouPage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

import './App.scss';
// config, dvh
function App() {
  const router = createBrowserRouter([
    {
      path: '/*',
      element: <NotFoundPage />,
    },
    {
      path: '/quiz/:id',
      element: <QuizStateMachine />,
    },
    {
      path: '/email',
      element: <EmailPage />,
    },
    {
      path: '/thank-you',
      element: <ThankYouPage />,
    },
  ]);

  return (
    <main className="main">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
