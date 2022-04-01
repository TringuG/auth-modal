#!/bin/sh

cp dist/auth-modal.js examples/auth-modal.js
mv examples/appwrite.html examples/index.html
sed -i 's/<script src="\.\.\/dist\/auth-modal\.js" defer><\/script>/<script src="auth-modal.js" defer><\/script>/g' examples/index.html
sed -i 's/\/examples\/appwrite\.html/\//g' examples/index.html