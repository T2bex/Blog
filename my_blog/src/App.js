import './App.css';
import HomePage from './pages/HomePage';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import AboutPage from './pages/AboutPage';
import ArticleListPage from './pages/ArticleListPage';
import ArticlePage from './pages/ArticlePage';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <div id='page-body'>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/about' element={<AboutPage/>}/>
          <Route path='/articles' element={<ArticleListPage/>}/>
          <Route path='/article/:articleId' element={<ArticlePage/>}/>
        </Routes>
      </div>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
