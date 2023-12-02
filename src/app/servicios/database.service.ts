import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private firestore: AngularFirestore) { }

  async create(collection: string, dato: unknown){
  return await this.firestore.collection(collection).add(dato)
  } 
  async getAll(collection: string){
    return await this.firestore.collection(collection).snapshotChanges()
  }

  async getById(collection: string, id: string | undefined){
    return await this.firestore.collection(collection).doc(id).get()
  }

  async delete(collection: string, id: string | undefined){
    return await this.firestore.collection(collection).doc(id).delete()
  }
  
  async update(collection: string, id: string | undefined, dato: any){
    return await this.firestore.collection(collection).doc(id).delete()
  }
  
}



