// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-detail-detail',
//   templateUrl: './detail-detail.component.html',
//   styleUrls: ['./detail-detail.component.css']
// })
// export class DetailDetailComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from './../../service/crud.service';
import { FormGroup, FormBuilder } from "@angular/forms";
@Component({
  selector: 'app-detail-detail',
  templateUrl: './detail-detail.component.html',
  styleUrls: ['./detail-detail.component.scss']
})
export class DetailDetailComponent implements OnInit {
  getId: any;
  updateForm: FormGroup;
  
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.crudService.GetUser(this.getId).subscribe(res => {
      this.updateForm.setValue({
        name: res['name'],
        email: res['email'],
      });
    });
    this.updateForm = this.formBuilder.group({
      name: [''],
      email: [''],
    })
  }
  ngOnInit() { }
  onUpdate(): any {
    this.crudService.updateUser(this.getId, this.updateForm.value)
    .subscribe(() => {
        console.log('User updated successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/users-list'))
      }, (err) => {
        console.log(err);
    });
  }
}
