import { Component } from '@angular/core';
import { TranslateService, USE_STORE } from '@ngx-translate/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import {HttpProvider} from "../../providers/http/http";
import {User} from "../../models/user";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

/**
 * @author: KMR
 * @email: yajuve.25.dz@gmail.com
 */

export class LoginPage {
//cette variable nous permets de pre-remplir les formulaire de login ou register
  account = {
    username: 'Zack',
    fullname: 'Mohamed',
    email: 'mohamedslamani1996@gmail.com',
    password: '9Slamani'
  };

  public loginErrorString: string;//message d'erreur lors de la connection
  private opt: string = 'signin';// definir les 'tabs' par default. soit inscription soit connexion

  constructor(public http:HttpProvider, public userProvider: UserProvider, public menuCtrl: MenuController, public navCtrl: NavController,
    public translateService: TranslateService) {
    this.menuCtrl.enable(false);//pas d'affichage de menu
  }

  // Attempt to login in through our User service
  doLogin() {
    this.http.get('my-profile.json').subscribe((profile : User) => {
      //Request asyn. sur le fichier my-profile.json qui se situe dans asset mocks et le contenu du fichier est mise dans la variable profile
      this.userProvider.user = <User>profile;
      //ajout du profile user dans la class UserProvider grace au setter. grace a sa , nous pouvons recuperer le profile a tout moments vu qu'il est stocké dans la classe UserProvider
      if  (this.chekedUser(profile)){
        this.navCtrl.setRoot('ListFriendsPage');
      }
      //setRoot -> permet de supprimer toutes les vues de la stack et de naviguer vers la root page.
      else{
        this.translateService.get('LOGIN_ERROR').subscribe((value) => { //translate service permet d'effectuer du multi-langue.
        //subscribe =>concept des PROMISE - OBSERVABLE, le traitement se fait de maniere asych 
          this.loginErrorString = value;
        })
      }

      //navCtrl -> permet de naviguer sur plusieurs page
    }, (err) => {
      console.error(err);//en cas d'erreur sur la recup des utilisateurs
    });

  }


  chekedUser(users:User){

    return (users.email === this.account.email && users.password ==this.account.password) ? true: false;
  }

}