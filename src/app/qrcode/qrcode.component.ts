import { Component, OnInit } from '@angular/core';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss'],
})
export class QrcodeComponent  implements OnInit {

  qrCodeValue: string = '';

  ngOnInit() {
    // Interval untuk memperbarui QR code setiap 15 detik
    interval(3000).pipe(
      map(() => this.generateUniqueCode())
    ).subscribe(code => {
      this.qrCodeValue = code;
    });
    // Set pertama kali ketika komponen dimuat
    this.qrCodeValue = this.generateUniqueCode();
  }

  constructor() {}

   // Fungsi untuk menghasilkan kode unik
   generateUniqueCode(): string {
    // Menggunakan timestamp sebagai contoh, bisa diganti dengan logika lain
    return `QR-${new Date().getTime()}`;
  }

}

