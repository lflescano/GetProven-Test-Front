import { Component, EmbeddedViewRef, OnInit, TemplateRef, ViewChild, ViewContainerRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { UserData } from "../model/User";
import { ProfileService } from "../services/profile.service";
 
@Component({
   selector: "app-principal",
   templateUrl: "./principal.component.html",
   styleUrls: ["./principal.component.scss"]
})
export class PrincipalComponent implements OnInit {

   contacto: FormGroup;
   submitted = false;
   serialCode: any = null;
   openInputSerial: boolean = false;
   confirmSerial:boolean = false;

   componentRef: EmbeddedViewRef<any> = null;

   
   @ViewChild('inputSerialTemplate')
   inputSerialTemplate:TemplateRef<any>;

   constructor(private formBuilder: FormBuilder,
               private vref: ViewContainerRef,
               private profileService: ProfileService,
               private router: Router) {
   }

   get f() { return this.contacto.controls; }

   public ngOnInit(): void {
      this.contacto = this.formBuilder.group({
         username: ['', [Validators.required, Validators.minLength(5)]],
         email: ['', [Validators.required, Validators.email]],
         country: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
         age: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern(/^[0-9]\d*$/)]],
         phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]]
     });
   }

   async onSubmit() {
      this.submitted = true;
      if (this.contacto.invalid) {
          return;
      }else{
         this.confirmSerial = false;
         this.openInputSerial = true;
         if(!this.componentRef){
            this.componentRef = this.vref.createEmbeddedView(this.inputSerialTemplate);
         }   
         await new Promise(f => setTimeout(f, 300000));
         this.confirmSerial = true;
         this.openInputSerial = false;
      }   
  }

  applySerialCode(){
     let myUser = new UserData();
     myUser.username = this.contacto.get('username').value;
     myUser.email = this.contacto.get('email').value;
     myUser.age = this.contacto.get('age').value;
     myUser.country = this.contacto.get('country').value;
     myUser.phone = this.contacto.get('phone').value;
     this.profileService.setUserData(myUser);
     this.router.navigate(['profile']);
  }
   
}