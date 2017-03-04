require 'httparty'
require 'open-uri'

class MoviesController < ApplicationController
  # allows for auth. bypass for dev environment
  skip_before_filter :verify_authenticity_token

  def index
    @movies = Movie.where(user_id: current_user.id)
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

  def search
  end

  def results
    api_result = HTTParty.get("http://www.omdbapi.com/?t=#{params[:title]}&plot=long&r=json")
    if !api_result["Title"]
      redirect_to :search
    end
    @movie_results = api_result
  end


  private
  def movie_params
    params.permit(:title, :rated, :released, :runtime, :genre,
                  :director, :writer, :actors, :plot, :country,
                  :awards, :poster, :metascore, :imdbRating, :user_id)
  end
end
