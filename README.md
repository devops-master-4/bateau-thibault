# Backend-Thibault
<h1 align="center">
  <br>
  <a href="#"><img src="https://i.imgur.com/rBQDyPj.png" alt="Bateau thibault" width="200"></a>
  <br>
  Le Bateau Thibault 
  <br>
</h1>

<h4 align="center">Le Bateau de <a href="https://github.com/WAMANR/Angular-Ionic---Bateau-Thibault" target="_blank">Thibault</a>.</h4>

<p align="center">
  <a href="https://badge.fury.io/js/electron-markdownify">
    <img src="https://badge.fury.io/js/electron-markdownify.svg"
         alt="Gitter">
  </a>
  <a href="https://saythanks.io/to/bullredeyes@gmail.com">
      <img src="https://img.shields.io/badge/SayThanks.io-%E2%98%BC-1EAEDB.svg">
  </a>
  <a href="https://www.paypal.me/AmitMerchant">
    <img src="https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&amp;style=flat">
  </a>
</p>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#download">Download</a> •
  <a href="#credits">Credits</a> •
  <a href="#related">Related</a> •
  <a href="#license">License</a>
</p>

![screenshot](https://i.imgur.com/rITyPN8.png)

## Key Features

- Add to basket
- Supports multiple platforms
  - Windows
  - Linux
  - macOS
  - android
  - ios
- Supports multiple languages
- stock management
- Responsive design

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/devops-master-4/bateau-thibault.git

# Go into the repository
$ cd  backend-thibault

# Install dependencies for the frontend
$ cd client && npm install

# Install dependencies for the backend
$ cd ../server 
$ pip install -r requirements.txt

# change venv path
$ python -m venv venv
$ source venv/bin/activate

# How to run the backend
$ cd TME_webAPI_DBO/mySearchEngine/ 

# migrate database
$ python manage.py makemigrations
$ python manage.py migrate

# Run the app
$ python manage.py runserver


# for a better security, you can change the secret key in the settings.py file (optional)
$ cd .. && cd account

$ vim settings.py

# change the secret key
```

> **Note**
> If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.
> You also need to install [Python](https://www.python.org/downloads/) and [pip](https://pip.pypa.io/en/stable/installing/)
> You also need to install (pip) [Django](https://www.djangoproject.com/download/) and [Django Rest Framework](https://www.django-rest-framework.org/#installation)

## Download

You can run the app from the source code or download the latest version for your platform:
 

## Credits

This software uses the following open source packages:

- [Node.js](https://nodejs.org/)
- [Angular](https://angular.io/)
- [Pip](https://pip.pypa.io/en/stable/)
- [Django](https://www.djangoproject.com/)
- [Django Rest Framework](https://www.django-rest-framework.org/)



## Bug or lack of features

<a href="https://github.com/devops-master-4/bateau-thibault/issues" target="_blank"><img src="https://github.githubassets.com/images/modules/logos_page/Octocat.png" alt="Buy Me A Coffee"  height="150px" width="150px"></a>


## Developers

<a href="https://github.com/WAMANR">@WAMANR</a>
<a href="https://github.com/luc-lecoutour">luc-lecoutour</a>
<a href="https://github.com/Pendelait">@Pendelait</a>
<a href="https://github.com/meteor314">@meteor314</a>

## License

    DISCLAIMER

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
