cd client
grunt build --force
git checkout gh-pages
cd ..
mv client/dist/* .
git add .
git commit -am 'update dist'
git push
git checkout master
