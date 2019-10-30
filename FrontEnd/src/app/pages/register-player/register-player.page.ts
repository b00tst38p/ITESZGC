import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-register-player',
  templateUrl: './register-player.page.html',
  styleUrls: ['./register-player.page.scss'],
})
export class RegisterPlayerPage implements OnInit {

  @Input() member;
  @Input() categories;

  player = {
    gamerTag: "",
    name: "",
    lastName: "",
    category: ""
  }

  constructor(private modalCtrl: ModalController, 
    private toastCtrl: ToastController,
    private platform: Platform) { }

  ngOnInit() {
    this.player.gamerTag = this.member.gamerTag;
    this.player.name = this.member.name;
    this.player.lastName = this.member.lastName;
    this.player.category = this.member.category;
    //console.log(this.member.gamerTag + " " + this.categories);
  }
/*
  @HostListener('document:ionBackButton', ['$event'])
    private  overrideHardwareBackAction($event: any) {
         /*this.modalCtrl.dismiss().then(()=>{
          this.presentToast("dice que si");
         }).catch((error) =>{
          this.presentToast(error);
         });*/
         //this.cancelPlayerDetails();
/*         this.platform.backButton.subscribe(()=>{
          this.cancelPlayerDetails();
        });
        
    }
*/
  cancelPlayerDetails(){
    //this.modalCtrl.dismiss(this.member);
    this.modalCtrl.dismiss();
  }

  confirmPlayerDetails(){
    this.modalCtrl.dismiss(this.player);
  }

  async presentToast(msgToShow) {
    const toast = await this.toastCtrl.create({
      message: msgToShow,
      duration: 2000
    });
    toast.present();
  }

}
