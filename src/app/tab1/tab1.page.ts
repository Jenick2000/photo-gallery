import { Component  } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { ActionSheetController } from '@ionic/angular';
import { ToastController, AlertController   } from '@ionic/angular';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  data = {
    text: null,
    time: 'now'
  };
  constructor(public photoService: PhotoService,
              public toastController: ToastController,
              public actionSheetController: ActionSheetController,
              public alertController: AlertController) { }
  techs = [
    {
      'title': 'Angular',
      'icon': 'angular',
      'description': 'A powerful Javascript framework for building single page apps. Angular is open source, and maintained by Google.',
      'color': '#E63135'
    },
    {
      'title': 'CSS3',
      'icon': 'css3',
      'description': 'The latest version of cascading stylesheets - the styling language of the web!',
      'color': '#0CA9EA'
    },
    {
      'title': 'HTML5',
      'icon': 'html5',
      'description': 'The latest version of the web\'s markup language.',
      'color': '#F46529'
    },
    {
      'title': 'JavaScript',
      'icon': 'javascript',
      'description': 'One of the most popular programming languages on the Web!',
      'color': '#FFD439'
    },
    {
      'title': 'Sass',
      'icon': 'sass',
      'description': 'Syntactically Awesome Stylesheets - a mature, stable, and powerful professional grade CSS extension.',
      'color': '#CE6296'
    },
    {
      'title': 'NodeJS',
      'icon': 'nodejs',
      'description': 'An open-source, cross-platform runtime environment for developing server-side Web applications.',
      'color': '#78BD43'
    },
    {
      'title': 'Python',
      'icon': 'python',
      'description': 'A clear and powerful object-oriented programming language!',
      'color': '#3575AC'
    },
    {
      'title': 'Markdown',
      'icon': 'markdown',
      'description': 'A super simple way to add formatting like headers, bold, bulleted lists, and so on to plain text.',
      'color': '#412159'
    },
    {
      'title': 'Tux',
      'icon': 'tux',
      'description': 'The official mascot of the Linux kernel!',
      'color': '#000'
    },
  ];
  moreMovies = [
    { title: 'The Good, the Bad and the Ugly (1966)', selected: true },
    { title: 'Fight Club (1999)', selected: false },
    { title: 'The Lord of the Rings: The Fellowship of the Ring (2001)', selected: true },
    { title: 'Forrest Gump (1994)', selected: false },
    { title: 'Star Wars: Episode V - The Empire Strikes Back (1980)', selected: true },
    { title: 'Inception (2010)', selected: true },
    { title: 'The Lord of the Rings: The Two Towers (2002)', selected: false },
    { title: 'One Flew Over the Cuckoo\'s Nest (1975)', selected: false }
];
multilineList = [{
  title: 'Electric Smartscooter',
  text: 'Gogoro Smartscooter is world’s first connected two-wheeled electric vehicle.'
}, {
  title: 'The Solar Bike',
  text: 'An electric bike that incorporates solar panels and producing enough energy to use it 30 km a day'
}, {
  title: 'Smallest Quadricopter',
  text: 'The Dutch gadget-manufacturer TRNDlabs reveals the smallest quadricopter of the world'
}, {
  title: 'Glow Headphones',
  text: 'Discover the world’s first laser headphones that pulse to the music'
}];

customList = [{
  title: 'The Intouchables (2011)',
  rate: 8.5
}, {
  title: 'The Shawshank Redemption(1994)',
  rate: 9.2
}, {
  title: 'Fight Club(1999)',
  rate: 8.8
}, {
  title: 'Inception(2010)',
  rate: 8.7
}];

