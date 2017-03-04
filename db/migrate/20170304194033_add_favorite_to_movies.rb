class AddFavoriteToMovies < ActiveRecord::Migration[5.0]
  def change
    add_column :movies, :favorites, :boolean
  end
end
