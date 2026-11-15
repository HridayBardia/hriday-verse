import { lazy, Suspense } from "react";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
import { LoadingProvider } from "./context/LoadingProvider";
import SmoothScroll from "./components/SmoothScroll";

const App = () => {
  return (
    <>
      <LoadingProvider>
        <SmoothScroll>
          <Suspense>
            <MainContainer>
              <Suspense>
                <CharacterModel />
              </Suspense>
            </MainContainer>
          </Suspense>
        </SmoothScroll>
      </LoadingProvider>
    </>
  );
};

export default App;
