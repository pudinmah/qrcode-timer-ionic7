import { Component, OnInit } from '@angular/core';
import { interval, timer } from 'rxjs';
import { map, takeWhile, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss'],
})
export class QrcodeComponent  implements OnInit {

  qrCodeValue: string = '';
  countdown: number = 3; // Set initial countdown

  ngOnInit() {
    // Timer untuk update QR code dan reset countdown setiap 15 detik
    interval(3000).pipe(
      map(() => this.generateUniqueCode()),
      switchMap(code => {
        this.qrCodeValue = code;
        return this.startCountdown();
      })
    ).subscribe();

    // Set pertama kali QR code saat komponen dimuat
    this.qrCodeValue = this.generateUniqueCode();
    this.startCountdown().subscribe();
  }

  // Fungsi untuk menghasilkan kode unik
  generateUniqueCode(): string {
    return `QR-${new Date().getTime()}`; // Contoh: menggunakan timestamp
  }

  // Fungsi untuk memulai hitungan mundur 15 detik
  startCountdown() {
    return timer(0, 1000).pipe(
      map(i => 3 - i), // Hitungan mundur dari 15 ke 0
      takeWhile(val => val >= 0), // Berhenti ketika mencapai 0
      map(val => this.countdown = val) // Perbarui nilai countdown
    );
  }
}
