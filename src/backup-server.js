var rp = require('request-promise');
// var request = require("syn-request");
// var rp = require('request-promise');
var express = require('express');
var morgan = require('morgan'); // logger
var assert = require('assert');
var bodyParser = require('body-parser');
var cors = require('cors');
// var request = require('sync-request');
var request = require('request');

var fs = require('fs'), path = require('path');
var app = express();

var http = require('https');
app.use(cors());
app.use('/public', express.static(__dirname + '/public'));
app.use('/public/scripts', express.static(__dirname + '/node_modules'));
app.use('/app', express.static(__dirname + '/app'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));
var url = "/app/rest/"



var users = [];
var uniques =[];
var user = new Object();
app.get('/index/*', function (req, res) {
    console.log("index");
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/rest/api/changelog', function (req, res) {
    console.log("Access rest api from here");
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
      
        // console.log(body);
        var obj = JSON.parse(body);
        user.reportedBy=obj.fields.reporter.name;
        user.created=obj.fields.created;
        // console.log(sys.inspect(obj));
        var count = 0;
        for (var i = 0; i < obj.changelog.histories.length; i++) {
            count++;
            console.log("histories "+obj.changelog.histories.length);
            var counter = obj.changelog.histories[i];
            if(user.name == counter.author.name || user.name == null)
            {
                user.name = counter.author.name;
                // console.log(counter.author.name);
                if(user.updated == null)
                {
                    user.updated = counter.created;
                }
                else{
                    user.changed = counter.created;
                }
                // console.log(counter.created);
                if(user.mainasignee == null)
                {
                    user.mainasignee = counter.items[0].fromString == "To Do"? true: false;
                }
                for(var j = 0 ; j < counter.items.length; j++)
                {
                    if(counter.items[j].field == "status")
                    {
                        console.log("  value of j for status field "+j);
                        if(user.arrivedfromstatus == null && user.arrivedtostatus == null)                        
                        {   
                            user.arrivedfromstatus=counter.items[j].fromString;
                            user.arrivedtostatus=counter.items[j].toString;
                        }
                        else{
                            console.log("  value of user.movedfromstatus"+counter.items[j].fromString);
                            user.movedfromstatus = counter.items[j].fromString;
                            console.log("  value of user.movedtostatus"+counter.items[j].toString);
                            user.movedtostatus = counter.items[j].toString;
                        }
                    }
                    if(counter.items[j].field == "assignee")
                    {
                        console.log("  counter.items[j].field "+counter.items[j].field);
                        user.assignedby= counter.items[j].fromString;
                        user.assignedTo = counter.items[j].to;
                    }
                 }
            }else{
                user = new Object();
                console.log("new user has arrived");
                user.name = counter.author.name;
                user.reportedBy=obj.fields.reporter.name;
                user.created=obj.fields.created;
                user.updated = counter.created;
                for(var j = 0 ; j <counter.items.length; j++)
                {
                    if(counter.items[j].field == "status")
                    {
                        console.log("  counter.items[j].field "+counter.items[j].field);
                        user.movedfromstatus = counter.items[j].fromString;
                        user.movedtostatus = counter.items[j].toString;
                    }
                    if(counter.items[j].field == "assignee")
                    {
                        console.log("  counter.items[j].field "+counter.items[j].field);
                        user.assignedby= counter.items[j].fromString;
                        user.assignedTo = counter.items[j].to;
                    }
                }
            }
            if(!doesContain(users, user)){
                users.push(user);
            }
          
        }
        

        users.forEach(user => {
            console.log("UserName : "+user.name+" assigned On : "+user.created+" updated date : "+user.updated+" changed on :"+user.changed+" isMainAssignee : "+user.mainasignee+" Arrived Status From : "+user.arrivedfromstatus +" Arrived Status To :"+user.arrivedtostatus +" Moved Status From : "+ user.movedfromstatus +" Moved Status To :"+user.movedtostatus+" Assigned By :"+user.assignedby+" Assigned To : "+user.assignedTo);   
        });
        
        console.log(users.length);
        res.json(obj.histories);
       
        
      });
});

