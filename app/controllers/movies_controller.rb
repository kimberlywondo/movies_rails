require 'httparty'
require 'open-uri'

class MoviesController < ApplicationController
  # allows for auth. bypass for dev environment
  skip_before_action :verify_authenticity_token

  def index
    @movies = Movie.where(user_id: current_user.id).where(favorites: true)
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
      redirect_to movies_path
    else
      render :search
    end
  end

  def remove
    @movie = Movie.find(params[:id])
    if @movie.destroy
      redirect_to "/movies"
    end
  end

  def search
  end

  def results
    api_result = HTTParty.get("http://www.omdbapi.com/?t=#{params[:title]}&plot=long&r=json")
    if !api_result["Title"]
      redirect_to :search
    end
    @movie = api_result
  end


  private
  def movie_params
    params.permit(:title, :rated, :released, :runtime, :genre,
                  :director, :writer, :actors, :plot, :country,
                  :awards, :poster, :metascore, :imdbRating,
                  :user_id, :favorites, :watch)
  end
end
