import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { Camera, Heart, Github, Menu, ChevronDown, LogOut,User,Home, Grid , Edit3 , X, Briefcase} from 'angular-feather/icons';


const icons = {
  Camera,
  Heart,
  Github,
  Menu,
  ChevronDown,
  LogOut,
  User,
  Home,
  Grid,
  Edit3,
  X,
  Briefcase
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FeatherModule.pick(icons)

  ],
  exports: [
    FeatherModule
  ]
})
export class IconsModule { }
