class WatchController < ApplicationController
  # allows for auth. bypass for dev environment
  skip_before_action :verify_authenticity_token
  before_filter :disable_nav, only: [:watch_page]

  def index
    @movies = Movie.where(user_id: current_user.id).where(watch: true)
  end

  def show
    @movie = Movie.find_by_id(params[:id])
  end

  def new
    @movie = Movie.new(params[:movie])
  end

  def create
    @movie = Movie.create(movie_params)
    if @movie.save
      redirect_to '/watch'
    else
      render :search
    end
  end

  def remove
    @movie = Movie.find(params[:id])
    if @movie.destroy
      redirect_to "/watch"
    end
  end

  # modal test
  def test
    @show_partial = false
    if @show_partial
      render :test
    end
  end

  private
  def movie_params
    params.permit(:title, :rated, :released, :runtime, :genre,
                  :director, :writer, :actors, :plot, :country,
                  :awards, :poster, :metascore, :imdbRating,
                  :user_id, :favorites, :watch)
  end
end
