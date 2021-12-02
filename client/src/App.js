import React, {useContext} from "react"
import { Route, Switch, Redirect} from "react-router-dom";
import Navbar from "./components/nav/Navbar.js"
import Auth from "./components/authentication/Auth.js"
import Profile from "./components/pages/Profile.js"
import Public from "./components/pages/Public.js"
import Project from "./components/pages/ProjectPage.js";
import ProtectedRoute from "./components/authentication/ProtectedRoute.js"
import TaskPage from "./components/pages/TaskPage.js";
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

