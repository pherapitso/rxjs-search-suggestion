import Rx from 'rxjs/Rx';
import JQuery from 'jquery';
 
 
 
const searchBox = document.getElementById('search');
const inputStream = Rx.Observable.fromEvent(searchBox,'keyup');
 
inputStream.subscribe(e => {
    searchItunes(e.target.value);
});
 
function searchItunes(Search){
 
    const url = window.encodeURI('https://itunes.apple.com/search?term='+Search+'&entity=song&limit=5');
 
    const promise = JQuery.ajax({
     url:  url,
     dataType:"jsonp"
    });
 
    promise.done( data => {
        return data.results;
    });
    promise.fail( error => {
        console.log("error return :"+ error);
    });
    promise.always( dataa => {
      return dataa;
    });
 
    const itunes = Rx.Observable.fromPromise(promise);
 
    itunes.subscribe( x => {
        x.results.forEach(y => {
          JQuery("<li><strong>"+y.artistName+" : </strong> "+y.trackCensoredName+"</li>").prependTo('#list');
        });
    })
}
