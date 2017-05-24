import Rx from 'rxjs/Rx';
import JQuery from 'jquery';
 
 
 
const searchBox = document.getElementById('search');
//Create an observable using fromEvent operator and passing target element and type of event to watch
const inputStream = Rx.Observable.fromEvent(searchBox,'keyup');
 
/*
Subscribe to inputStream observable and in our subscribe callback, call 
searchItunes function and pass it data returned by our observable
*/
inputStream.subscribe(e => {
    searchItunes(e.target.value);
});
 
function searchItunes(Search){
     
     
    const url = window.encodeURI('https://itunes.apple.com/search?term='+Search+'&entity=song&limit=5');
 
    //create a promise
    const promise = JQuery.ajax({
     url:  url,
     dataType:"jsonp"
    });
    //promise successfully returned data from itunes
    promise.done( data => {
        return data.results;
    });
    //some error occured 
    promise.fail( error => {
        console.log("error return :"+ error);
    });
    
 
    //create observable from promise 
    const itunes = Rx.Observable.fromPromise(promise);
     
    /*
    subscribe to our observable and on every object returned 
    extract artist name and track the name and add them at the 
    beginning of a list using jquery prependTO 
    */
    itunes.subscribe( x => {
        x.results.forEach(y => {
          JQuery("<li><strong>"+y.artistName+" : </strong> "+y.trackCensoredName+"</li>").prependTo('#list');
        });
    })
}
