
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
    'index.csr.html': {size: 749, hash: '41dc9189ce538b631af51d8cda0f9f623575003c3d34d67c27a9fc64e1c7a312', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 946, hash: '080cf7bb76b01c04d600b124ca597d6b3747fc266232d27978b60db1832d8136', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'canciones/index.html': {size: 3964, hash: '2d1e1be76ff80043d44fee94efdc00874974a3550cee9f969a012766ff63f3f1', text: () => import('./assets-chunks/canciones_index_html.mjs').then(m => m.default)},
    'styles-BOYIKMD5.css': {size: 191, hash: 'JspF7IU6mDE', text: () => import('./assets-chunks/styles-BOYIKMD5_css.mjs').then(m => m.default)}
  },
};
