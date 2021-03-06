import { EosProvider } from './../../providers/eos/eos';
import { SendPage } from './../send/send';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ReceivePage } from '../receive/receive';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  account: string;
  key: string;
  balance: string;
  balanceUSD: string;
  publicKey: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public eos: EosProvider) {
    this.account = this.navParams.get("account");
    this.key = this.navParams.get("key");
    this.publicKey = "EOS59Ko3iRjunwmUtm3eZ64Ugzy1h9LFc8mdgnWkEgh95Ctytx1Fd";

    this.eos.setCredentials(this.account, this.key);
  }

  ionViewWillLoad() {    
    this.eos.getBalance()
      .then(response => {
        this.balance = response[0];
        const eos = this.balance.split(' ')[0].trim();
        this.eos.getEosToUSD(Number.parseFloat(eos))
          .then(result => this.balanceUSD = result.toString())
          .catch(error => alert(error));
      })
      .catch(error => alert(error));
  }

  goSendPage() {
    this.navCtrl.push(SendPage, { account: '', balance: this.balance });
  }

  goReceivePage() {
    this.navCtrl.push(ReceivePage, { account: this.account, publicKey: this.publicKey });
  }
}
