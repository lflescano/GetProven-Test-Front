import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { PrincipalComponent } from "./principal.component";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from "../profile/profile.component";

const routes: Routes = [
	{path: "", component: PrincipalComponent},
	{path: "profile", component: ProfileComponent}
];

@NgModule({
	imports: [
    	CommonModule,
		BrowserModule,
        FormsModule,
        ReactiveFormsModule,
    	RouterModule.forChild(routes)
	],
	exports: [
    	PrincipalComponent
	],
	declarations: [PrincipalComponent]
})
export class PrincipalModule {
}