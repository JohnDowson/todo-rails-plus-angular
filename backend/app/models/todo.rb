class Todo < ApplicationRecord
  belongs_to :project
  def json
    { id: id, text: text, completed: completed, project_id: project.id }
  end
end
