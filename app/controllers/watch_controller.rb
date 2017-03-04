class WatchController < ApplicationController
  # allows for auth. bypass for dev environment
  skip_before_filter :verify_authenticity_token

  def index
    @movies = Movie.where(user_id: current_user.id)
  end
end
