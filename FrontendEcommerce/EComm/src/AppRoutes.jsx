
import {BrowserRouter as Router,Route, Routes, } from 'react-router-dom';
import ThemeProvider from './contexts/useThemeContext';

import Cart from './pages/Cart';
import User from './pages/User';
import ProductDetailsComponent from './components/ProductDetailsComponent';
import { DashboardCompoent } from './DashboardCompoent';
import { Provider } from 'react-redux';
import store from './Store/Store';


const AppRoutes = () => {
    function About() {
        return <h2>About Page</h2>;
      }
    
      function Listing() {
        return <h3>I am Listing Page</h3>;
      }
    
      const PageNotFound = () => {
        return <p>Page not found!!! </p>;
      };
    



  return (
    <Router>
          <Provider store={store}>
        <Routes>
            <Route path='/' exact element={
                    <ThemeProvider>
                        <DashboardCompoent/>
                    </ThemeProvider>
            } />
                    <Route path="about" element={<About />} />
                    <Route path="Listing" element={<Listing />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="user" element={<User />} />
                    {/* <Route path="/hooks" element={<HooksExample/>}/> */}
                    <Route path="product/:id" element={<ProductDetailsComponent />} />
                    {/* <Route path = "/product/:id" element = {<ProductDetails></ProductDetails>}> </Route> */}
                    {/* <ReduxWithThunkExample/> */}
                    {/* <ToolkitExample/> */}

                    <Route path="*" element={<PageNotFound></PageNotFound>}/>
        </Routes>
        </Provider>
    </Router>
  )
}

export default AppRoutes