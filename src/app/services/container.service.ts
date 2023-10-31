import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Container } from '../container.interface';

@Injectable({
  providedIn: 'root'
})
export class ContainerService {

  constructor(private firestore: Firestore) { }

  addContainer(container: Container){
    const containerRef = collection(this.firestore, 'containers');
    return addDoc(containerRef, container);
  } 

}
