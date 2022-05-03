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

// replaces : values with values from object
// e.g. route('/projects/:id', { id : 9 }) -> /projects/9
export const route = (path, options = {}) => {
    Object.keys(options).forEach((key) => {
        path = path.replace(`:${key}`, options[key]);
    });
    return path;
};

export { AuthRoutes, ClientRoutes };
