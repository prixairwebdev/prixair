import { postgresAdapter } from "@payloadcms/db-postgres";
import { s3Storage } from '@payloadcms/storage-s3';
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Categories } from "./collections/Categories.ts";
import { Products } from "./collections/Products.ts";
import { FlashSales } from "./collections/FlashSales.ts";
import { Addresses } from "./collections/Addresses.ts";
import { Users } from "./collections/Users.ts";
import { Media } from "./collections/Media.ts";
import { Orders } from "./collections/Orders.ts";

const dirname = path.resolve(process.cwd());

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Categories, Products, FlashSales, Orders, Addresses],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION || 'us-east-1',
        endpoint: process.env.S3_ENDPOINT || '',
        forcePathStyle: true,
      },
    }),
  ],
});
