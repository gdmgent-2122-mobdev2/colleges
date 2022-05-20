import Project from "../Project/Project.entity";
import User from "../User/User.entity";

export interface LogBody {
    name: string;
    description: string;
    time: number;
    date: string;
    projectId: number;
    project?: Project;
    userId: number;
    user?: User;
}
