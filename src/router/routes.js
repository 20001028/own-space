import App from '../views/main/index';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import FileTransfer from '../views/files/file-transfer';
import Dragger from '../views/files/dragger';
import Home from '../views/home/home';
import FileList from '../views/files/file-list';
import React from 'react'

const RouterConfig = function () {
    return (
        <BrowserRouter>
            <Switch>
                <App path="/">
                    <Redirect exact from="/" to="/home"></Redirect>
                    <Route exact path="/home" component={Home}>

                    </Route>
                    <Route exact path="/file" component={FileTransfer}>
                        <Redirect exact from="/file" to="/file/upload"></Redirect>
                        <Route path="/file/upload" component={Dragger}>

                        </Route>
                        <Route path="/file/list" component={FileList}>
                            
                        </Route>
                    </Route>
                </App>
            </Switch >
        </BrowserRouter >
    );
};

export default RouterConfig;