cd client
grunt build --force
git checkout gh-pages
cd ..
foreach i (*) if [ $i != "client" ]; then rm -rf $i; fi; end;
mv -f client/dist/* ./
git add .
git commit -am 'update dist'
git push origin gh-pages
git checkout master
rm -rf components
