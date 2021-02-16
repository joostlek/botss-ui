import Router from 'vue-router';
import Vue from "vue";
import Home from "@/views/Home";
import AboutUs from "@/views/AboutUs";
import Login from "@/views/Login";
import LoggedIn from "@/views/LoggedIn";
import Overview from "@/views/dashboard/Overview";
import Profiel from "@/views/dashboard/profiel/Profiel";
import Teams from "@/views/dashboard/teams/Teams";
import JoinTeam from "@/views/dashboard/teams/JoinTeam";
import CreateTeam from "@/views/dashboard/teams/CreateTeam";
import TeamInfo from "@/views/dashboard/teams/TeamInfo";
import InviteMembers from "@/views/dashboard/teams/InviteMembers";
import Setup from "@/views/setup/Setup";
import Manage from "@/views/dashboard/manage/Manage";
import ManageTeams from "@/views/dashboard/manage/ManageTeams";
import ManageParticipants from "@/views/dashboard/manage/ManageParticipants";
import ManageAssociations from "@/views/dashboard/manage/ManageAssociations";
import CreateAssociation from "@/views/dashboard/manage/CreateAssociation";
import Dashboard from "@/views/dashboard/manage/Dashboard";

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
            path: '/aanmelding',
            name: 'Setup',
            component: Setup
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
                {
                    path: 'admin',
                    name: 'Manage',
                    component: Manage,
                    children: [
                        {
                            path: 'dashboard',
                            name: 'ManageDashboard',
                            component: Dashboard
                        },
                        {
                            path: 'teams',
                            name: 'ManageTeams',
                            component: ManageTeams
                        },
                        {
                            path: 'participants',
                            name: 'ManageParticipants',
                            component: ManageParticipants
                        },
                        {
                            path: 'associations',
                            name: 'ManageAssociations',
                            component: ManageAssociations
                        },
                        {
                            path: 'associations/create',
                            name: 'CreateAssociation',
                            component: CreateAssociation
                        },
                    ]
                },
            ]
        }
    ]
})
