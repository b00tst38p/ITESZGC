import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})
export class RankingPage implements OnInit {
  listaVacia = []
  ranking: any;
  title
  loading: any;
  //@Input('position') position: any;
  
  constructor(private http: HttpClient,
    private dataService: DataServiceService,
    private toastCtrl: ToastController,
    public loadingCrtl: LoadingController
  ) {
    this.loadCategoryData(1);
  }

  ngOnInit() {
  }

  async loadCategoryData(category){
    this.title = this.dataService.allCategories[category-1]

    try {
      this.loading = await this.loadingCrtl.create({
        //duration: 5000,
        message: "Please wait...",
        backdropDismiss: true
      });
    await this.loading.present();
    this.dataService.getDataFromAPI(this.dataService.serverIP + "/scoreboard/categoria/" + category).subscribe(data =>{
      console.log(data);
      this.ranking=data;
      //console.log(Array.isArray(this.ranking))
      this.loadingCrtl.dismiss();//.then(()=>console.log("Dissmissed"));
    });
      console.log("loading...")
    }
    catch (e) {
      console.log("Error: " + e);
      return null;
    }
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingCrtl.create({
      spinner: null,
      duration: 5000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }
}