cardList = [{
  title: 'Netflix',
  text: 'Sherlock Series 3 is now avalable on Netflix',
  img: 'https://img.mobiscroll.com/demos/netflix.png'
}, {
  title: 'Angry birds',
  text: 'Dont forget your daily Arena entry.',
  img: 'https://img.mobiscroll.com/demos/angrybirds.png'
}, {
  title: 'Candycam',
  text: 'A new update is available!',
  img: 'https://img.mobiscroll.com/demos/candycam.png'
}];
movies = [{
  imgsrc: 'https://img.mobiscroll.com/demos/Requiem_for_a_Dream.png',
  title: 'Requiem for a Dream',
  director: 'Darren Aronofsky'
}, {
  imgsrc: 'https://img.mobiscroll.com/demos/The_Dark_Knight.png',
  title: 'The Dark Knight',
  director: 'Christopher Nolan'
}, {
  imgsrc: 'https://img.mobiscroll.com/demos/Despicable_Me.png',
  title: 'Despicable Me',
  director: 'Pierre Coffin and Chris Renaud'
}, {
  imgsrc: 'https://img.mobiscroll.com/demos/Mr_Nobody.png',
  title: 'Mr. Nobody',
  director: 'Jaco Van Dormael'
}];

icons = [{
  icon: 'star',
  name: 'Edit profile'
}, {
  icon: 'cog',
  name: 'Settings'
}, {
  icon: 'heart',
  name: 'Rate'
}, {
  icon: 'send',
  name: 'Tell a friend'
}];


users = [{
  imgsrc: 'https://img.mobiscroll.com/demos/m1.png',
  user: 'Barry Lyon',
  phone: '(202) 555-0193'
}, {
  imgsrc: 'https://img.mobiscroll.com/demos/f1.png',
  user: 'Hortense Tinker',
  phone: '(202) 555-0127'
}, {
  imgsrc: 'https://img.mobiscroll.com/demos/m2.png',
  user: 'Carl Hambledon',
  phone: '(202) 555-0147'
}, {
  imgsrc: 'https://img.mobiscroll.com/demos/f2.png',
  user: 'Arlene Sharman',
  phone: '(202) 555-0190'
}];
names = [{
  header: 'A',
  items: [{
      name: 'Audie Pennington'
  }, {
      name: 'Audrea Delaughter'
  }, {
      name: 'Augustine Brink'
  }, {
      name: 'Aurelio Deveau'
  }, {
      name: 'Aurora Marston'
  }]
}, {
  header: 'B',
  items: [{
      name: 'Bobby Weisman'
  }, {
      name: 'Bobbye Clapp'
  }, {
      name: 'Bobette Boyland'
  }, {
      name: 'Boris Latta'
  }, {
      name: 'Boyce Haller'
  }]
} // Showing partial data. Download full source.
];
todo = [{
  text: 'Check Mobiscroll demos',
  time: '15jh 24k'
},
{
  text: 'Feed the pets',
  time: ''
},
{
  text: 'Send an invitation email to Emily',
  time: ''
},
{
  text: 'Watch the new Arrow episode',
  time: ''
},
{
  text: 'Wash the dishes',
  time: ''
}
];
  addTodos() {
    this.todo.push(this.data);
  }
  deleteTodos(i) {
    this.todo.splice(i, 1);
  }
 async updateTodos(i) {
    const alert = await this.alertController.create({
      header: 'Update todos',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          value: this.todo[i].text,
          placeholder: 'enter title todo'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Update',
          handler: (data) => {
            this.todo[i].text = data.name1;
          }
        }
      ]
    });

    await alert.present();
  }
  async thongbaoxoa() {
    const toast = await this.toastController.create({
      message: 'Your have been deleted.',
      duration: 2000
    });
    toast.present();
  }
  async presentActionSheet(i) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
       this.techs.splice(i, 1);
       this.thongbaoxoa();
        }
      }, {
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Play (open modal)',
        icon: 'arrow-dropright-circle',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Add todos',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'enter new todo'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            this.data.text = data.name1;
            this.addTodos();
          }
        }
      ]
    });

    await alert.present();
  }
  doReorder(ev: any) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete();
  }
}
