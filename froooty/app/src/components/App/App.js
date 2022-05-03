import { Routes, Route, Navigate } from "react-router-dom";
import { AuthRoutes, ClientRoutes } from "../../core/routing";
import AppLayout from "./AppLayout";
import AuthProvider from "./Auth/AuthProvider";
import LoginScreen from "./Auth/Login/LoginScreen";
import OnboardingLayout from "./Auth/OnboardingLayout";
import ClientsLayout from "./Screens/Clients/ClientsLayout";
import ClientDetailLayout from "./Screens/Clients/Detail/ClientDetailLayout";
import ClientDetailScreen from "./Screens/Clients/Detail/ClientDetailScreen";
import ClientEditScreen from "./Screens/Clients/Edit/ClientEditScreen";
import ClientsOverviewScreen from "./Screens/Clients/Overview/ClientsOverviewScreen";
import ClientAddScreen from "./Screens/Clients/Add/ClientAddScreen";

const App = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path={AuthRoutes.Index} element={<OnboardingLayout />}>
                    <Route path={AuthRoutes.Login} element={<LoginScreen />} />
                    <Route
                        path="*"
                        element={<Navigate to={AuthRoutes.Login} />}
                    />
                </Route>
                <Route element={<AppLayout />}>
                    <Route
                        path={ClientRoutes.Index}
                        element={<ClientsLayout />}>
                        <Route index element={<ClientsOverviewScreen />} />
                        <Route
                            path={ClientRoutes.New}
                            element={<ClientAddScreen />}
                        />
                        <Route
                            path={ClientRoutes.Detail}
                            element={<ClientDetailLayout />}>
                            <Route index element={<ClientDetailScreen />} />
                            <Route
                                path={ClientRoutes.Edit}
                                element={<ClientEditScreen />}
                            />
                        </Route>
                    </Route>
                    <Route
                        path="*"
                        element={<Navigate to={ClientRoutes.Index} />}
                    />
                </Route>
            </Routes>
        </AuthProvider>
    );
};

export default App;
