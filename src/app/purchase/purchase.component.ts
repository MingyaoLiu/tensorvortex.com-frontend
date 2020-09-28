import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../purchase.service';
import { ImageService } from '../image.service';
import { runInThisContext } from 'vm';
import { faEdit, faImage } from '@fortawesome/free-solid-svg-icons'
import { Data, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.less']
})
export class PurchaseComponent implements OnInit {


  imageService: ImageService
  purchaseService: PurchaseService

  faEdit = faEdit;
  faImage = faImage;

  image?: object;

  purchases = []
  localPurchase = PurchaseComponent.templatePurchase()

  constructor(purchaseService: PurchaseService, imageService: ImageService, private sanitizer: DomSanitizer, private router: Router) {
    this.purchaseService = purchaseService
    this.imageService = imageService

  }


  private static templatePurchase = () => {
    return {
      _id: undefined,
      place: null,
      title: null,
      payer: null,
      date: new Date().toISOString().split('T')[0],
      total: null,
      _imageId: undefined,
      detail: {
        mingyao: {
          paid: false,
          exclude: false,
          amount: null
        },
        rosy: {
          paid: false,
          exclude: false,
          amount: null
        },
        zelena: {
          paid: false,
          exclude: false,
          amount: null
        },
        liam: {
          paid: false,
          exclude: false,
          amount: null
        },
        others: {
          paid: false,
          exclude: true,
          amount: null
        },
      }
    }
  }

  ngOnInit() {
    this.getAllPurchase()
  }

  setPlace = (event) => {
    this.localPurchase.place = event.target.textContent
  }
  setPayer = (event) => {
    this.localPurchase.payer = event.target.textContent
  }
  updatePaid = (event, name) => {
    this.localPurchase.detail[name].paid = !this.localPurchase.detail[name].paid
  }
  updateExclude = (event, name) => {
    this.localPurchase.detail[name].exclude = !this.localPurchase.detail[name].exclude
  }

  updateImage = (event) => {
    this.image = event.target.files[0]
    console.log(this.image)
  }

  calculateSplit = (purchase) => {
    const totalSeperateAmount = purchase.detail.mingyao.amount + purchase.detail.rosy.amount + purchase.detail.zelena.amount + purchase.detail.liam.amount + purchase.detail.others.amount;
    const totalSplit = (purchase.detail.mingyao.exclude ? 0 : 1) + (purchase.detail.rosy.exclude ? 0 : 1) + (purchase.detail.zelena.exclude ? 0 : 1) + (purchase.detail.liam.exclude ? 0 : 1) + (purchase.detail.others.exclude ? 0 : 1)
    return (purchase.total - totalSeperateAmount) / totalSplit
  }

  getTotal = (name) => {
    if (name) {
      let total = 0
      this.purchases.forEach((purchase) => {
        total += purchase.detail[name].amount + (purchase.detail[name].exclude ? 0 : this.calculateSplit(purchase))
      })
      return total
    } else {
      let total = 0
      this.purchases.forEach((purchase) => {
        total += purchase.total
      })
      return total
    }
  }

  loadOnePurchase(purchase) {
    this.localPurchase = purchase
  }


  loadReceipt = (imageId) => {
    console.log(imageId)
    this.router.navigate(['/purchase/' + imageId]);
  }

  getAllPurchase = () => {
    this.purchaseService.getAllPurchase().subscribe((data: Array<object>) => {
      this.purchases = data;
    });
  }

  clearForm = () => {
    this.localPurchase = PurchaseComponent.templatePurchase()
    this.image = undefined;
    console.log(this.image)
  }

  getRoundedNumber = (num: number) => {
    return Math.round(num * 100) / 100
  }

  showOwningAlert = () => {

    const allname = ['mingyao', 'rosy', 'zelena', 'liam', 'others']
    let alertMsg = `
      `
    allname.forEach(name => {
      let ownRes = this.getOwningAmount(name);

      let ownsLst = []
      allname.forEach(element => {
        ownsLst.push(element)
      });
      ownsLst.splice(ownsLst.indexOf(name), 1)
      console.log(ownsLst)
      alertMsg += name + ` pays =>`
      
      ownsLst.forEach(ownName => {
        if (ownRes[ownName] && ownRes[ownName] !== 0) {

          alertMsg += `
          • ` + ownName + `: ` + JSON.stringify(ownRes[ownName])
        }
      })
      alertMsg += `
      `
    });

    window.alert(alertMsg);
  }

  getOwningAmount = (name: string) => {
    const owning = {
      mingyao: 0,
      rosy: 0,
      zelena: 0,
      liam: 0
    }

    this.purchases.forEach(purchase => {
      if (!purchase || !purchase.payer) {
        console.log('no purchase info')
      } else {
        const payer = purchase.payer.toLowerCase()
        if (payer === name) {
        } else if (purchase.detail[name].paid) {
        } else if (purchase.detail[name].exclude) {
          console.log('excluded, still need to pay ' + this.getRoundedNumber(purchase.detail[name].amount))
          owning[payer] += this.getRoundedNumber(purchase.detail[name].amount)
        } else {
          owning[payer] += this.getRoundedNumber(purchase.detail[name].amount + this.calculateSplit(purchase))
        }
      }

    });
    return owning;
  }

  submitChange = () => {

    this.localPurchase.total = this.localPurchase.total == null ? 0 : this.localPurchase.total;

    this.localPurchase.detail.mingyao.amount = this.localPurchase.detail.mingyao.amount == null ? 0 : this.localPurchase.detail.mingyao.amount;
    this.localPurchase.detail.rosy.amount = this.localPurchase.detail.rosy.amount == null ? 0 : this.localPurchase.detail.rosy.amount;
    this.localPurchase.detail.zelena.amount = this.localPurchase.detail.zelena.amount == null ? 0 : this.localPurchase.detail.zelena.amount;
    this.localPurchase.detail.liam.amount = this.localPurchase.detail.liam.amount == null ? 0 : this.localPurchase.detail.liam.amount;
    this.localPurchase.detail.others.amount = this.localPurchase.detail.others.amount == null ? 0 : this.localPurchase.detail.others.amount;

    this.localPurchase.date = new Date(this.localPurchase.date).toISOString()

    if (this.image) {
      const imageData = {
        id: this.localPurchase._imageId,
        image: this.image
      }
      this.imageService.postImage(imageData).subscribe((data) => {
        this.localPurchase._imageId = data._id
        this.purchaseService.updateAddPurchase(this.localPurchase).subscribe((data2: Array<object>) => {
          console.log(data2)
          this.getAllPurchase()
        });
      });
    } else {
      this.purchaseService.updateAddPurchase(this.localPurchase).subscribe((data: Array<object>) => {
        this.getAllPurchase()
      });
    }


  }

}
