import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistService } from '../artist.service';

interface IComment {
  id: string;
  name: string;
  body: string;
}

interface IPost {
  id: string;
  body: string;
  title: string;
  comments: IComment[];
}
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts: any[]=[];
  constructor(private route: ActivatedRoute, private artistService: ArtistService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let userID=+params.get('userId');
      console.log('get posts for user*************',userID);
      this.posts=[];
      this.artistService.getPosts(userID)
    .subscribe(posts => {
      
      for(let p of posts) {
        let post:IPost={
          id : undefined,
          body: undefined,
          title: undefined,
          comments: []
        };
        post.id=p.id;
        post.title=p.title;
        post.body=p.body;
        console.log('inside comments for post**********************',p.id);
        this.artistService.getComments(p.id).subscribe(comments =>{
          
          for(let c of comments) {
            let comment:IComment={
              id : undefined,
              body: undefined,
              name: undefined,
            };
            comment.id=c.id;
            comment.name=c.name;
            comment.body=c.body;
            post.comments.push(comment);
          }
          this.posts.push(post);
        });
        //console.log('&&&&&&&&&&&&&&',this.posts);
      }
    });
    });
  }

}
