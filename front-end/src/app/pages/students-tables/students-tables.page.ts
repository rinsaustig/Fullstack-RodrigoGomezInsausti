import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students-tables',
  templateUrl: './students-tables.page.html',
  styleUrls: ['./students-tables.page.scss'],
})
export class StudentsTablesPage implements OnInit {
  url = environment.url.students;
  students: any;
  studentsFiltered: any;
  degree: any;
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.getStudents()
  }



  newStudent() {
    this.router.navigateByUrl('register-student')

  }

  getStudents() {
    this.http.get(this.url).subscribe(data => {
      this.students = data;
    }
    )
  }

  home() {
    this.router.navigateByUrl('home')
  }

  filterStudents() {
    {
      this.studentsFiltered = this.students.filter(student => {
        if (student.degree == parseInt(this.degree)) {
          return student
        }
      })
      
    }
  }
}
