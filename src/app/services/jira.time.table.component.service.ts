import {Injectable} from '@angular/core';
import {Http,  Response, RequestOptions, Headers, HTTP_PROVIDERS} from '@angular/http';
// import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Issue} from '../models/Issue';
import {Project} from '../models/Project';



@Injectable()
export class JiraTimeTableService {

    
    private actionUrl: 'http://localhost:3001/rest/api/worklog/';
    private options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' }) });
    constructor(private http: Http) {
     
     }
    // private mongoDBServer = "http://teamcityabg:81/"; //point to production server
    // private mongoDBServer = config.mongoDBServer;//*******i.e. == "http://localhost:80/" *****; //point to local db
    // private testSuitesUrl = config.testSuitesUrl;//*****i.e. == "rest/projects/test-suites/"*****;
    // private projectUrl = config.projectUrl;//*****i.e. ==  "rest/projects/"*****;
    // private buildTypesUrl = config.buildTypesUrl;//*****i.e. == "rest/projects/test-suites/build-types/*****";

    public getWorkLogs(id: string): Observable<Issue> {
        console.log(" url "+'http://localhost:3001/rest/api/worklog/'+id);
        // return this.http.get('http://localhost:3001/rest/api/worklog/'+id);
        return this.http.get('http://localhost:3001/rest/api/worklog/'+id)
        // ...and calling .json() on the response to return data
         .map((res:Response) => res.json())
         //...errors if any
         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    public getIssue(id: string) {
        console.log(" url "+'http://localhost:3001rest/api/worklog/'+id);
        let promise = new Promise((resolve, reject) => { this.http.get('http://localhost:3001/rest/api/worklog/'+id)
        .toPromise()
        .then(response => response.json().data as Issue)
        .catch(this.handleError)});

        return promise;
    }
    public getAllWorkLogs(id: string): Observable<Project> {
        console.log(" url "+'http://localhost:3001/rest/api/project-issues/'+id);
        // return this.http.get('http://localhost:3001/rest/api/worklog/'+id);
        return this.http.get('http://localhost:3001/rest/api/project-issues/'+id)
        // ...and calling .json() on the response to return data
         .map((res:Response) => res.json())
         //...errors if any
         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    // public getAllWorkLogs(id: string){
    //     console.log(" url "+'http://localhost:3001/rest/api/project-issues/'+id);
    //     let promise = new Promise((resolve, reject) => { this.http.get('http://localhost:3001/rest/api/project-issues/'+id)
    //     .toPromise()
    //     .then(response => response.json().data as Issue)
    //     .catch(this.handleError)});
    // }
    handleError(error) {
        console.log('Hio')
        // IMPORTANT: Rethrow the error otherwise it gets swallowed
        throw error;
     }
}