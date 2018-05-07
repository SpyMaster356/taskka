class Project < ApplicationRecord
  belongs_to :owner, class_name: "User"
  has_many :tasks
end
