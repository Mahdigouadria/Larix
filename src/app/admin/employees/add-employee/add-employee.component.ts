import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { environment } from "src/environments/environment";


const httpOptions = {
  headers: new HttpHeaders( {
    'Content-Type': 'application/json',
    'Accept':'application/json',
    'withCredentials':'true'
  } )
};

@Component({
  selector: "app-add-employee",
  templateUrl: "./add-employee.component.html",
  styleUrls: ["./add-employee.component.sass"],
})
export class AddEmployeeComponent {
  docForm: UntypedFormGroup;
  hide3 = true;
  agree3 = false;
  constructor(
    private fb: UntypedFormBuilder,
    private http: HttpClient
    ) {
    this.docForm = this.fb.group({
      username: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      last: [""],
      gender: ["", [Validators.required]],
      mobile: ["", [Validators.required]],
      password: ["", [Validators.required]],
      cfPassword: ["", [Validators.required]],
      position: [""],
      department: [""],
      address: [""],
      email: [
        "",
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      dob: ["", [Validators.required]],
      education: [""],
      image: [""],
    });
  }
  
  onSubmit() {
    console.log("Form Value", this.docForm.value);
    console.log(httpOptions.headers)
    this.http.post<any>(`${environment.apiUrl}/employee/addemployee`, this.docForm.value,httpOptions)
      .subscribe((response)=>{
        console.log('repsonse ',response);
        console.log(this.docForm.value);
        
        
      })
  }
}
