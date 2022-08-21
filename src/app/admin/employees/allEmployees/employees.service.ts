import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Employees } from "./employees.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { environment } from "src/environments/environment";
@Injectable()
export class EmployeesService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = `${environment.apiUrl}/employee/allemployee`;
  isTblLoading = true;
  dataChange: BehaviorSubject<Employees[]> = new BehaviorSubject<Employees[]>(
    []
  );
 public numberEmployee:number;
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Employees[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  public getAllEmployees(): void {
    this.subs.sink = this.httpClient.get<Employees[]>(this.API_URL).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data["employee"]);
        console.log({count:data['numberEmp']})
        this.numberEmployee=data['numberEmp']
        //put number to localstorage
        const str = this.numberEmployee.toString();
        localStorage.setItem("number_emp",str);
        console.log({numberEmp:this.numberEmployee})
        console.log({dataInFunction:data["employee"]})
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
  }
  addEmployees(employees: Employees): void {
    this.dialogData = employees;

    /*  this.httpClient.post(this.API_URL, employees).subscribe(data => {
      this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });*/
  }
  updateEmployees(employees: Employees): void {
    this.dialogData = employees;

    /* this.httpClient.put(this.API_URL + employees.id, employees).subscribe(data => {
      this.dialogData = employees;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );*/
  }
  deleteEmployees(id: number): void {
    console.log(id);

    /*  this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );*/
  }
}
