## Webpack Notes

Împreună cu package.json construiește un graph de dependințe pentru fișierele json + face asset management

### Module

rules - keyword

### Asset modules - images/fonts/plain text files

type - keyword

4 tipuri de asset modules

- asset/resource - se va crea un fișier separat pentru acel asset (se face un request) -> bun pentru fișiere mari
- asset/inline - se va transforma asset-ul într-un base64 url -> bun pentru fișiere mici
- asset - o combinație intre cele 2 de mai sus (bazat pe mărimea fișierelor > 8kb - asset/resource; < 8kb - asset/inline
- asset/source - introduce conținutul unui fișier așa cum este el in sursa

### Loaders - css/sass/less/handlebars/xml

use - keyword

List of loaders
Loaders order matter. Webpack reads the from right to left

Use the latest JS features with Babel (JS Compiler). Transforms new JS syntax to old one which all browsers can read

### Plugins

plugin - keyword

Plugins add functionality to the web pack itself. They are additional JS libraries that do everything that loaders cannot do;
It modifies how the bundles themselves are creating
