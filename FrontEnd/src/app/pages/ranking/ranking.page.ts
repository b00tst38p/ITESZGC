import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})
export class RankingPage implements OnInit {

  ranking: any[];
  title
  //@Input('position') position: any;
  
  constructor(private http: HttpClient,
    private dataService: DataServiceService,
    private toastCtrl: ToastController
  ) {
    this.loadCategoryData(1);
  }

  ngOnInit() {
  }

  loadCategoryData(category){
    //console.log("cargando datos de la categoria " + this.dataService.allCategories[category-1])
    this.title = this.dataService.allCategories[category-1]
    this.dataService.getRanking(category)
  }
}
