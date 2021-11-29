import React, {useContext} from "react"
import { Route, Switch, Redirect} from "react-router-dom";
import Navbar from "./components/Navbar.js"
import Auth from "./components/Auth.js"
import Profile from "./components/Profile.js"
import Public from "./components/Public.js"
import Project from "./components/Project.js";
import ProtectedRoute from "./components/ProtectedRoute.js"
import TaskPage from "./components/TaskPage.js";
import { UserContext } from "./context/UserProvider.js"
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


export default function App() {

    const { token, logout } = useContext(UserContext)

    return (
        <DndProvider backend={HTML5Backend}>
        <Navbar logout={logout} />
            <Switch>
                <Route
                    exact path="/"
                    render={() => token ? <Redirect to="/profile" /> : <Auth />}
                />
                <ProtectedRoute
                    path="/profile"
                    component={Profile}
                    redirectTo="/"
                    token={token}
                />
                <ProtectedRoute
                    path="/public"
                    component={Public}
                    redirectTo="/"
                    token={token}
                />
                <ProtectedRoute
                    path="/project/:projectId"
                    component={Project}
                    redirectTo="/"
                    token={token}
                />
                <ProtectedRoute
                    path="/tasks/:taskId"
                    component={TaskPage}
                    redirectTo="/"
                    token={token}
                />
            </Switch>
        </DndProvider>
    )
}

