#!/bin/sh

cp src/auth-modal.js examples/auth-modal.js
mv examples/appwrite.html examples/index.html
sed -i 's/<script src="\.\.\/src\/auth-modal\.js" defer><\/script>/<script src="auth-modal.js" defer><\/script>/g' examples/index.html