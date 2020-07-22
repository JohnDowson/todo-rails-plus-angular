class Project < ApplicationRecord
  has_many :todos, dependent: :destroy
  def json
    {
      id: id,
      title: title,
      todos: todos.map(&:json)
    }
  end
end
