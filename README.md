<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="hhttps://github.com/TringuG/auth-modal">
    <img src="images/logo.png" alt="Logo" width="445" height="180">
  </a>

<h3 align="center">Auth Modal</h3>

  <p align="center">
    TODO
    <br />
    <a href="https://github.com/TringuG/auth-modal"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://auth.tringug.xyz/">View Demo</a>
    ·
    <a href="https://github.com/TringuG/auth-modal/issues">Report Bug</a>
    ·
    <a href="https://github.com/TringuG/auth-modal/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#screens-of-project">Screens</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

### Screens of project

<details>
<summary>Screens</summary>
<ol>

![Open SIGIN menu][a1]
![SigIn][a2]
![MagicLink][a3]
![SignUp][a4]
![MyAccount][a5]

</ol>
</details>


<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [Alpine.js](https://alpinejs.dev/)
* [TailwindCSS](https://tailwindcss.com/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started


### Setup
#### First you need is load Alpine.js and Tailwindcss

```bash
<script src="https://unpkg.com/alpinejs" defer></script>
```

```bash
<script src="https://cdn.tailwindcss.com"></script>
```

#### Than you must add Auth Modal Library

```bash 
<script src="https://cdn.jsdelivr.net/gh/tringug/auth-modal/src/auth-modal.js" defer></script> 
```

#### And you must add Adapter SDK (You can use what you won´t)

For example we use <a href="https://appwrite.io/">Appwrite</a>

```bash
<script src="https://cdn.jsdelivr.net/npm/appwrite@7.0.0"></script>
```

### Config

#### When you finish Setup you need configure auth modal

```bash
   <script>
      window.authModal = {
        adapter: "appwrite",
        config: {
          endpoint: "https://demo.appwrite.io/v1",
          projectId: "authModal",
          oauthSuccessUrl: window.location.origin + "/examples/appwrite.html",
          oauthErrorUrl: window.location.origin + "/examples/appwrite.html",
          magicUrlRedirect: window.location.origin + "/examples/appwrite.html",
        },
        oauths: ["discord", "google"],
      };
    </script>
```
### Example button for Auth Modal

```bash
  <div
      x-data
      class="to-auth-gray-900 absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black"
    >
      <button
        x-on:click="$store.authModal.open()"
        class="rounded-lg bg-white hover:bg-auth-gray-100 text-auth-gray-800 px-12 py-3 font-bold text-lg"
      >
        Open Auth Modal
      </button>
    </div>
```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage



<p align="right">(<a href="#top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License. See <code>LICENSE</code> for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Richard Nálepka - [TringuG](https://github.com/TringuG) - Discord: <code>TringuG#1484</code>
Matej Bačo - [Meldiron](https://github.com/Meldiron) - Discord: <code>Meldiron#1111</code>

Project Link: [https://github.com/TringuG/auth-modal](https://github.com/TringuG/auth-modal)


<p align="right">(<a href="#top">back to top</a>)</p>

[a1]: images/A-1.png
[a2]: images/A-2.png
[a3]: images/A-3.png
[a4]: images/A-4.png
[a5]: images/A-5.png
