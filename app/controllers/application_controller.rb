class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user!

  def disable_nav
    @disable_nav = true
  end
end
