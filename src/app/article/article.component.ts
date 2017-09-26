import { Component, OnInit } from '@angular/core';
import {ArticleService} from './article.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Article} from './article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})

export class ArticleComponent implements OnInit {

  articles: Array<any>;
  statusCode: number;
  requestProcessing = false;
  articleIdToUpdate = null;
  processValidation = false;
  title = "List Articles";

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.getAllArticles()
  }

  articleForm = new FormGroup({
    //proses validasi
    title: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required)
  });

  preProccessConfiguration(){
    this.statusCode = null;
    this.requestProcessing = true;
  }
  
  //reset button 
  backToCreateArticles(){
    this.articleIdToUpdate = null;
    this.processValidation =false;
    this.articleForm.reset();
  }

  //component menampilkan data
  getAllArticles(){
    this.articleService.getAllArticles()
      .subscribe(
        data => this.articles = data,
        errorCode => this.statusCode = errorCode);
  }

  //component insert data & handling update
  getFormOnSubmit(){
    this.processValidation=true;
    if(this.articleForm.invalid) {
      return;
    }
    this.preProccessConfiguration();
    let title = this.articleForm.get('title').value.trim();
    let category = this.articleForm.get('category').value.trim();
      if(this.articleIdToUpdate === null){
        //insert
        let article = new Article(null, title, category);
        this.articleService.getInsertArticles(article)
          .subscribe(successCode=>
          {
            this.statusCode = successCode;
            this.getAllArticles();
            this.backToCreateArticles();
            alert('data berhasil disimpan !');
          });
      }else{
        //update
        let article = new Article(this.articleIdToUpdate, title, category);
        this.articleService.getInsertArticles(article)
        .subscribe(successCode=>
          {
            this.statusCode=successCode;
            this.getAllArticles();
            this.backToCreateArticles();
            alert('data berhasil diupdate !');
          }
        )
      }
  }

  //component load data edit to field
  getDataArticleById(idarticle: string){
    this.preProccessConfiguration();
    this.articleService.getDataArticleById(idarticle)
      .subscribe(article => {
          this.articleIdToUpdate = article.idarticle;
          this.articleForm.setValue({title: article.title, category: article.category});
          this.processValidation = true;
          this.requestProcessing = false;
      });
  }
  
  //component delete data
  getDeleteArticles(idarticle: string){
    this.preProccessConfiguration();
    this.articleService.getDeleteArticleById(idarticle)
    .subscribe(successCode=>{
      alert('data berhasil dihapus !');
      this.statusCode = successCode;
      this.getAllArticles();
    });
  }

}
