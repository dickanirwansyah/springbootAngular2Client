import {Injectable} from '@angular/core';
import {Http, Response, Headers, URLSearchParams, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Article} from './article';
import 'rxjs/add/operator/map';

@Injectable()
export class ArticleService{

    AllArticlesUrl = "http://localhost:8080/api/all-articles";
    URIarticlesUrl = "http://localhost:8080/api/articles";
    URIdeleteArticle = "http://localhost:8080/api/articles/";
    URIgetIdArticle = "http://localhost:8080/api/getarticles/";
    URIinsertArticle = "http://localhost:8080/api/insertarticles";
    URIupdateArticle = "http://localhost:8080/api/updatearticles";
    constructor(private http: Http){ }

    private extractData(res: Response){
        let body = res.json();
        return body;
    }

    private handleError(error: Response | any){
        console.error(error.message || error);
        return Observable.throw(error.status);
    }

    //proses menampilkan list data secara keseluruhan
    getAllArticles(): Observable<Article[]> {
        return this.http.get(this.AllArticlesUrl)
        .map(this.extractData);
    }

    //proses insert data
    getInsertArticles(article: Article):Observable<number>{
        let cpHeaders = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers: cpHeaders});
        return this.http.post(this.URIinsertArticle, article, options)
            .map(success => success.status);
    }

    //proses update data
    getUpdateArticles(article: Article):Observable<number>{
        let cpHeaders = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers: cpHeaders});
        return this.http.put(this.URIupdateArticle, article, options)
            .map(success=> success.status);
    }

    //proses delete data
    getDeleteArticleById(idarticle:string):Observable<number>{
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let cpParams = new URLSearchParams();
        cpParams.set('idarticles', idarticle);
        let options = new RequestOptions({headers : cpHeaders, params: cpParams});
        return this.http.delete(this.URIdeleteArticle+idarticle, options)
        .map(success=>success.status);
    }

    //proses getdata byid
    getDataArticleById(idarticle:string): Observable<Article>{
        let cpHeaders = new Headers({'Content-Type': 'application/json'});
        let cpParams = new URLSearchParams();
        cpParams.set('idarticles', idarticle);
        let options = new RequestOptions({headers: cpHeaders, params: cpParams});
        return this.http.get(this.URIgetIdArticle+idarticle, options)
        .map(this.extractData);
    }
}