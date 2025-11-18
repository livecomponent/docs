## LiveComponent Documentation

This repository contains the docsite for [livecomponent.org](https://livecomponent.org). More accurately, it contains a Rails app that uses the [Parklife gem](https://github.com/benpickles/parklife) to produce a bunch of static pages that are then served by GitHub Pages.

### Local Development

1. `bundle install`
2. `npm install`
3. `bin/dev`
4. Visit http://localhost:3000 in your browser
5. Rejoice

### Deploying

1. Run the [parklife workflow](https://github.com/livecomponent/docs/actions/workflows/parklife.yml) in GitHub Actions.

### License

MIT

### Authors

* Cameron C. Dutro ([@camertron](https://github.com/camertron))
