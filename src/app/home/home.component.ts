import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { throwError } from 'rxjs';
import { MenuService } from '../services/menu.service';
import { DomSanitizer } from '@angular/platform-browser';
import { OpenLinkService } from '../services/open-link.service';
import { DictionaryService } from '../services/dictionary.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../app.component.scss', '../shared-styles/header.scss', '../shared-styles/language-option.scss']
})
export class HomeComponent implements OnInit {
  indirectScroll = '';

  // stick;

  sending = false
  displayForm = false
  submitting = false
  error = {}
  submitted = false

  get firstName() { return this.contactService.form.get('firstName'); }
  get lastName() { return this.contactService.form.get('lastName'); }
  get email() { return this.contactService.form.get('email'); }
  get phone() { return this.contactService.form.get('phone'); }
  get position() { return this.contactService.form.get('position'); }
  get company() { return this.contactService.form.get('company'); }

  constructor(
    private route: ActivatedRoute,
    public dictionary: DictionaryService,
    public openLink: OpenLinkService,
    public sanitizer: DomSanitizer,
    public menuService: MenuService,
    public contactService: ContactService,
    private fb: FormBuilder,
    private router: Router,
    private firestore: AngularFirestore,
  ) {
  }

  //errors
  handleError(error: { error: { message: any; }; status: any; message: any; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Sorry! Image not exist ,Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  onSubmit() {
    this.submitting = true;
    console.log("submitting");
    if (this.contactService.form.valid) {
      this.sending = true;
      let data = this.contactService.form.value;
      let ref = this.firestore.collection('requests').add(data)
        .then(ref => this.contactService.form.patchValue({ 'id': ref.id }))
        .then(res => this.submitting = false).then(() => this.submitted = true)
    } else {
    }

  }

  onReset() {
    console.log("resetting")
    this.contactService.form.reset()
    this.displayForm = false
  }

  //scroll to specific view by click
  scroll(el: HTMLElement) {
    //scroll
    el.scrollIntoView({ behavior: "smooth" });

    //close the menu
    var x = document.getElementById("myTopNav");
    if (x != null) {
      if (x.className === "nav-list responsive") {
        x.className = "nav-list";
      }
    }
    else {
      throwError('Cannot get element myTopNav');
    }

    var y = document.getElementById("myTopMenu");

    if (y != null) {
      if (y.className === "menu-icons open responsive") {
        y.className = "menu-icons open";
      }
    }
    else {
      throwError('Cannot get element myTopMenu');
    }
  }

  testimonials: any = [
    {
      src: 'https://www.youtube.com/embed/J-jD3Mney08',
      feedback: "testi1." + "feedback",
      title: "testi1." + "title",
      author: "testi1." + "author",
    }, {
      src: 'https://www.youtube.com/embed/cASd5EnXOCg',
      feedback: "testi2." + "feedback",
      title: "testi2." + "title",
      author: "testi2." + "author",

    }, {
      src: 'https://www.youtube.com/embed/nYrUzYbyOX8',
      feedback: "testi3." + "feedback",
      title: "testi3." + "title",
      author: "testi3." + "author",

    },
  ];
  index: number = 0;
  testimonial: any = this.testimonials[this.index];
  // jsVideoSrc: HTMLEmbedElement;
  indicates?: NodeListOf<HTMLDivElement>;

  ngOnInit(): void {
    window.scroll(0, 0)
    //displaying contact form
    if (this.indirectScroll === 'displayForm') {
      this.displayForm = true
    } else {
      let element = document.getElementById(this.indirectScroll)  //get HTML element
      element?.scrollIntoView({ behavior: 'smooth' });
    }


    // this.jsVideoSrc = document.querySelector('#js-video');
    this.indicates = document.querySelectorAll('.indicate');
    this.indicates[this.index].classList.add('active');
  }

  changeTestimonialVideo(index: number): void {
    this.testimonial = this.testimonials[index];
    console.log(typeof (this.testimonial.src));
    this.indicates![this.index].classList.remove('active');
    this.indicates![index].classList.add('active');
    this.index = index;
    // this.jsVideoSrc.
  }
}
