import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserData } from '../model/User';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  contacto: FormGroup;
  userData: UserData;
  submitted: boolean = false;
  isUpdated: boolean = false;

  constructor(private formBuilder: FormBuilder,
             private profileService: ProfileService,
             private router: Router) { }

  ngOnInit(): void {
    if(this.profileService.getUserData()){
        this.userData = this.profileService.getUserData();
        if(this.userData){
          this.contacto = this.formBuilder.group({
            username: ['', [Validators.required, Validators.minLength(5)]],
            email: ['', [Validators.required, Validators.email]],
            country: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
            age: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern(/^[0-9]\d*$/)]],
            phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]]
          });
          
          this.contacto.patchValue({
            username: this.userData.username,
            email: this.userData.email,
            country: this.userData.country,
            age: this.userData.age,
            phone: this.userData.phone
          });
        }else{
          this.router.navigate(['']);
        }  
        
    }else{
      this.router.navigate(['']);
    }
  }

  get f() { return this.contacto.controls; }

  async onSubmit(){
    this.submitted = true;
    if (this.contacto.invalid) {
      return;
    }
  }

  updateData(){
    this.isUpdated = true;
  }

  saveData(){
    alert("The data is updated!")
  }

}
