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
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;
  public data ;
  public routes: Routes = []; 
   

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private httpClient: HttpClient,) {}

  ngOnInit() {
    this.getdata().subscribe((data)=>{
      this.data= data;
      console.log(data);
      
    });
  }
 
   
  public getdata(){
    return this.httpClient.get(`http://localhost:1337/stores` );
  }
  async onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    
      try {
        
        this.getdata();
        console.log(this.data);
        this.data= this.data;
        
      
        
      } catch (err) {
        
      }
       
  }
}
