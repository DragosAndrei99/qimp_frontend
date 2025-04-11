import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import QEdgeDetectionCanvas from "./pages/QEdgeDetectionCanvas";
import CEdgeDetection from "./pages/CEdgeDetection";

import Layout from "./components/Layout";
import VehicleDetection from "./pages/VehicleDetection";
import PostProcessingAlgorithms from "./pages/PostProcessingAlgorithms";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<div></div>} />

        <Route
          path="/quantum-edge-detection"
          element={
            <QEdgeDetectionCanvas apiEndpoint="http://127.0.0.1:5000/q-edge-detection" />
          }
        />
        <Route
          path="/classic-edge-detection"
          element={
            <CEdgeDetection apiEndpoint="http://127.0.0.1:5000/c-edge-detection" />
          }
        />

        <Route
          path="/vehicle-detection"
          element={
            <VehicleDetection/>
          }
        />

<Route
          path="/post-processing"
          element={
            <PostProcessingAlgorithms/>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
