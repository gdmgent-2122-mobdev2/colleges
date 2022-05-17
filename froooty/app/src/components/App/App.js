import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import {
    AuthRoutes,
    ClientRoutes,
    ProjectRoutes,
    UserRoutes,
} from "../../core/routing";
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
import AuthContainer from "./Auth/AuthContainer";
import ProjectsOverviewScreen from "./Screens/Projects/Overview/ProjectsOverviewScreen";
import ProjectAddScreen from "./Screens/Projects/Add/ProjectAddScreen";
import ProjectsLayout from "./Screens/Projects/ProjectsLayout";
import ProjectDetailLayout from "./Screens/Projects/Detail/ProjectDetailLayout";
import ProjectDetailScreen from "./Screens/Projects/Detail/ProjectDetailScreen";
import ProjectEditScreen from "./Screens/Projects/Edit/ProjectEditScreen";
import RoleContainer from "./Auth/RoleContainer";
import { UserRoles } from "../../core/modules/users/constants";
import UsersLayout from "./Screens/Users/UsersLayout";
import UsersOverviewScreen from "./Screens/Users/Overview/UsersOverviewScreen";
import UserAddScreen from "./Screens/Users/Add/UserAddScreen";
import UserDetailLayout from "./Screens/Users/Detail/UserDetailLayout";
import UserDetailScreen from "./Screens/Users/Detail/UserDetailScreen";
import UserEditScreen from "./Screens/Users/Edit/UserEditScreen";

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
                <Route
                    element={
                        <AuthContainer>
                            <AppLayout />
                        </AuthContainer>
                    }>
                    {/* Clients */}
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
                    {/* Projects */}
                    <Route
                        path={ProjectRoutes.Index}
                        element={<ProjectsLayout />}>
                        <Route index element={<ProjectsOverviewScreen />} />
                        <Route
                            path={ProjectRoutes.New}
                            element={<ProjectAddScreen />}
                        />
                        <Route
                            path={ProjectRoutes.Detail}
                            element={<ProjectDetailLayout />}>
                            <Route index element={<ProjectDetailScreen />} />
                            <Route
                                path={ProjectRoutes.Edit}
                                element={<ProjectEditScreen />}
                            />
                        </Route>
                    </Route>
                    {/* Admin */}
                    <Route
                        element={
                            <RoleContainer roles={[UserRoles.Admin]}>
                                <Outlet />
                            </RoleContainer>
                        }>
                        {/* Users */}
                        <Route
                            path={UserRoutes.Index}
                            element={<UsersLayout />}>
                            <Route index element={<UsersOverviewScreen />} />
                            <Route
                                path={UserRoutes.New}
                                element={<UserAddScreen />}
                            />
                            <Route
                                path={UserRoutes.Detail}
                                element={<UserDetailLayout />}>
                                <Route index element={<UserDetailScreen />} />
                                <Route
                                    path={UserRoutes.Edit}
                                    element={<UserEditScreen />}
                                />
                            </Route>
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
