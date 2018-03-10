import { Component, OnInit } from "@angular/core";
import { CommonModule, NgForOf } from "@angular/common";
import { ArticleService } from "../article.service";
import { Article } from "../article";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  articles: Array<Article>;

  constructor(private _articlesService: ArticleService) {}

  ngOnInit() {
    this._articlesService.getArticles().subscribe(res => (this.articles = res));
  }
}
