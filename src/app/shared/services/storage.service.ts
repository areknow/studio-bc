import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

const HASH_LENGTH = 64;
const HASH_CHARACTERS = '0123456789abcdefghijklmnopqrstuvwxyz';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  constructor(private angularFireStorage: AngularFireStorage) { }

  async uploadFile(file: File): Promise<string>  {
    const hash = this.generateRandomHash();
    try {
      await this.angularFireStorage.upload(hash, file);
      return hash;
    } catch (error) {
      console.log(error);
    }
  }

  private generateRandomHash(): string {
    let hash = '';
    for (let i = 0; i <= HASH_LENGTH; i++) {
      hash += HASH_CHARACTERS[Math.floor(Math.random() * HASH_CHARACTERS.length)];
    }
    return hash;
  }

}
