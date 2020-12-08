import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HomeComponent } from "../home/home.component";
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;
  public data ;
  public routes: Routes = []; 
  
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private httpClient: HttpClient,
    
  ) {
  }

  public getNews(){
    return this.httpClient.get(`http://localhost:1337/login-data` );
  }
  async ngOnInit() { 

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.getNews().subscribe((data)=>{
      this.data= data;
      console.log(data);
      
    });
    if (await this.authService.checkAuthenticated()) {
      await this.router.navigate([this.returnUrl]);
    }
  }

  async onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        const username = this.form.get('username').value;
        const password = this.form.get('password').value;
        this.getNews();
        console.log(this.data);
        
        for ( let i = 0; i <  this.data.length; i++) {
          if (this.data[i]["username"]==username && this.data[i]["password"]==password) {
                console.log("successs");
                 
                  this.formSubmitAttempt = true;
                  this.router.navigate(['game']);
                
            
          } else {
             
                this.loginInvalid = true;
                 console.log(" no successs");
               
          }
          
        }
      
        
      } catch (err) {
        
      }
    }  
  }
}
