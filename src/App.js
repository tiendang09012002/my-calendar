import './App.css';
import Header from './shared/components/Layouts/Header';
import Footer from './shared/components/Layouts/Footer';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from'react-redux';
import { PersistGate } from'redux-persist/integration/react';
import { store, persistor } from './redux-setup/store';
import publicRoutes from './routers';
function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Header></Header>
          <Routes>
            {publicRoutes.map((route, index) => <Route key={index} path={route.path} element={<route.element />} />)}
          </Routes>
          <Footer></Footer>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
