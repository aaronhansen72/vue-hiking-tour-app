#!/bin/bash
rsync -av  --exclude 'contents' --exclude 'data.json' -e "ssh -i ~/.ssh/id_rsa_ionos" dist/ p6746745@home17592662.1and1-data.host:wandern.cube-online.de/