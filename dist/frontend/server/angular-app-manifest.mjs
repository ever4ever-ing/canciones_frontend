
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/canciones",
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/canciones"
  },
  {
    "renderMode": 1,
    "route": "/canciones/agregar"
  },
  {
    "renderMode": 1,
    "route": "/canciones/*"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 749, hash: '94586825a6bc40e97bd43b9c7d530ca841b0dec9ee14c38a1de3d484cc7896eb', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 946, hash: '2a85606cb92ac2ce9bcc94f8b11bc1d84e7554b60104d17e7b6120076924809f', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'canciones/index.html': {size: 3964, hash: 'b764c704e5144e1f88c597f205e3dbb3a53e54bfb8245b9f65f1e7f44f77eb56', text: () => import('./assets-chunks/canciones_index_html.mjs').then(m => m.default)},
    'styles-BOYIKMD5.css': {size: 191, hash: 'JspF7IU6mDE', text: () => import('./assets-chunks/styles-BOYIKMD5_css.mjs').then(m => m.default)}
  },
};
