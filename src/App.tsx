import './App.css';
import './firebaseApp';
import Footer from './Pages/Footer';
import Header from './Pages/Header';
import Main from './Pages/Main';
import AppProvider from './providers/AppProvider';

function App() {
  return (
    <div className='App'>
      <AppProvider>
        <Header />
        <Main />
        <Footer />
      </AppProvider>
    </div>
  );
}
export default App;
