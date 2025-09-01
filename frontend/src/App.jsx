import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './Application';
import E404View from './views/NotFound';
import HomeView from './views/Home';
import DocsView from './views/Docs';


function App() {
  return (
    <Router>
      <AppProvider>
        <Routes>
          <Route exact path='/' element={<HomeView />} />
          <Route exact path='/docs' element={<DocsView />} />
          <Route path='*' status="404" element={<E404View />} />
        </Routes>
      </AppProvider>
    </Router>
  );
}

export default App;
