import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import ListaDoadores from './pages/ListaDoadores';
import FormDoadores from './pages/FormDoadores';

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Landing} />
      <Route path="/search" component={ListaDoadores} />
      <Route path="/donate" component={FormDoadores} />
    </BrowserRouter>
  );
}

export default Routes;
