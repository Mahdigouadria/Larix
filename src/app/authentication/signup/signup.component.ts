import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router"; 
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import{AuthService} from '../../core/service/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "src/environments/environment";


const httpOptions = {
  headers: new HttpHeaders( {
    'Content-Type': 'application/json',
    'Accept':'application/json',
    'withCredentials':'true'
  } )
};

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})




export class SignupComponent implements OnInit {

  



   authForm: UntypedFormGroup;
  submitted = false;
  returnUrl: string;
   hide = true;
  chide = true;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}
  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ["", Validators.required],
      email: [
        "",
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      password: ["", Validators.required],
      cfPassword: ["", Validators.required],
      
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
    
  }
  get f() {
    return this.authForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    
    
    // stop here if form is invalid
    
    if (this.authForm.invalid) {
      return;
    } else {
      console.log(this.authForm.value);
      this.http.post<any>(`${environment.apiUrl}/user/adduser`, this.authForm.value,httpOptions)
      .subscribe((response)=>{
        console.log('repsonse ',response);
      })
      this.router.navigate(["/authentication/signin"]);
    }
    
    
            



}

}
