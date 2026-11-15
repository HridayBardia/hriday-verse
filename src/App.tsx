import { lazy, Suspense } from "react";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
import { LoadingProvider } from "./context/LoadingProvider";
import SmoothScroll from "./components/SmoothScroll";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  return (
    <ErrorBoundary>
      <LoadingProvider>
        <SmoothScroll>
          <Suspense fallback={null}>
            <MainContainer>
              <Suspense fallback={null}>
                <CharacterModel />
              </Suspense>
            </MainContainer>
          </Suspense>
        </SmoothScroll>
      </LoadingProvider>
    </ErrorBoundary>
  );
};

export default App;
