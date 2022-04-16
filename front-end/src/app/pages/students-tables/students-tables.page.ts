import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students-tables',
  templateUrl: './students-tables.page.html',
  styleUrls: ['./students-tables.page.scss'],
})
export class StudentsTablesPage implements OnInit {
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
    this.http.get('http://localhost:3000/students/').subscribe(data => {
      this.students = data;
    }
    )
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
