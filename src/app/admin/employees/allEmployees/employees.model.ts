import { formatDate } from "@angular/common";
export class Employees {
  id: string;
  image: string;
  username: string;
  email: string;
  date: string;
  role: string;
  mobile: string;
  department: string;
  education: string;
  constructor(employees) {
    {
      this.id = employees._id || this.getRandomID();
      this.image = employees.image || "assets/images/user/user1.jpg";
      this.username = employees.username || "";
      this.email = employees.email || "";
      this.date = formatDate(new Date(), "yyyy-MM-dd", "en") || "";
      this.role = employees.role || "";
      this.mobile = employees.mobile || "";
      this.department = employees.department || "";
      this.education = employees.education || "";
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
