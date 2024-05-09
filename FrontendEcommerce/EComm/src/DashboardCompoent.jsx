
import HomeComponent from './Home';
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import store from "./Store/Store";
import PaginationProvider from './contexts/usePaginationContext';

export const DashboardCompoent = () => {


        function fallbackRender({ error }) {
       
          return (
            <div role="alert">
              <p>Something went wrong:</p>
              <pre style={{ color: "red" }}>{error.message}</pre>
            </div>
          );
        }

  return (
    <div>
    <ErrorBoundary fallbackRender={fallbackRender}>
    {/* <BrowserRouter> */}
  
    <PaginationProvider>
     
           <HomeComponent/>
           </PaginationProvider>

    </ErrorBoundary>
    </div>
  )
}
