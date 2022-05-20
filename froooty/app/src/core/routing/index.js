const AuthRoutes = {
    Index: "/auth",
    Login: "/auth/login",
};

const ClientRoutes = {
    Index: "/clients",
    New: "/clients/new",
    Detail: "/clients/:id",
    Edit: "/clients/:id/edit",
};

const ProjectRoutes = {
    Index: "/projects",
    New: "/projects/new",
    Detail: "/projects/:id",
    Edit: "/projects/:id/edit",
};

const LogRoutes = {
    Index: "/logs",
    New: "/logs/new",
};

const UserRoutes = {
    Index: "/users",
    New: "/users/new",
    Detail: "/users/:id",
    Edit: "/users/:id/edit",
};

// replaces : values with values from object
// e.g. route('/projects/:id', { id : 9 }) -> /projects/9
export const route = (path, options = {}) => {
    Object.keys(options).forEach((key) => {
        path = path.replace(`:${key}`, options[key]);
    });
    return path;
};

export { AuthRoutes, ClientRoutes, UserRoutes, LogRoutes, ProjectRoutes };
