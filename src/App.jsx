import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './page/router';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

export default App;