function doesContain(users, user){
    var doesnt = false;
    for(var i = 0; i < users.length; i++) {
        var existingUser = users[i];
        if(existingUser.name == user.name)
        {
            if(existingUser.created == null && user.created != null){
                existingUser.created = user.created;
            }
            if(existingUser.updated == null && user.updated != null){
                existingUser.updated = user.updated;
            }
            if(existingUser.mainasignee == null && user.mainasignee != null){
                existingUser.mainasignee = user.mainasignee;
            }
            if(existingUser.arrivedfromstatus == null && user.arrivedfromstatus != null){
                existingUser.arrivedfromstatus = user.arrivedfromstatus;
            }
            if(existingUser.movedfromstatus == null && user.movedfromstatus != null){
                existingUser.movedfromstatus = user.movedfromstatus;
            }
            if(existingUser.movedtostatus == null && user.movedtostatus != null ){
                existingUser.movedtostatus = user.movedtostatus;
            }
            if(existingUser.assignedby == null && user.assignedby != null){
                existingUser.assignedby = user.assignedby;
            }
            if(existingUser.assignedTo == null && user.assignedTo != null){
                existingUser.assignedTo = user.assignedTo;
            }
            
            doesnt = true;
        }
    }
    return doesnt;
}
function addIfFieldDoesNotExist(field1, field2, user){
    if(field1 == null )
    {
        user.field1 = field2;
    }
}
app.listen(3001, function (req, res) {
    console.log('*****Running on port number  ::  30001 *****');
   
});



// var options = { method: 'GET',
//   url: 'http://62.60.42.238:8080/rest/api/2/issue/POAT-3?expand=changelog',
//   headers: 
//    { 'Postman-Token': '1a223e6f-9e69-e2cf-e207-af080fdfa095',
//      'Cache-Control': 'no-cache',
//      Authorization: 'Basic bmF2ZWQuc2hhaDpXZWxjb21lMTIz' } };


//
    
