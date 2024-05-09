
import {BrowserRouter as Router,Route, Routes, } from 'react-router-dom';
import ThemeProvider from './contexts/useThemeContext';

import Cart from './pages/Cart';
import ProductDetailsComponent from './components/ProductDetailsComponent';
import { DashboardCompoent } from './DashboardCompoent';
import { Provider } from 'react-redux';
import store from './Store/Store';
import SignOnPortal from './pages/SignOnPortal';
import ProfilePage from './pages/ProfilePage';
import AuthProvider from './contexts/AuthContext';


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
      <AuthProvider>
          <Provider store={store}>
        <Routes>
          
            <Route path='/' exact element={
              <ThemeProvider>
                        <DashboardCompoent/>
                    </ThemeProvider>
            } />
            <Route path='signonportal' element={<SignOnPortal/>}/>
                    <Route path="about" element={<About />} />
                    <Route path="Listing" element={<Listing />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="profile" element={<ProfilePage />} />
                    {/* <Route path="/hooks" element={<HooksExample/>}/> */}
                    <Route path="product/:id" element={<ProductDetailsComponent />} />
                    {/* <Route path = "/product/:id" element = {<ProductDetails></ProductDetails>}> </Route> */}
                    {/* <ReduxWithThunkExample/> */}
                    {/* <ToolkitExample/> */}

                    <Route path="*" element={<PageNotFound></PageNotFound>}/>
        </Routes>
        </Provider>
            </AuthProvider>
    </Router>
  )
}

export default AppRoutes