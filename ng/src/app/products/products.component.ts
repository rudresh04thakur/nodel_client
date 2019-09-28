import { Component, OnInit } from '@angular/core';
import { AllService } from '../all.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private _ser:AllService) { }
  products;
  ngOnInit() {
    this._ser.getList().subscribe((res)=>{
      this.products = res;
      console.log("Response == ",res);
    })
  }

}
