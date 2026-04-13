import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import GraphPage    from "./pages/GraphPage";
import ExplorePage  from "./pages/ExplorePage";
import ConceptPage  from "./pages/ConceptPage";
import DomainsPage  from "./pages/DomainsPage";
import PathPage     from "./pages/PathPage";
import ComparePage  from "./pages/ComparePage";
import EdgesPage    from "./pages/EdgesPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/graph" replace />} />
        <Route path="graph"         element={<GraphPage />} />
        <Route path="explore"       element={<ExplorePage />} />
        <Route path="concept/:id"   element={<ConceptPage />} />
        <Route path="domains"       element={<DomainsPage />} />
        <Route path="path"          element={<PathPage />} />
        <Route path="compare"       element={<ComparePage />} />
        <Route path="edges"         element={<EdgesPage />} />
        <Route path="*"             element={<Navigate to="/graph" replace />} />
      </Route>
    </Routes>
  );
}
