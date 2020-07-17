class ProjectController < ApplicationController
  def index
    render json: Project.all.map { |proj| proj.json }
  end
end
