# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_01_15_214618) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "airports", force: :cascade do |t|
    t.string "name"
    t.string "city"
    t.string "country"
    t.string "iata_code"
    t.decimal "latitude"
    t.decimal "longitude"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "airports_flights", id: false, force: :cascade do |t|
    t.bigint "airport_id"
    t.bigint "flight_id"
    t.index ["airport_id"], name: "index_airports_flights_on_airport_id"
    t.index ["flight_id"], name: "index_airports_flights_on_flight_id"
  end

  create_table "contest_registrations", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "ranking_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["ranking_id"], name: "index_contest_registrations_on_ranking_id"
    t.index ["user_id"], name: "index_contest_registrations_on_user_id"
  end

  create_table "flights", force: :cascade do |t|
    t.string "depart"
    t.string "arrival"
    t.integer "distance"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "user_id"
    t.integer "repetition"
    t.string "iata_departure"
    t.string "iata_arrival"
    t.index ["iata_arrival"], name: "index_flights_on_iata_arrival"
    t.index ["iata_departure"], name: "index_flights_on_iata_departure"
    t.index ["user_id"], name: "index_flights_on_user_id"
  end

  create_table "rankings", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "verification"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "total_distance"
    t.string "name"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "flights", "users"
end