var listOfWorkLogs = [];
var worklogs = new Object();
    app.get('/rest/api/worklog/:issueid', function (req, res) {
        
        var queryBy = req.params.issueid;
        // request_get.on()
        var urlissue = "http://naved.shah:Welcome123@62.60.42.238:8080/rest/api/2/issue/"+queryBy;
        var optionsworklog = { 
            url: urlissue 
            // headers: 
            // { 
            //     'Postman-Token': '1a223e6f-9e69-e2cf-e207-af080fdfa095',
            //     'Cache-Control': 'no-cache',
            //     Authorization: 'Basic bmF2ZWQuc2hhaDpXZWxjb21lMTIz'
            // } 
        };
        var logs = new Object();
        var r =  request.get(optionsworklog, function (error, response, body) {

           
            if (error) throw new Error(error);
           
            // console.log("url "+optionsworklog.url);
           
            var obj = JSON.parse(body);
            console.log("Access rest api for woklog for issue : "+ obj.key);
            user.reportedBy=obj.fields.reporter.name;
            user.created=obj.fields.created;
            // console.log(sys.inspect(obj));
            var count = 0;
            // console.log("Time tracking");
            // console.log("Original estimate : "+ obj.fields.timetracking.originalEstimate);
            // console.log("Remaining estimate : "+ obj.fields.timetracking.remainingEstimate);
            // console.log("Remaining estimate : "+ obj.fields.timetracking.timeSpent);
            // console.log("labels : "+obj.fields.labels);
            worklogs.key = obj.key;
            worklogs.originalEstimate = obj.fields.timetracking.originalEstimate;
            worklogs.remainingEstimate = obj.fields.timetracking.remainingEstimate;
            worklogs.timespent = obj.fields.timetracking.timeSpent;
            worklogs.labels = obj.fields.labels;
            worklogs.work = [];
            for (var i = 0; i < obj.fields.worklog.worklogs.length; i++) {
                var w = new Object();
                var worklog = obj.fields.worklog.worklogs[i];
                // console.log("| author name : " +worklog.author.name 
                // + " | Time spent in seconds : "+worklog.timeSpentSeconds
                //  +" | Date of creation "+worklog.created 
                //  +" | Date of update "+ worklog.updated 
                //  +" | Date of started "+worklog.started 
                //  +" | labels: "+obj.fields.labels+" |");
                w.name = worklog.author.name;
                w.timespent = worklog.timeSpentSeconds;
                w.created=worklog.created;
                w.updated = worklog.updated;
                w.started = worklog.started;
                worklogs.work.push(w);
                logs = worklogs;
            }

            // listOfWorkLogs.push(logs);
            console.log("List of worklogs "+listOfWorkLogs.length);
            // res.send(JSON.stringify(worklogs));
            // res.set(JSON.stringify(worklogs));
            res.json(worklogs);
            // next();

          });
         
        //   res.send(listOfWorkLogs);
        // console.log("r "+JSON.stringify(r));
        // return (logs);
    });
    

    var op = 
    {
        method: 'GET',
        url: 'http://62.60.42.238:8080/rest/api/2/search?jql=project="POAT"',
        headers: 
        { 
            'Postman-Token': '1a223e6f-9e69-e2cf-e207-af080fdfa095',
            'Cache-Control': 'no-cache',
            Authorization: 'Basic bmF2ZWQuc2hhaDpXZWxjb21lMTIz' 
        } 
    };
    var project = new Object();
    app.get('/rest/api/project-issues/:projectKey', function (req, res) {
        listOfWorkLogs = [];
        var projectkey = req.params.projectKey;
        console.log("url "+'http://62.60.42.238:8080/rest/api/2/search?jql=project="'+projectkey+'"');
        var logs = new Object();
        var issues = [];
        var fromrestissues =[];
        var urltouse='http://naved.shah:Welcome123@62.60.42.238:8080/rest/api/2/search?jql=project="'+projectkey+'"';
        console.log("url to use"+urltouse);
        var optionprojectissues = 
        {
           
            url:urltouse 
            // headers: 
            // { 
            //     'Postman-Token': '1a223e6f-9e69-e2cf-e207-af080fdfa095',
            //     'Cache-Control': 'no-cache',
            //     Authorization: 'Basic bmF2ZWQuc2hhaDpXZWxjb21lMTIz' 
            // } 
        };
        console.log("optionprojectissues to use"+optionprojectissues.url);
        request.get(optionprojectissues, function (error, response, body) {
            if (error) throw new Error(error);
            
           
            var obj = JSON.parse(body);
            issues = obj.issues;
            console.log("Access rest api for project-issues >>  Total issues: "+ obj.total);
            for (var i = 0; i < issues.length; i++) {
                var is = obj.issues[i];
                // console.log("issue key  : " +issue.key );
                request.get({ url: "http://localhost:3001/rest/api/worklog/"+is.key },  function(error, response, body) {     
                // rp("http://localhost:3001/rest/api/worklog/"+issue.key).then(function(response){
                    // var issue = new Object();
                    console.log("issue key  : " +body);
                    let issue = JSON.parse(body);
                    // var obj = JSON.parse(body);
                    // issue.key = obj.key;
                    // issue.originalEstimate = obj.originalEstimate;
                    // issue.remainingEstimate = obj.remainingEstimate;
                    // issue.timespent = obj.timeSpent;
                    // issue.labels = obj.labels;
                    // console.log("obj.key"+obj.key+"obj.ori"+obj.originalEstimate);
                    // issue.work = [];
                    // for (var i = 0; i < obj.work.length; i++) {
                    //     var w = new Object();
                    //     var worklog = obj.work[i];
                    //     // console.log("| author name : " +worklog.author.name 
                    //     // + " | Time spent in seconds : "+worklog.timeSpentSeconds
                    //     //  +" | Date of creation "+worklog.created 
                    //     //  +" | Date of update "+ worklog.updated 
                    //     //  +" | Date of started "+worklog.started 
                    //     //  +" | labels: "+obj.fields.labels+" |");
                    //     w.name = worklog.name;
                    //     w.timespent = worklog.timespent;
                    //     w.created=worklog.created;
                    //     w.updated = worklog.updated;
                    //     w.started = worklog.started;
                    //     issue.work.push(w);
                    // }
                    fromrestissues.push(issue);
                    // issues.push(issue); 
               
                    console.log("-----------------------------------------------"+body.key);
                    // res.set(add);
                    // pause(2000)
                    // .then(function () {
                    //     res.send(items)
                    // });
                });     
                      
               
            }
            project.issue = fromrestissues;
            // var final = add;
            // res.json(project);
            // res.json(add);
            console.log("---------------------DONE HERE--------------------");
          })
          //.pipe(res);
        //  /.pipe(res);
        res.json(project);
        console.log("---------------------DONE--------------------");
    });
    


//    var Client = require('node-rest-client').Client;
    
// //    var client = new Client();
//    var options_auth = { user: "admin", password: "123" };
//    function callGet(url){
//        var res ; 
//         var client = new Client(options_auth);
//         // direct way 
//         var request_get = client.get(url, function (data, response) {
//             // parsed response body as js object 
//             console.log( JSON.parse(data));
//             // raw response 
//             // console.log(response);
//             res = response;
//         });
//         return res;
//     }
    