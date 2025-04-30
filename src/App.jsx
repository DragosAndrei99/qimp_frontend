import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import QEdgeDetectionCanvas from "./pages/QEdgeDetectionCanvas";
import CEdgeDetection from "./pages/CEdgeDetection";

import Layout from "./components/Layout";
import VehicleDetection from "./pages/VehicleDetection";
import PostProcessingAlgorithms from "./pages/PostProcessingAlgorithms";
import Dashboard from "./pages/Dashboard";
import History from './pages/History';
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from './components/PrivateRoute';
import Logout from "./pages/Logout";

const API_ENDPOINT = "http://127.0.0.1:5000"

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />

        <Route
          path="/quantum-edge-detection"
          element={
            <PrivateRoute>
              <QEdgeDetectionCanvas apiEndpoint={API_ENDPOINT} />
            </PrivateRoute>

          }
        />
        <Route
          path="/classic-edge-detection"
          element={
            <PrivateRoute>
              <CEdgeDetection apiEndpoint={`${API_ENDPOINT}/c-edge-detection`} />
            </PrivateRoute>
          }
        />

        <Route
          path="/vehicle-detection"
          element={
            <PrivateRoute>
              <VehicleDetection
                apiEndpoint={API_ENDPOINT} />
            </PrivateRoute>

          }
        />

        <Route
          path="/post-processing"
          element={
            <PrivateRoute>
              <PostProcessingAlgorithms
                apiEndpoint={API_ENDPOINT}
              />
            </PrivateRoute>

          }
        />

        <Route
          path="/history"
          element={
            <PrivateRoute>
              <History />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login apiEndpoint={API_ENDPOINT} />} />
        <Route path="/register" element={<Register apiEndpoint={API_ENDPOINT} />} />
        <Route path="/logout" element={
          <PrivateRoute>
            <Logout />
          </PrivateRoute>
        } />

      </Route>
    </Routes>
  );
}

export default App;
