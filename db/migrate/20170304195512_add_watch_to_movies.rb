class AddWatchToMovies < ActiveRecord::Migration[5.0]
  def change
    add_column :movies, :watch, :boolean
  end
end
