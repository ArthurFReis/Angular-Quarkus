import { Component } from '@angular/core';
import { Customer } from './Model/Customer';
import { CustomerService } from './service/customer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular-Quarkus';

  customer = new Customer();

  btnRegister:boolean = true;

  table:boolean = true;

  customers:Customer[] = [];

  constructor(private service:CustomerService){}

  select():void{
    this.service.select()
    .subscribe(turnback => this.customers = turnback);
  }


  register():void{
    this.service.register(this.customer)
    .subscribe(turnback => {

      this.customers.push(turnback);

      this.customer = new Customer();

      this.service.select()
      .subscribe(turnback => this.customers = turnback);

      alert('Customer recorded successfully!');

    });
  }

  selectCustomer(position:number):void{
    this.customer = this.customers[position];

    this.btnRegister = false;

    this.table = false;
  }

  update():void{
    this.service.update(this.customer)
    .subscribe(turnback => {

         let position = this.customers.findIndex(obj => {
            return obj.id == turnback.id;

      });

      this.customers[position] = turnback;

      this.service.select()
      .subscribe(turnback => this.customers = turnback);

    });

    this.customer = new Customer();

      this.btnRegister = true;

      this.table = true;

      alert('Customer updated sucessfully!');
  }

  remove():void{
    this.service.remove(this.customer.id!)
    .subscribe(turnback => {

         let position = this.customers.findIndex(obj => {
            return obj.id == this.customer.id;

      });

      this.customers.slice(position, 1);

      this.customer = new Customer();

      this.btnRegister = true;

      this.table = true;

      this.service.select()
      .subscribe(turnback => this.customers = turnback);

      alert('Customer removed sucessfully!');

    });

  }

  cancel():void{

    this.customer = new Customer();

    this.btnRegister = true;

    this.table = true;

  }

  ngOnInit(){
    this.select();
  }
}

