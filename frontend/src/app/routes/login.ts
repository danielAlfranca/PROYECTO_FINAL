import { LoginComponent } from "../components/sections/login/login.component";

export const loginRoutes = [

    { path: 'start-session', component: LoginComponent,   outlet:'login', data:{

        title:'app-login',
        icon:'bi bi-bar-chart',
        type:'login',
        query:null
    }}
];