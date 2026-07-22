import { lazy, Suspense } from "react";
import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
import { LoadingProvider } from "./context/LoadingProvider";

const App = () => {
  return (
    <ErrorBoundary>
      <LoadingProvider>
        <Suspense fallback={<div style={{ padding: "2rem", color: "#fff" }}>Loading portfolio…</div>}>
          <MainContainer>
            <ErrorBoundary fallback={<div style={{ padding: "2rem", color: "#fff" }}>3D scene unavailable.</div>}>
              <Suspense fallback={<div style={{ padding: "2rem", color: "#fff" }}>Loading character…</div>}>
                <CharacterModel />
              </Suspense>
            </ErrorBoundary>
          </MainContainer>
        </Suspense>
      </LoadingProvider>
    </ErrorBoundary>
  );
};

export default App;
