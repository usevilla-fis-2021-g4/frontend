import React from "react";
import {
    Routes,
    Route,
    BrowserRouter,
} from "react-router-dom";
import { Login } from "../components/login/Login";
import { DashboardRoute } from "./DashboardRoute";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/login" element={
                            <PublicRoute>
                                <Login />
                            </PublicRoute>
                        }
                    />
                    <Route path="/*" element={
                            <PrivateRoute>
                                <DashboardRoute />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </div>
        </BrowserRouter>
    )
}
