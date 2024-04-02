#!/usr/bin/env bash

if [ "$#" != "1" ] ; then
    echo "Usage: $0 [minor | patch]"
    exit -1
fi

if [[ $1 != 'minor'  && $1 != 'patch' ]] ; then
    echo "Usage: $0 [minor | patch]"
    exit -1
fi


# build and commit it
npm run build
git add .
git commit -m 'build application release'
git push origin master --tags

# version the code
version=$(npm version --no-git-tag-version $1)
git tag $version
git commit -a -m "tag and bump version"

# push it to github to trigger container builds
git push origin master --tags