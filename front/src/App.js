import './App.css';
import Authentication from './pages/Authentication';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavBar } from './components/NavBar';
import { AuthProvider } from './hooks/useAuth';
import MoviesAndShows from './pages/MoviesShows';
import { UserListProvider } from './hooks/useList';
import UserListPage from './pages/UserListPage';
import LoadMore from './pages/LoadMore';

function App() {
  const defaultTheme = createTheme();

  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <AuthProvider>
          <UserListProvider>
            <div className="App">
              <NavBar />
              <Routes>
                <Route exact path='/' element={<Home />}></Route>
                <Route exact path='/auth' element={<Authentication />}></Route>
                <Route exact path='/movies' element={<MoviesAndShows />}></Route>
                <Route exact path='/list' element={<UserListPage />}></Route>
                <Route exact path='/loadmore' element={<LoadMore />}></Route>
              </Routes>
            </div>
          </UserListProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
