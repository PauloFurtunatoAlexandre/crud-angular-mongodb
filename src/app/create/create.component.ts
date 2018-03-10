import { Component, OnInit } from '@angular/core';
import { Article } from './../article';
import { ArticleService } from '../article.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  article: Article;
  articleForm: FormGroup;
  articles: Array<Article>;

  constructor(
    private _articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute,
    private aR: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this._articleService.getArticles().subscribe(res => (this.articles = res));

    this.aR.params.subscribe(params => {
      if (params['id']) {
        this._articleService.getArticle(
          params['id'].subscribe(res => {
            this.article = res;

            this.articleForm = this.fb.group({
              title: [
                [this.article['title']],
                Validators.compose([
                  Validators.required,
                  Validators.minLength(10),
                  Validators.maxLength(45)
                ])
              ],
              content: [
                this.article['content'],
                Validators.compose([
                  Validators.required,
                  Validators.minLength(10)
                ])
              ]
            });
          })
        );
      } else {
        this.articleForm = this.fb.group({
          title: [
            null,
            Validators.compose([
              Validators.required,
              Validators.minLength(10),
              Validators.maxLength(45)
            ])
          ],
          content: [
            null,
            Validators.compose([Validators.required, Validators.minLength(10)])
          ]
        });
      }
    });
  }

  addArticle(articleId, article: Article) {
    if (articleId !== undefined) {
      this._articleService
        .updateArticle(article, article._id)
        .subscribe(updateArticle => {
          this.router.navigateByUrl('/');
        });
    } else {
      this._articleService.insertArticle(article).subscribe(newArticle => {
        this.articles.push(newArticle);
        this.router.navigateByUrl('/');
      });
    }
  }
}
