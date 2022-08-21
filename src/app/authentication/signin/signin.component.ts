import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/core/service/auth.service";
import { Role } from "src/app/core/models/role";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  authForm: UntypedFormGroup;
  role : String;
  submitted = false;
  loading = false;
  error = "";
  hide = true;
  userRole : String;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    super();
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }
  get f() {
    return this.authForm.controls;
  }
  adminSet() {
    this.authForm.get("username").setValue("");
    this.authForm.get("password").setValue("");
  }
  employeeSet() {
    this.authForm.get("username").setValue("");
    this.authForm.get("password").setValue("");

  }
  clientSet() {
    this.authForm.get("username").setValue("");
    this.authForm.get("password").setValue("");
  }
  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = "";
    if (this.authForm.invalid) {
      this.error = "Username and Password not valid !";
      return;
    } else {
      // console.log(this.f.username.value+this.f.password.value);
      
      this.subs.sink = this.authService
        .login(this.f.username.value, this.f.password.value)
        .subscribe(
          (res) => {
            if (res) {
              setTimeout(async () => {
                const a = await JSON.parse(localStorage.getItem("currentUser"));
                console.log({a});
                                
                const role =await res.user.role;
                console.log(role);
                if (role ===Role.Admin) {
                  this.router.navigate(["/admin/dashboard/main"]);
                } else if (role ===Role.Employee) {
                  this.router.navigate(["/employee/dashboard"]);
                } else if (role ===Role.Client) {
                  this.router.navigate(["/client/dashboard"]);
                } else {
                  this.router.navigate(["/authentication/signin"]);
                }
                this.loading = false;
              }, 1000);
            } else {
              this.error = "Invalid Login";
            }
            
          },
          (error) => {
            this.error = error;
            this.submitted = false;
            this.loading = false;
          }
        );
    }
  }
}
