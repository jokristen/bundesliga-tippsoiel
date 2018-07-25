import { Component, OnInit} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';

interface Matchday {
	money: number;
	points: number;
	position: string;
	prev_position: string;
}

interface User {
	login: string;
	password: string;
	name: string;
	points: number;
	money: number;
	matchday: Matchday;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
	title = 'app';

	userCollection: AngularFirestoreCollection<User>;
	users: Observable<User[]>;

	constructor(private afs: AngularFirestore){

	}

	ngOnInit(){
		this.userCollection = this.afs.collection('season/2018/users', ref => {
			return ref.orderBy('points');
		});
		this.users = this.userCollection.valueChanges();
	}

	ngOnDestroy() {

	}

}
