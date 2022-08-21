import { Component } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

const httpOptions = {
  headers: new HttpHeaders( {
    'Content-Type': 'application/json',
    'Accept':'application/json',
    'withCredentials':'true'
  } )
};
@Component({
  selector: "app-add-client",
  templateUrl: "./add-client.component.html",
  styleUrls: ["./add-client.component.sass"],
})
export class AddClientComponent {
  clientForm: UntypedFormGroup;
  hide3 = true;
  agree3 = false;
  constructor(
    private fb: UntypedFormBuilder,
    private http: HttpClient
    ) {
    this.clientForm = this.fb.group({
      username: ["", [Validators.required]],
      mobile: ["", [Validators.required]],
      email: [
        "",
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      password: ["", [Validators.required]],
      cfPassword: ["", [Validators.required]],
      date: ["", [Validators.required]],
      company_name: ["", [Validators.required]],
      currency: ["", [Validators.required]],
      billing_method: ["", [Validators.required]],
      image: [""],
    });
  }
  onSubmit() {
    console.log("Form Value", this.clientForm.value);

    this.http.post<any>(`${environment.apiUrl}/client/addclient`, this.clientForm.value,httpOptions)
      .subscribe((response)=>{
        console.log('repsonse ',response);
        console.log(this.clientForm.value);
        
      })
  }
}
