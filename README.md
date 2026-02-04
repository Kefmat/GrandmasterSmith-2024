<img width="1887" height="799" alt="e607cf13fd3a52d0541ecdd477c21b55" src="https://github.com/user-attachments/assets/cb453118-5cb0-400a-9f01-5621647295b9" />

# [Chess Network]("undefined")![Uploading e607cf13fd3a52d0541ecdd477c21b55.png…]()

![Uploading e607cf13fd3a52d0541ecdd477c21b55.png…]()

![version](https://img.shields.io/badge/version-1.0.0-blue.svg) [![GitHub issues open](https://img.shields.io/badge/Issues-1-red)] [![GitHub issues closed](https://img.shields.io/badge/Issues_solved-0-green)]
[![Netlify Status](https://api.netlify.com/api/v1/badges/8bf90cff-c26f-4a5a-969d-a8046534b6ae/deploy-status)](https://app.netlify.com/sites/grandmasterssmith/deploys)

Vi har initiert et prosjekt for å skape et sosialt nettverk online for sjakkspillere. Både proffer og nybegynnere får delta.

Fåreløbig har vi valgt å basere oss på visse rammeverk. Vi begynte med å bruke MERN-stack og herunder derfor react, node.js, express og mongoDB.
Nå i senere versjoner har vi gått over til next.js med nextUI, MUI, chakra-ui og Tailwind css.

## Flerspråklighet![Uploading e607cf13fd3a52d0541ecdd477c21b55.png…]()


Vi har nå lagt tilrette for en I18 som wrapper rundt appen og gir appen en ny samenheng basert på språk.
Spåkene vi har nå:

- Norsk Bokmål
- Engelsk
- Russisk

## Innholds Fortegnelse

  - [Chess Network](#chess-network)
  - [Flerspråklighet](#flerspråklighet)
  - [Innholds Fortegnelse](#innholds-fortegnelse)
  - [Versions](#versions)
  - [Demo](#demo)
  - [Terminal Commands](#terminal-commands)
  - [Documentation](#documentation)
  - [Browser Support](#browser-support)
  - [Resources](#resources)
  - [Reporting Issues](#reporting-issues)
  - [Technical Support or Questions](#technical-support-or-questions)
  - [Licensing](#licensing)
  - [Copyright 2023/2024](#copyright-20232024)
  - [WORK BREAKDOWN STRUCTURE](#work-breakdown-structure)

<img width="1888" height="901" alt="847dce887836df08423f65bdff7eb0db" src="https://github.com/user-attachments/assets/b97c9b67-4746-4d25-9727-04a7d1884657" />

## Versions

| next.js version |
| --------------- |

## Demo

[Demo on vercel](https://app-2000-gruppe04.vercel.app/)

- siste dev/prod versjon av siden.

<img width="1898" height="908" alt="75e2ce564478165d4a74477a40acb6d6" src="https://github.com/user-attachments/assets/a52ba6b9-705b-432b-a3b8-c2099183987c" />

## Terminal Commands

1. Download and Install NodeJs LTS version from [NodeJs Official Page](https://nodejs.org/en/download/).
2. Navigate to the root ./ directory of the product, edit .env and run

```bash
Rename .env.example to .env.local
```

```bash
Fill out .env.local with your own secret keys!
```

```bash
npm install
```

to install our local dependencies.

```bash
npm run build:css
```

To build the css.

```bash
npm run dev
```

To run local development version. NB, the server require https locally, so use ngrok to serve it !
The next.js app also requires a socket server, that should be provided on request!

```bash
npm run lint
```

To lint the project

```bash
npm run build
```

To build the app for production

```bash
npm run build:docs
```

To build the docs at /docs for updates in the docs based on new functions, classes, interface and comments.





## Documentation

The documentation is hosted on the demo site
[Documentation](https://app-2000-gruppe04.vercel.app/docs)

## Browser Support

At present, we officially aim to support the last five versions of all browsers on all screens:
But this app is only for chromium and above 14" laptops and computers, not tested on tv's or canvas or mobile or pad.

## Resources

- Documentaion
- License

## Reporting Issues

We use GitHub Issues as the official bug tracker for the Chess network. Here are some advices for our users that want to report an issue:

1. Make sure that you are using the latest version of the Chess Network. Check the CHANGELOG from your dashboard on our [website](https://app-2000-gruppe04.vercel.app/docs).
2. Providing us reproducible steps for the issue will shorten the time it takes for it to be fixed.
3. Some issues may be browser specific, so specifying in what browser you encountered the issue might help.


## Licensing

- Free to use, this was a school project

## Copyright 2023/2024

Erik-Tobias Huseby Ellefsen Studentnummer:250722 <br>
Borgar Flaen Stensrud Studentnummer:129478 <br>
Kevin Tomasz Matarewicz Studentnummer:250030 <br>
Abdallah Amidu Ndikumana Studentnummer:256047 <br>
Hussein Abdul-Ameer Studentnummer:256037

##### WORK BREAKDOWN STRUCTURE

[Se på WBS](https://sharing.clickup.com/9015136740/b/h/8cng4f4-735/41478e8cb84c3c3)
