import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient, HttpParams ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core'; 
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  form1: FormGroup;
 
  constructor(
    private fbr: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private httpClient: HttpClient,) { 
     
  }

  ngOnInit() {
    this.form1 = this.fbr.group({
      name: ['', Validators.required],
      sarname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      UID: ['', Validators.required],
    });
  }
  onSubmit(){
    console.log(this.form1.controls["name"].value);
    const headers = new HttpHeaders()
    .set("Content-Type", "application/json");
if(this.form1.controls["name"].value != null){
  this.httpClient.post('http://localhost:1337/login-data' ,{
        
    "username": this.form1.controls["name"].value,
    "password": this.form1.controls["sarname"].value,
    "name": this.form1.controls["username"].value,
    "sarname": this.form1.controls["password"].value,
    "UID": this.form1.controls["UID"].value,

    
},{headers})
  .subscribe(
      val => {
          console.log("PUT call successful value returned in body", 
                      val);
                      this.router.navigate(['login']);
      },
      response => {
          console.log("PUT call in error", response);
      },
      () => {
          console.log("The PUT observable is now completed.");
      }
  );
    }
}
    
}