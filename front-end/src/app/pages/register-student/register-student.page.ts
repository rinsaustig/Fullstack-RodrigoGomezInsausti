import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.page.html',
  styleUrls: ['./register-student.page.scss'],
})
export class RegisterStudentPage implements OnInit {

  student: string;
  birthday: Date;
  father: string;
  mother: string;
  degree: number;
  section: string;
  inscription: Date;

  private formData: FormGroup


  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {


    this.formData = new FormGroup({
      student: new FormControl(),
      birthday: new FormControl(),
      father: new FormControl(),
      mother: new FormControl(),
      degree: new FormControl(),
      section: new FormControl(),
      inscription: new FormControl()
    })
  }
  
  
  onSubmit(data) {
    
    if(
      this.formData.value.student != null
      && this.formData.value.birthday != null
      && this.formData.value.father != null
      && this.formData.value.mother != null
      && this.formData.value.degree != null
      && this.formData.value.section != null
      && this.formData.value.inscription != null) {
        let student = {
          student: data.student,
          birthday: data.birthday,
          father: data.father,
          mother: data.mother,
          degree: parseInt(data.degree[0]),
          section: data.section[0],
          inscription: data.inscription
        };
      this.http.post('http://localhost:3000/students/register', student)
      .subscribe(res =>{
        alert('Estudiante creado con exito')
        this.router.navigateByUrl('students-tables', {replaceUrl: true})
      }, error =>{
        alert('Estudiante ya existente')
      });
    } else {
      alert('Complete todos los campos del formulario')
    }

  }

  studentTables() {
    this.router.navigateByUrl('students-tables', {replaceUrl: true})
  }
  home() {
    this.router.navigateByUrl('home')
  }

}
