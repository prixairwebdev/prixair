import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_roles" AS ENUM('admin', 'user');
  CREATE TYPE "public"."enum_orders_status" AS ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled');
  CREATE TYPE "public"."enum_orders_payment_method" AS ENUM('paypal', 'card', 'paystack', 'whatsapp');
  CREATE TYPE "public"."enum_promotions_type" AS ENUM('percentage', 'fixed');
  CREATE TYPE "public"."enum_promotions_target_type" AS ENUM('global', 'store', 'category', 'product');
  CREATE TYPE "public"."enum_hotels_star_rating" AS ENUM('1', '2', '3', '4', '5');
  CREATE TYPE "public"."enum_rooms_room_type" AS ENUM('standard', 'executive', 'deluxe', 'suite', 'business', 'presidential');
  CREATE TYPE "public"."enum_rooms_bed_type" AS ENUM('single', 'double', 'queen', 'king', 'twin');
  CREATE TABLE "users_roles" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_users_roles",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"phone" varchar,
  	"store_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar,
  	"store_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"price" numeric NOT NULL,
  	"stock" numeric DEFAULT 0,
  	"image_id" integer NOT NULL,
  	"category_id" integer NOT NULL,
  	"store_id" integer NOT NULL,
  	"rating" numeric DEFAULT 0,
  	"review_count" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "flash_sales" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"end_time" timestamp(3) with time zone NOT NULL,
  	"is_active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "flash_sales_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer
  );
  
  CREATE TABLE "orders_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_id" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"price" numeric NOT NULL,
  	"quantity" numeric NOT NULL,
  	"image" varchar
  );
  
  CREATE TABLE "orders" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"store_id" integer NOT NULL,
  	"total" numeric NOT NULL,
  	"status" "enum_orders_status" DEFAULT 'pending' NOT NULL,
  	"payment_method" "enum_orders_payment_method" NOT NULL,
  	"payment_reference" varchar,
  	"shipping_address_name" varchar NOT NULL,
  	"shipping_address_phone" varchar NOT NULL,
  	"shipping_address_street" varchar NOT NULL,
  	"shipping_address_city" varchar NOT NULL,
  	"shipping_address_state" varchar NOT NULL,
  	"shipping_address_zip_code" varchar NOT NULL,
  	"shipping_address_country" varchar NOT NULL,
  	"user_id" integer,
  	"subtotal" numeric,
  	"discount_total" numeric DEFAULT 0,
  	"coupon_code" varchar,
  	"promotion_id" integer,
  	"shipday_id" varchar,
  	"shipday_status" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "addresses" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"user_id" integer NOT NULL,
  	"phone" varchar NOT NULL,
  	"street" varchar NOT NULL,
  	"city" varchar NOT NULL,
  	"state" varchar NOT NULL,
  	"country" varchar NOT NULL,
  	"zip_code" varchar,
  	"is_default" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "stores" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"is_active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "promotions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"code" varchar,
  	"type" "enum_promotions_type" NOT NULL,
  	"value" numeric NOT NULL,
  	"start_date" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone,
  	"usage_limit" numeric,
  	"per_user_limit" numeric,
  	"min_order_value" numeric DEFAULT 0,
  	"target_type" "enum_promotions_target_type" DEFAULT 'global' NOT NULL,
  	"is_active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "promotions_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"stores_id" integer,
  	"categories_id" integer,
  	"products_id" integer
  );
  
  CREATE TABLE "hotels_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "hotels_amenities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"amenity" varchar NOT NULL
  );
  
  CREATE TABLE "hotels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar,
  	"location" varchar NOT NULL,
  	"address" varchar,
  	"city" varchar,
  	"state" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"whatsapp_number" varchar,
  	"email" varchar,
  	"phone" varchar,
  	"star_rating" "enum_hotels_star_rating" DEFAULT '3',
  	"is_active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "rooms_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "rooms_amenities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"amenity" varchar NOT NULL
  );
  
  CREATE TABLE "rooms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"hotel_id" integer NOT NULL,
  	"room_type" "enum_rooms_room_type" NOT NULL,
  	"price_per_night" numeric NOT NULL,
  	"description" varchar,
  	"image_id" integer NOT NULL,
  	"max_guests" numeric DEFAULT 2,
  	"bed_type" "enum_rooms_bed_type",
  	"size" varchar,
  	"rating" numeric DEFAULT 5,
  	"is_available" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"categories_id" integer,
  	"products_id" integer,
  	"flash_sales_id" integer,
  	"orders_id" integer,
  	"addresses_id" integer,
  	"stores_id" integer,
  	"promotions_id" integer,
  	"hotels_id" integer,
  	"rooms_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users" ADD CONSTRAINT "users_store_id_stores_id_fk" FOREIGN KEY ("store_id") REFERENCES "public"."stores"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories" ADD CONSTRAINT "categories_store_id_stores_id_fk" FOREIGN KEY ("store_id") REFERENCES "public"."stores"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_store_id_stores_id_fk" FOREIGN KEY ("store_id") REFERENCES "public"."stores"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "flash_sales_rels" ADD CONSTRAINT "flash_sales_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."flash_sales"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "flash_sales_rels" ADD CONSTRAINT "flash_sales_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "orders_items" ADD CONSTRAINT "orders_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "orders" ADD CONSTRAINT "orders_store_id_stores_id_fk" FOREIGN KEY ("store_id") REFERENCES "public"."stores"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "orders" ADD CONSTRAINT "orders_promotion_id_promotions_id_fk" FOREIGN KEY ("promotion_id") REFERENCES "public"."promotions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "addresses" ADD CONSTRAINT "addresses_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stores" ADD CONSTRAINT "stores_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "promotions_rels" ADD CONSTRAINT "promotions_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."promotions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "promotions_rels" ADD CONSTRAINT "promotions_rels_stores_fk" FOREIGN KEY ("stores_id") REFERENCES "public"."stores"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "promotions_rels" ADD CONSTRAINT "promotions_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "promotions_rels" ADD CONSTRAINT "promotions_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hotels_gallery" ADD CONSTRAINT "hotels_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hotels_gallery" ADD CONSTRAINT "hotels_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hotels_amenities" ADD CONSTRAINT "hotels_amenities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hotels" ADD CONSTRAINT "hotels_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "rooms_gallery" ADD CONSTRAINT "rooms_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "rooms_gallery" ADD CONSTRAINT "rooms_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rooms_amenities" ADD CONSTRAINT "rooms_amenities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rooms" ADD CONSTRAINT "rooms_hotel_id_hotels_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "rooms" ADD CONSTRAINT "rooms_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_flash_sales_fk" FOREIGN KEY ("flash_sales_id") REFERENCES "public"."flash_sales"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_orders_fk" FOREIGN KEY ("orders_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_addresses_fk" FOREIGN KEY ("addresses_id") REFERENCES "public"."addresses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_stores_fk" FOREIGN KEY ("stores_id") REFERENCES "public"."stores"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_promotions_fk" FOREIGN KEY ("promotions_id") REFERENCES "public"."promotions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_hotels_fk" FOREIGN KEY ("hotels_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_rooms_fk" FOREIGN KEY ("rooms_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_roles_order_idx" ON "users_roles" USING btree ("order");
  CREATE INDEX "users_roles_parent_idx" ON "users_roles" USING btree ("parent_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_store_idx" ON "users" USING btree ("store_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "categories_store_idx" ON "categories" USING btree ("store_id");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX "products_image_idx" ON "products" USING btree ("image_id");
  CREATE INDEX "products_category_idx" ON "products" USING btree ("category_id");
  CREATE INDEX "products_store_idx" ON "products" USING btree ("store_id");
  CREATE INDEX "products_updated_at_idx" ON "products" USING btree ("updated_at");
  CREATE INDEX "products_created_at_idx" ON "products" USING btree ("created_at");
  CREATE INDEX "flash_sales_updated_at_idx" ON "flash_sales" USING btree ("updated_at");
  CREATE INDEX "flash_sales_created_at_idx" ON "flash_sales" USING btree ("created_at");
  CREATE INDEX "flash_sales_rels_order_idx" ON "flash_sales_rels" USING btree ("order");
  CREATE INDEX "flash_sales_rels_parent_idx" ON "flash_sales_rels" USING btree ("parent_id");
  CREATE INDEX "flash_sales_rels_path_idx" ON "flash_sales_rels" USING btree ("path");
  CREATE INDEX "flash_sales_rels_products_id_idx" ON "flash_sales_rels" USING btree ("products_id");
  CREATE INDEX "orders_items_order_idx" ON "orders_items" USING btree ("_order");
  CREATE INDEX "orders_items_parent_id_idx" ON "orders_items" USING btree ("_parent_id");
  CREATE INDEX "orders_store_idx" ON "orders" USING btree ("store_id");
  CREATE INDEX "orders_user_idx" ON "orders" USING btree ("user_id");
  CREATE INDEX "orders_promotion_idx" ON "orders" USING btree ("promotion_id");
  CREATE INDEX "orders_updated_at_idx" ON "orders" USING btree ("updated_at");
  CREATE INDEX "orders_created_at_idx" ON "orders" USING btree ("created_at");
  CREATE INDEX "addresses_user_idx" ON "addresses" USING btree ("user_id");
  CREATE INDEX "addresses_updated_at_idx" ON "addresses" USING btree ("updated_at");
  CREATE INDEX "addresses_created_at_idx" ON "addresses" USING btree ("created_at");
  CREATE UNIQUE INDEX "stores_slug_idx" ON "stores" USING btree ("slug");
  CREATE INDEX "stores_image_idx" ON "stores" USING btree ("image_id");
  CREATE INDEX "stores_updated_at_idx" ON "stores" USING btree ("updated_at");
  CREATE INDEX "stores_created_at_idx" ON "stores" USING btree ("created_at");
  CREATE UNIQUE INDEX "promotions_code_idx" ON "promotions" USING btree ("code");
  CREATE INDEX "promotions_updated_at_idx" ON "promotions" USING btree ("updated_at");
  CREATE INDEX "promotions_created_at_idx" ON "promotions" USING btree ("created_at");
  CREATE INDEX "promotions_rels_order_idx" ON "promotions_rels" USING btree ("order");
  CREATE INDEX "promotions_rels_parent_idx" ON "promotions_rels" USING btree ("parent_id");
  CREATE INDEX "promotions_rels_path_idx" ON "promotions_rels" USING btree ("path");
  CREATE INDEX "promotions_rels_stores_id_idx" ON "promotions_rels" USING btree ("stores_id");
  CREATE INDEX "promotions_rels_categories_id_idx" ON "promotions_rels" USING btree ("categories_id");
  CREATE INDEX "promotions_rels_products_id_idx" ON "promotions_rels" USING btree ("products_id");
  CREATE INDEX "hotels_gallery_order_idx" ON "hotels_gallery" USING btree ("_order");
  CREATE INDEX "hotels_gallery_parent_id_idx" ON "hotels_gallery" USING btree ("_parent_id");
  CREATE INDEX "hotels_gallery_image_idx" ON "hotels_gallery" USING btree ("image_id");
  CREATE INDEX "hotels_amenities_order_idx" ON "hotels_amenities" USING btree ("_order");
  CREATE INDEX "hotels_amenities_parent_id_idx" ON "hotels_amenities" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "hotels_slug_idx" ON "hotels" USING btree ("slug");
  CREATE INDEX "hotels_image_idx" ON "hotels" USING btree ("image_id");
  CREATE INDEX "hotels_updated_at_idx" ON "hotels" USING btree ("updated_at");
  CREATE INDEX "hotels_created_at_idx" ON "hotels" USING btree ("created_at");
  CREATE INDEX "rooms_gallery_order_idx" ON "rooms_gallery" USING btree ("_order");
  CREATE INDEX "rooms_gallery_parent_id_idx" ON "rooms_gallery" USING btree ("_parent_id");
  CREATE INDEX "rooms_gallery_image_idx" ON "rooms_gallery" USING btree ("image_id");
  CREATE INDEX "rooms_amenities_order_idx" ON "rooms_amenities" USING btree ("_order");
  CREATE INDEX "rooms_amenities_parent_id_idx" ON "rooms_amenities" USING btree ("_parent_id");
  CREATE INDEX "rooms_hotel_idx" ON "rooms" USING btree ("hotel_id");
  CREATE INDEX "rooms_image_idx" ON "rooms" USING btree ("image_id");
  CREATE INDEX "rooms_updated_at_idx" ON "rooms" USING btree ("updated_at");
  CREATE INDEX "rooms_created_at_idx" ON "rooms" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX "payload_locked_documents_rels_flash_sales_id_idx" ON "payload_locked_documents_rels" USING btree ("flash_sales_id");
  CREATE INDEX "payload_locked_documents_rels_orders_id_idx" ON "payload_locked_documents_rels" USING btree ("orders_id");
  CREATE INDEX "payload_locked_documents_rels_addresses_id_idx" ON "payload_locked_documents_rels" USING btree ("addresses_id");
  CREATE INDEX "payload_locked_documents_rels_stores_id_idx" ON "payload_locked_documents_rels" USING btree ("stores_id");
  CREATE INDEX "payload_locked_documents_rels_promotions_id_idx" ON "payload_locked_documents_rels" USING btree ("promotions_id");
  CREATE INDEX "payload_locked_documents_rels_hotels_id_idx" ON "payload_locked_documents_rels" USING btree ("hotels_id");
  CREATE INDEX "payload_locked_documents_rels_rooms_id_idx" ON "payload_locked_documents_rels" USING btree ("rooms_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_roles" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "products" CASCADE;
  DROP TABLE "flash_sales" CASCADE;
  DROP TABLE "flash_sales_rels" CASCADE;
  DROP TABLE "orders_items" CASCADE;
  DROP TABLE "orders" CASCADE;
  DROP TABLE "addresses" CASCADE;
  DROP TABLE "stores" CASCADE;
  DROP TABLE "promotions" CASCADE;
  DROP TABLE "promotions_rels" CASCADE;
  DROP TABLE "hotels_gallery" CASCADE;
  DROP TABLE "hotels_amenities" CASCADE;
  DROP TABLE "hotels" CASCADE;
  DROP TABLE "rooms_gallery" CASCADE;
  DROP TABLE "rooms_amenities" CASCADE;
  DROP TABLE "rooms" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_users_roles";
  DROP TYPE "public"."enum_orders_status";
  DROP TYPE "public"."enum_orders_payment_method";
  DROP TYPE "public"."enum_promotions_type";
  DROP TYPE "public"."enum_promotions_target_type";
  DROP TYPE "public"."enum_hotels_star_rating";
  DROP TYPE "public"."enum_rooms_room_type";
  DROP TYPE "public"."enum_rooms_bed_type";`)
}
