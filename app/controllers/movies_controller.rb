require 'httparty'
require 'open-uri'

class MoviesController < ApplicationController
  # allows for auth. bypass for dev environment
  skip_before_filter :verify_authenticity_token

  def index
    @movies = Movie.all
  end

  def show
    @movie = Movie.find_by_id(params[:id])
  end

  def edit
  end

  def search
  end

  def results
    @string = params[:title]
  end
end
