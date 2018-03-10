import {Worklog} from "./Worklog";
export class Issue {
    originalEstimate :string;
    remainingEstimate: string;
    timespent : string;
    labels : string;
    worklog : Worklog[];
}