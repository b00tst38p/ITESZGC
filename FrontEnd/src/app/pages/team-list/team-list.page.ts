import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.page.html',
  styleUrls: ['./team-list.page.scss'],
})
export class TeamListPage implements OnInit {


  constructor(public dataService: DataServiceService,
    private router: Router) { }

ngOnInit() {

}

teamDetails(index){
if(index == -1){
this.router.navigateByUrl("register-team/-1")
}
else{
this.router.navigateByUrl("/register-team/"+index+"/"+JSON.stringify(this.dataService.teamList[index]));
}
}

}
