#! /bin/bash

# create backup of previous schema file
mkdir -p ../prisma/backup
cp ../prisma/schema.prisma ../prisma/backup/schema.bkp

# create new schema.prisma
rm -rf ../prisma/schema.prisma
touch ../prisma/schema.prisma

# append generator and datasource block
echo 'generator client {' >> ../prisma/schema.prisma
echo '  provider = "prisma-client-js"' >> ../prisma/schema.prisma
echo '}' >> ../prisma/schema.prisma
echo -e >> ../prisma/schema.prisma
echo 'datasource db {' >> ../prisma/schema.prisma
echo '  provider = "postgresql"' >> ../prisma/schema.prisma
echo '  url      = env("DATABASE_URL")' >> ../prisma/schema.prisma
echo '}' >> ../prisma/schema.prisma
echo -e >> ../prisma/schema.prisma

# append schema files
for file in ../prisma/schema/*.schema; do
  echo "//--------------------------------------------------------------------" >> ../prisma/schema.prisma;
  echo "//##### ${file}                                                       " >> ../prisma/schema.prisma;
  echo "//--------------------------------------------------------------------" >> ../prisma/schema.prisma;
  echo -e >> ../prisma/schema.prisma
  cat $file >> ../prisma/schema.prisma;
  echo -e >> ../prisma/schema.prisma
  echo -e >> ../prisma/schema.prisma
done

