# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_09_04_020623) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "projects", force: :cascade do |t|
    t.string "name"
    t.bigint "owner_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "state_changes", force: :cascade do |t|
    t.bigint "task_id", null: false
    t.string "old_state"
    t.string "new_state", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["new_state"], name: "index_state_changes_on_new_state"
    t.index ["old_state"], name: "index_state_changes_on_old_state"
    t.index ["task_id"], name: "index_state_changes_on_task_id"
  end

  create_table "tasks", force: :cascade do |t|
    t.string "name", null: false
    t.text "notes"
    t.string "state", default: "new", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "project_id"
    t.datetime "completed_at"
    t.index ["state"], name: "index_tasks_on_state"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "access_token", null: false
    t.string "google_id"
    t.string "google_token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.date "current_working_day"
    t.date "last_working_day"
    t.index ["access_token"], name: "index_users_on_access_token"
    t.index ["google_id"], name: "index_users_on_google_id"
    t.index ["google_token"], name: "index_users_on_google_token"
    t.index ["username"], name: "index_users_on_username"
  end

  add_foreign_key "projects", "users", column: "owner_id"
  add_foreign_key "state_changes", "tasks"
  add_foreign_key "tasks", "projects"
end
