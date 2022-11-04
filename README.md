# jAccount Captcha Solver (WebExtension)

A browser extension which solves jAccount captcha automatically.

<p align="center">
  <a href="https://chrome.google.com/webstore/detail/ghjnmfipajgiookibellpgccanleebpp">
    <img src="docs/chrome-webstore.png" alt="Chrome Web Store"></a>
  <a href="https://addons.mozilla.org/en-US/firefox/addon/jaccount-captcha-solver">
    <img src="docs/firefox-addons.png" alt="Firefox add-ons"></a>
  <a href="https://microsoftedge.microsoft.com/addons/detail/ojimijockcalehahhfafehfiilncocel">
    <img src="docs/edge-extension.png" alt="Microsoft Store"></a>
</p>

## Get Started

### Build the extension

You need to have 'pnpm' installed.

``` shell script
$ pnpm
$ pnpm build
$ pnpm package
```

Your unsigned extension is ready in 'dist' directory.

### Test your build

You may sideload the extension you just built, and go to [jAccount login page](https://i.sjtu.edu.cn/jaccountlogin).

If your build works, you will see the captcha filled by this extension automatically.

## License

This project is licensed under GNU General Public License v3.0 - see the [LICENSE.md](LICENSE.md) file for details.

<p align="center">&mdash;💖&mdash;</p>
<p align="center"><i>Built with love by LightQuantum</i></p>
