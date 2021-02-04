import Router from 'vue-router';
import Vue from "vue";
import Home from "@/views/Home";
import AboutUs from "@/views/AboutUs";
import Login from "@/views/Login";
import LoggedIn from "@/views/LoggedIn";
import ParticipantInfoForm from "@/views/ParticipantInfoForm";
import Payment from "@/views/Payment";
import PaymentDone from "@/views/PaymentDone";
import Overview from "@/views/dashboard/Overview";
import Profiel from "@/views/dashboard/profiel/Profiel";
import Teams from "@/views/dashboard/teams/Teams";
import JoinTeam from "@/views/dashboard/teams/JoinTeam";
import CreateTeam from "@/views/dashboard/teams/CreateTeam";
import TeamInfo from "@/views/dashboard/teams/TeamInfo";
import InviteMembers from "@/views/dashboard/teams/InviteMembers";

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/overons',
            name: 'AboutUs',
            component: AboutUs
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/callback',
            name: 'LoggedIn',
            component: LoggedIn
        },
        {
            path: '/deelnemersinfo',
            name: 'ParticipantInfoForm',
            component: ParticipantInfoForm
        },
        {
            path: '/betaling',
            name: 'Payment',
            component: Payment
        },
        {
            path: '/betaald',
            name: 'PaymentDone',
            component: PaymentDone
        },
        {
            path: '/dashboard',
            component: Overview,
            name: 'Dashboard',
            children: [
                {
                    path: 'profiel',
                    name: 'Profile',
                    component: Profiel
                },
                {
                    path: 'teams',
                    name: 'Teams',
                    component: Teams,
                    children: [
                        {
                            path: 'create',
                            name: 'CreateTeam',
                            component: CreateTeam
                        },
                        {
                            path: 'join',
                            name: 'JoinTeam',
                            component: JoinTeam
                        },
                        {
                            path: 'info',
                            name: 'TeamInfo',
                            component: TeamInfo
                        },
                        {
                            path: 'invite',
                            name: 'InviteTeamMembers',
                            component: InviteMembers
                        },
                    ]
                },
            ]
        }
    ]
})
