import { Component, OnInit, ɵConsole } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  res: any;
  constructor(private http : HttpClient) { }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }

    function showPosition(position) {
      const latlon = position.coords.latitude + "," + position.coords.longitude;    
      localStorage.setItem('data',latlon);
    }  
    this.location();
    setTimeout(()=>{
      this.ngOnInit();
    },5000);
  }

  location(){
    const url = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyDm9MO7inWEy-_k6hgApQgCToE1D-AldfY&q='+localStorage.getItem('data') ;
    // console.log(url);
    return url;
  }

  search(){
    let x = (<HTMLInputElement>(document.getElementById('search'))).value
    console.log(x);
    
    const headers = new HttpHeaders({
          'Content-Type': 'Application/json',     
    })  
    
    return this.http.get('https://us1.locationiq.com/v1/search.php?key=3199bc66a77470&q='+x+'&format=json', {headers:headers}).subscribe((suc) => {
        this.res=suc;
        console.log(this.res);
        const data = this.res.lat + ',' + this.res.lon;
        console.log(data);
        localStorage.setItem('data',data);
        this.location();

    })
  }
    

    
      // const apiKey = 'AIzaSyDm9MO7inWEy-_k6hgApQgCToE1D-AldfY'
      // console.log(apiKey);
    
   
  


  


}
