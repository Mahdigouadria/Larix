import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { environment } from "src/environments/environment";

// const httpOptions = {
//   headers: new HttpHeaders( {
//     'Content-Type': 'application/json',
//     'Accept':'application/json',
//     'withCredentials':'true'
//   } )
// };

@Component({
  selector: "app-add-project",
  templateUrl: "./add-project.component.html",
  styleUrls: ["./add-project.component.sass"],
})
export class AddprojectsComponent {
  projectForm: UntypedFormGroup;
  hide3 = true;
  agree3 = false;
  public Editor = ClassicEditor;
  // teamList: string[] ;
  teamList: string[] = [
    "Sarah Smith",
    "John Deo",
    "Pankaj Patel",
    "Pooja Sharma",
  ];
  // clientList: string[] = [
  //   "Mohsen mo",
  //   "John mounir",
  //   "Pankaj mmm",
  //   "Pooja awchy",
  // ];

  constructor(private fb: UntypedFormBuilder , private http: HttpClient) {
    this.projectForm = this.fb.group({
      // projectID: ["", [Validators.required]],
      projectTitle: ["", [Validators.required]],
      department: ["", [Validators.required]],
      priority: ["", [Validators.required]],
      client: ["", [Validators.required]],
      price: ["", [Validators.required]],
      startDate: ["", [Validators.required]],
      endDate: ["", [Validators.required]],
      team: ["", [Validators.required]],
      status: ["", [Validators.required]],
      fileUpload: [""],
    });
  }
  onSubmit() {
    console.log("Form Value", this.projectForm.value);
    
    // this.http.post<any>(`${environment.apiUrl}/project/addProject`, this.projectForm.value,httpOptions)
    //   .subscribe((response)=>{
    //     console.log('repsonse ',response);
    //     console.log(this.projectForm.value);
        
    //   })
  }
}
