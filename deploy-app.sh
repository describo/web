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
git commit -m 'Deploy release'

# version the code
npm version --no-git-tag-version $1

# push it to github to trigger container builds
git push origin master --tags