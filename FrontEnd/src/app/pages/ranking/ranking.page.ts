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
  //@Input('position') position: any;
  constructor(private http: HttpClient,
    private dataService: DataServiceService,
    private toastCtrl: ToastController
  ) {
    dataService.getRanking(1);
  }

  ngOnInit() {
    //this.dataService.getDataFromAPI()
  }

  onclick() {
    console.log("Something");
  }
}
