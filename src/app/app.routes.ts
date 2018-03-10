import {RouterModule , Routes} from '@angular/router';
import {JiraTimeTableComponent} from './components/jira-time-table/jira.time.table.component';
import { AppComponent } from '../app/app.component'

export const routes: Routes = [
	{ path: 'index/jira-time', component: JiraTimeTableComponent },

];

export const appRoutingProviders: any[] = [
];
export const routing =  RouterModule.forRoot(routes);