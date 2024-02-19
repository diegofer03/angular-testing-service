import { Component, inject } from '@angular/core';
import { Product } from 'src/app/models/app.models';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  productService = inject(ProductsService)
  products : Product[] = []
  ngOnInit(){
    this.getAllProducts()
  }

  getAllProducts(){
    this.productService.getAllSimple().subscribe({
      next: (data) => {
        this.products = data
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
