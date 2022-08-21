import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../models/user";
import { environment } from "src/environments/environment";
import { AuthData } from "src/app/authentication/signup/auth-data";

// const httpOptions = {
//   headers: new HttpHeaders( {
//     'Content-Type': 'text/plain',
//     'Accept':'text/plain',
//     'withCredentials':'true'
//   } )
// };

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public authToken:any;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/user/login`, {
        username,
        password,
      })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          console.log(user);
          console.log(environment.apiUrl);
          localStorage.setItem("currentUser", JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  // createUser(username : String, email :String , password : String ,cfpassword : String){
  //   const authData: AuthData = {username : username ,email: email , password : password ,cfpassword:cfpassword }  
  //   return this.http.post("http://localhost:5000/user/adduser",authData).subscribe(response =>{  
  //     console.log(response);  
  // });
    
  // }

  // loadToken() {
  //   const token = localStorage.getItem('refresh_token'); 
  //   console.log(token);
    
  //   this.authToken= token;

  // }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
    return of({ success: false });
  }

  // loggedIn() {
  //   return !!localStorage.getItem('id_token');
  // }
}
