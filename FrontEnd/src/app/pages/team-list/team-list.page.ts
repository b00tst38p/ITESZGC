import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.page.html',
  styleUrls: ['./team-list.page.scss'],
})
export class TeamListPage implements OnInit {

  teamList;
  loading;

  constructor(public dataService: DataServiceService,
    private router: Router,
    public loadingCrtl: LoadingController) {
      
    this.initContent();
  }

  async initContent() {

    try {
      this.loading = await this.loadingCrtl.create({
        //duration: 5000,
        message: "Please wait...",
        backdropDismiss: true
      });

      await this.loading.present();
    
      this.dataService.postDataToAPI(this.dataService.serverIP + "/teams/list", "").subscribe(data => {
        this.teamList = data;
        //console.log(this.teamList)
        this.loadingCrtl.dismiss()
      });
    }
    catch (e) {
      console.log("Error: " + e);
      return null;
    }
  }

  ngOnInit() {
  }


  teamDetails(index) {
    if (index == -1) {
      this.router.navigateByUrl("register-team/-1")
    }
    else {
      this.router.navigateByUrl("/register-team/" + index + "/" + JSON.stringify(this.dataService.teamList[index]));
    }
  }

}
